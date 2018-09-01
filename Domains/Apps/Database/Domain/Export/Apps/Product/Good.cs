// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Good.cs" company="Allors bvba">
//   Copyright 2002-2012 Allors bvba.
// Dual Licensed under
//   a) the General Public Licence v3 (GPL)
//   b) the Allors License
// The GPL License is included in the file gpl.txt.
// The Allors License is an addendum to your contract.
// Allors Applications is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// For more information visit http://www.allors.com/legal
// </copyright>
// --------------------------------------------------------------------------------------------------------------------
namespace Allors.Domain
{
    using System;
    using System.Linq;

    using Allors.Meta;

    public partial class Good
    {
        private bool IsDeletable => !this.ExistDeploymentsWhereProductOffering && 
                                    !this.ExistEngagementItemsWhereProduct && 
                                    !this.ExistGeneralLedgerAccountsWhereCostUnitsAllowed && 
                                    !this.ExistGeneralLedgerAccountsWhereDefaultCostUnit && 
                                    !this.ExistQuoteItemsWhereProduct && 
                                    !this.ExistShipmentItemsWhereGood && 
                                    !this.ExistWorkEffortGoodStandardsWhereGood && 
                                    !this.ExistMarketingPackageWhereProductsUsedIn && 
                                    !this.ExistMarketingPackagesWhereProduct && 
                                    !this.ExistOrganisationGlAccountsWhereProduct && 
                                    !this.ExistProductConfigurationsWhereProductsUsedIn && 
                                    !this.ExistProductConfigurationsWhereProduct && 
                                    !this.ExistRequestItemsWhereProduct && 
                                    !this.ExistSalesInvoiceItemsWhereProduct && 
                                    !this.ExistSalesOrderItemsWhereProduct && 
                                    !this.ExistWorkEffortTypesWhereProductToProduce && 
                                    !this.ExistEngagementItemsWhereProduct && 
                                    !this.ExistProductWhereVariant;

        public void AppsOnDerive(ObjectOnDerive method)
        {
            var derivation = method.Derivation;
            var defaultLocale = this.strategy.Session.GetSingleton().DefaultLocale;

            if (!this.ExistVariants)
            {
                derivation.Validation.AssertExists(this, M.Good.FinishedGood);
            }

            if (this.LocalisedNames.Any(x => x.Locale.Equals(defaultLocale)))
            {
                this.Name = this.LocalisedNames.First(x => x.Locale.Equals(defaultLocale)).Text;
            }

            if (this.LocalisedDescriptions.Any(x => x.Locale.Equals(defaultLocale)))
            {
                this.Description = this.LocalisedDescriptions.First(x => x.Locale.Equals(defaultLocale)).Text;
            }

            this.AddProductCategory(this.PrimaryProductCategory);

            if (this.ExistFinishedGood)
            {
                foreach (SupplierOffering supplierOffering in this.FinishedGood.SupplierOfferingsWherePart)
                {
                    if (supplierOffering.FromDate <= DateTime.UtcNow
                        && (!supplierOffering.ExistThroughDate || supplierOffering.ThroughDate >= DateTime.UtcNow))
                    {
                        this.AddSuppliedBy(supplierOffering.Supplier);
                    }

                    if (supplierOffering.FromDate > DateTime.UtcNow
                        || (supplierOffering.ExistThroughDate && supplierOffering.ThroughDate < DateTime.UtcNow))
                    {
                        this.RemoveSuppliedBy(supplierOffering.Supplier);
                    }
                }
            }

            this.DeriveVirtualProductPriceComponent();
            this.DeriveProductCategoriesExpanded(derivation);
            this.DeriveQuantityOnHand();
            this.DeriveAvailableToPromise();
            this.DeriveQuantityCommittedOut();
            this.DeriveQuantityExpectedIn();
        }

        public void DeriveVirtualProductPriceComponent()
        {
            if (!this.ExistProductWhereVariant)
            {
                this.RemoveVirtualProductPriceComponents();
            }

            if (this.ExistVariants)
            {
                this.RemoveVirtualProductPriceComponents();

                var priceComponents = this.PriceComponentsWhereProduct;

                foreach (Good product in this.Variants)
                {
                    foreach (PriceComponent priceComponent in priceComponents)
                    {
                        product.AddVirtualProductPriceComponent(priceComponent);

                        var basePrice = priceComponent as BasePrice;
                        if (basePrice != null && !priceComponent.ExistProductFeature)
                        {
                            product.AddToBasePrice(basePrice);
                        }
                    }
                }
            }
        }

