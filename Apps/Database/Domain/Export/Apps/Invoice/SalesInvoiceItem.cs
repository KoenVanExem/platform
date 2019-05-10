namespace Allors.Domain
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    using Meta;

    public partial class SalesInvoiceItem
    {
        public static readonly TransitionalConfiguration[] StaticTransitionalConfigurations =
            {
                new TransitionalConfiguration(M.SalesInvoiceItem, M.SalesInvoiceItem.SalesInvoiceItemState),
            };

        public TransitionalConfiguration[] TransitionalConfigurations => StaticTransitionalConfigurations;

        public bool IsValid => !this.SalesInvoiceItemState.IsCancelled;

        public decimal PriceAdjustment => this.TotalSurcharge - this.TotalDiscount;

        public decimal PriceAdjustmentAsPercentage => Math.Round(((this.TotalSurcharge - this.TotalDiscount) / this.TotalBasePrice) * 100, 2);

        public Part DerivedPart
        {
            get
            {
                if (this.ExistPart)
                {
                    return this.Part;
                }
                else
                {
                    if (this.ExistProduct)
                    {
                        var nonUnifiedGood = this.Product as NonUnifiedGood;
                        var unifiedGood = this.Product as UnifiedGood;
                        return unifiedGood ?? nonUnifiedGood?.Part;
                    }
                }

                return null;
            }
        }

        internal bool IsDeletable =>
            !this.ExistOrderItemBillingsWhereInvoiceItem &&
            !this.ExistShipmentItemBillingsWhereInvoiceItem &&
            !this.ExistWorkEffortBillingsWhereInvoiceItem &&
            !this.ExistServiceEntryBillingsWhereInvoiceItem;

        public void SetActualDiscountAmount(decimal amount)
        {
            if (!this.ExistDiscountAdjustment)
            {
                this.DiscountAdjustment = new DiscountAdjustmentBuilder(this.Strategy.Session).Build();
            }

            this.DiscountAdjustment.Amount = amount;
            this.DiscountAdjustment.RemovePercentage();
        }

        public void SetActualDiscountPercentage(decimal percentage)
        {
            if (!this.ExistDiscountAdjustment)
            {
                this.DiscountAdjustment = new DiscountAdjustmentBuilder(this.Strategy.Session).Build();
            }

            this.DiscountAdjustment.Percentage = percentage;
            this.DiscountAdjustment.RemoveAmount();
        }

        public void AppsOnBuild(ObjectOnBuild method)
        {
            if (!this.ExistSalesInvoiceItemState)
            {
                this.SalesInvoiceItemState = new SalesInvoiceItemStates(this.Strategy.Session).ReadyForPosting;
            }

            if (this.ExistProduct && !this.ExistInvoiceItemType)
            {
                this.InvoiceItemType = new InvoiceItemTypes(this.Strategy.Session).ProductItem;
            }
        }

        public void AppsOnPreDerive(ObjectOnPreDerive method)
        {
            var derivation = method.Derivation;

            if (this.ExistSalesInvoiceWhereSalesInvoiceItem)
            {
                derivation.AddDependency(this.SalesInvoiceWhereSalesInvoiceItem, this);
            }

            if (this.ExistPaymentApplicationsWhereInvoiceItem)
            {
                foreach (PaymentApplication paymentApplication in this.PaymentApplicationsWhereInvoiceItem)
                {
                    derivation.AddDependency(this, paymentApplication);
                }
            }

            foreach (OrderItemBilling orderItemBilling in this.OrderItemBillingsWhereInvoiceItem)
            {
                derivation.AddDependency(orderItemBilling.OrderItem, this);
            }

            foreach (ShipmentItemBilling shipmentItemBilling in this.ShipmentItemBillingsWhereInvoiceItem)
            {
                foreach (OrderShipment orderShipment in shipmentItemBilling.ShipmentItem.OrderShipmentsWhereShipmentItem)
                {
                    derivation.AddDependency(orderShipment.OrderItem, this);
                }
            }
        }

        public void AppsOnDerive(ObjectOnDerive method)
        {
            var derivation = method.Derivation;

            derivation.Validation.AssertExistsAtMostOne(this, M.SalesInvoiceItem.Product, M.SalesInvoiceItem.ProductFeatures, M.SalesInvoiceItem.Part);
            derivation.Validation.AssertExistsAtMostOne(this, M.SalesInvoiceItem.SerialisedItem, M.SalesInvoiceItem.ProductFeatures, M.SalesInvoiceItem.Part);

            this.VatRegime = this.ExistAssignedVatRegime ? this.AssignedVatRegime : this.SalesInvoiceWhereSalesInvoiceItem?.VatRegime;
            this.VatRate = this.Product?.VatRate;

            if (this.ExistVatRegime && this.VatRegime.ExistVatRate)
            {
                this.VatRate = this.VatRegime.VatRate;
            }

            if (this.ExistInvoiceItemType && this.Quantity == 0)
            {
                this.Quantity = 1;
            }

            if (this.ExistInvoiceItemType && this.IsSubTotalItem().Result == true && this.Quantity <= 0)
            {
                derivation.Validation.AssertExists(this, this.Meta.Quantity);
            }

            this.AmountPaid = 0;
            foreach (PaymentApplication paymentApplication in this.PaymentApplicationsWhereInvoiceItem)
            {
                this.AmountPaid += paymentApplication.AmountApplied;
            }
        }

        public void AppsWriteOff()
        {
            this.SalesInvoiceItemState = new SalesInvoiceItemStates(this.Strategy.Session).WrittenOff;
        }

        public void AppsCancel()
        {
            this.SalesInvoiceItemState = new SalesInvoiceItemStates(this.Strategy.Session).Cancelled;
        }

        public void AppsSend()
        {
            this.SalesInvoiceItemState = new SalesInvoiceItemStates(this.Strategy.Session).Sent;
        }

        public void AppsDelete(DeletableDelete method)
        {
            foreach (SalesTerm salesTerm in this.SalesTerms)
            {
                salesTerm.Delete();
            }

            foreach (InvoiceVatRateItem invoiceVatRateItem in this.InvoiceVatRateItems)
            {
                invoiceVatRateItem.Delete();
            }
        }

        public void AppsIsSubTotalItem(SalesInvoiceItemIsSubTotalItem method)
        {
            if (!method.Result.HasValue)
            {
                method.Result = this.InvoiceItemType.Equals(new InvoiceItemTypes(this.Strategy.Session).ProductItem)
                    || this.InvoiceItemType.Equals(new InvoiceItemTypes(this.Strategy.Session).PartItem);
            }
        }
    }
}