        public void DeriveProductCategoriesExpanded(IDerivation derivation)
        {
            this.RemoveProductCategoriesExpanded();

            if (this.ExistPrimaryProductCategory)
            {
                this.AddProductCategoriesExpanded(this.PrimaryProductCategory);
                foreach (ProductCategory superJacent in this.PrimaryProductCategory.SuperJacent)
                {
                    this.AddProductCategoriesExpanded(superJacent);
                    superJacent.AppsOnDeriveAllProducts(derivation);
                }
            }

            foreach (ProductCategory productCategory in this.ProductCategories)
            {
                this.AddProductCategoriesExpanded(productCategory);
                foreach (ProductCategory superJacent in productCategory.SuperJacent)
                {
                    this.AddProductCategoriesExpanded(superJacent);
                    superJacent.AppsOnDeriveAllProducts(derivation);
                }
            }
        }

        public void DeriveQuantityOnHand()
        {
            this.QuantityOnHand = 0;

            if (this.ExistFinishedGood)
            {
                foreach (InventoryItem inventoryItem in this.FinishedGood.InventoryItemsWherePart)
                {
                    if (inventoryItem is NonSerialisedInventoryItem)
                    {
                        var nonSerialised = (NonSerialisedInventoryItem)inventoryItem;
                        this.QuantityOnHand += nonSerialised.QuantityOnHand;
                    }
                }
            }
        }

        public void DeriveAvailableToPromise()
        {
            this.AvailableToPromise = 0;

            if (this.ExistFinishedGood)
            {
                foreach (InventoryItem inventoryItem in this.FinishedGood.InventoryItemsWherePart)
                {
                    if (inventoryItem is NonSerialisedInventoryItem)
                    {
                        var nonSerialised = (NonSerialisedInventoryItem)inventoryItem;
                        this.AvailableToPromise += nonSerialised.AvailableToPromise;
                    }
                }
            }
        }

        public void DeriveQuantityCommittedOut()
        {
            this.QuantityCommittedOut = 0;

            if (this.ExistFinishedGood)
            {
                foreach (InventoryItem inventoryItem in this.FinishedGood.InventoryItemsWherePart)
                {
                    if (inventoryItem is NonSerialisedInventoryItem)
                    {
                        var nonSerialised = (NonSerialisedInventoryItem)inventoryItem;
                        this.QuantityCommittedOut += nonSerialised.QuantityCommittedOut;
                    }
                }
            }
        }

        public void DeriveQuantityExpectedIn()
        {
            this.QuantityExpectedIn = 0;

            if (this.ExistFinishedGood)
            {
                foreach (InventoryItem inventoryItem in this.FinishedGood.InventoryItemsWherePart)
                {
                    if (inventoryItem is NonSerialisedInventoryItem)
                    {
                        var nonSerialised = (NonSerialisedInventoryItem)inventoryItem;
                        this.QuantityExpectedIn += nonSerialised.QuantityExpectedIn;
                    }
                }
            }
        }

        public void AppsDelete(DeletableDelete method)
        {
            if (this.IsDeletable)
            {
                foreach (VendorProduct vendorProduct in this.VendorProductsWhereProduct)
                {
                    vendorProduct.Delete();
                }

                foreach (LocalisedText localisedText in this.LocalisedNames)
                {
                    localisedText.Delete();
                }

                foreach (LocalisedText localisedText in this.LocalisedDescriptions)
                {
                    localisedText.Delete();
                }

                foreach (PriceComponent priceComponent in this.VirtualProductPriceComponents)
                {
                    priceComponent.Delete();
                }

                foreach (EstimatedProductCost estimatedProductCosts in this.EstimatedProductCosts)
                {
                    estimatedProductCosts.Delete();
                }

                foreach (PartyProductRevenue revenue in this.PartyProductRevenuesWhereProduct)
                {
                    revenue.Delete();
                }

                foreach (ProductRevenue revenue in this.ProductRevenuesWhereProduct)
                {
                    revenue.Delete();
                }
            }
        }
    }
}