// --------------------------------------------------------------------------------------------------------------------
// <copyright file="SalesInvoice.cs" company="Allors bvba">
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
    using System.Collections.Generic;
    using System.Linq;

    using Allors.Meta;
    using Allors.Services;

    using Microsoft.Extensions.DependencyInjection;

    using Resources;

    public partial class SalesInvoice
    {
        private bool IsDeletable =>
            this.SalesInvoiceState.Equals(new SalesInvoiceStates(this.Strategy.Session).ReadyForPosting) &&
            this.SalesInvoiceItems.All(v => v.IsDeletable) &&
            this.SalesOrders.Count == 0 &&
            !this.ExistPurchaseInvoice &&
            !this.ExistRepeatingSalesInvoiceWhereSource &&
            !this.IsRepeatingInvoice;

        public static readonly TransitionalConfiguration[] StaticTransitionalConfigurations =
            {
                new TransitionalConfiguration(M.SalesInvoice, M.SalesInvoice.SalesInvoiceState),
            };

        public TransitionalConfiguration[] TransitionalConfigurations => StaticTransitionalConfigurations;

        public int PaymentNetDays
        {
            get
            {
                if (this.ExistSalesTerms)
                {
                    foreach (AgreementTerm term in this.SalesTerms)
                    {
                        if (term.TermType.Equals(new InvoiceTermTypes(this.Strategy.Session).PaymentNetDays))
                        {
                            if (int.TryParse(term.TermValue, out var netDays))
                            {
                                return netDays;
                            }
                        }
                    }
                }

                if (this.BillToCustomer?.PaymentNetDays().HasValue == true)
                {
                    return this.BillToCustomer.PaymentNetDays().Value;
                }

                if (this.ExistStore && this.Store.ExistPaymentNetDays)
                {
                    return this.Store.PaymentNetDays;
                }

                return 0;
            }
        }

        public DateTime? DueDate
        {
            get
            {
                if (this.ExistInvoiceDate)
                {
                    return this.InvoiceDate.AddDays(this.PaymentNetDays);
                }

                return null;
            }
        }

        public InvoiceItem[] InvoiceItems => this.SalesInvoiceItems;
        
        public void AppsOnBuild(ObjectOnBuild method)
        {
            if (!this.ExistSalesInvoiceState)
            {
                this.SalesInvoiceState = new SalesInvoiceStates(this.Strategy.Session).ReadyForPosting;
            }

            if (!this.ExistEntryDate)
            {
                this.EntryDate = this.strategy.Session.Now();
            }

            if (!this.ExistInvoiceDate)
            {
                this.InvoiceDate = this.strategy.Session.Now();
            }

            if (this.ExistBillToCustomer)
            {
                this.PreviousBillToCustomer = this.BillToCustomer;
            }

            if (!this.ExistSalesInvoiceType)
            {
                this.SalesInvoiceType = new SalesInvoiceTypes(this.Strategy.Session).SalesInvoice;
            }
        }

        public void AppsOnPreDerive(ObjectOnPreDerive method)
        {
            var derivation = method.Derivation;

            if (this.ExistBillToCustomer)
            {
                var customerRelationships = this.BillToCustomer.CustomerRelationshipsWhereCustomer;

                foreach (CustomerRelationship customerRelationship in customerRelationships)
                {
                    if (customerRelationship.FromDate <= this.strategy.Session.Now() && (!customerRelationship.ExistThroughDate || customerRelationship.ThroughDate >= this.strategy.Session.Now()))
                    {
                        derivation.AddDependency(this, customerRelationship);
                    }
                }
            }

            if (this.ExistShipToCustomer)
            {
                var customerRelationships = this.ShipToCustomer.CustomerRelationshipsWhereCustomer;

                foreach (CustomerRelationship customerRelationship in customerRelationships)
                {
                    if (customerRelationship.FromDate <= this.strategy.Session.Now() && (!customerRelationship.ExistThroughDate || customerRelationship.ThroughDate >= this.strategy.Session.Now()))
                    {
                        derivation.AddDependency(this, customerRelationship);
                    }
                }
            }

            foreach (var invoiceItem in this.InvoiceItems.OfType<SalesInvoiceItem>())
            {
                derivation.AddDependency(this, invoiceItem);
            }

            foreach (SalesOrder salesOrder in this.SalesOrders)
            {
                derivation.AddDependency(salesOrder, this);
            }
        }

        public void AppsOnDerive(ObjectOnDerive method)
        {
            var derivation = method.Derivation;

            var internalOrganisations = new Organisations(this.Strategy.Session).InternalOrganisations();

            if (!this.ExistBilledFrom && internalOrganisations.Count() == 1)
            {
                this.BilledFrom = internalOrganisations.First();
            }

            if (!this.ExistStore && this.ExistBilledFrom)
            {
                var stores = new Stores(this.Strategy.Session).Extent();
                stores.Filter.AddEquals(M.Store.InternalOrganisation, this.BilledFrom);
                this.Store = stores.FirstOrDefault();
            }

            if (!this.ExistInvoiceNumber && this.ExistStore)
            {
                this.InvoiceNumber = this.Store.DeriveNextTemporaryInvoiceNumber();
            }

            if (!this.ExistBilledFromContactMechanism)
            {
                this.BilledFromContactMechanism = this.BilledFrom.ExistBillingAddress ? this.BilledFrom.BillingAddress : this.BilledFrom.GeneralCorrespondence;
            }

            if (!this.ExistBillToContactMechanism && this.ExistBillToCustomer)
            {
                this.BillToContactMechanism = this.BillToCustomer.BillingAddress;
            }

            if (!this.ExistBillToEndCustomerContactMechanism && this.ExistBillToEndCustomer)
            {
                this.BillToEndCustomerContactMechanism = this.BillToEndCustomer.BillingAddress;
            }

            if (!this.ExistShipToEndCustomerAddress && this.ExistShipToEndCustomer)
            {
                this.ShipToEndCustomerAddress = this.ShipToEndCustomer.ShippingAddress;
            }

            if (!this.ExistShipToAddress && this.ExistShipToCustomer)
            {
                this.ShipToAddress = this.ShipToCustomer.ShippingAddress;
            }

            if (!this.ExistCurrency)
            {
                if (this.ExistBillToCustomer && (this.BillToCustomer.ExistPreferredCurrency || this.BillToCustomer.ExistLocale))
                {
                    this.Currency = this.BillToCustomer.ExistPreferredCurrency ? this.BillToCustomer.PreferredCurrency : this.BillToCustomer.Locale.Country.Currency;
                }
                else
                {
                    this.Currency = this.BilledFrom.ExistPreferredCurrency ?
                        this.BilledFrom.PreferredCurrency :
                        this.Strategy.Session.GetSingleton().DefaultLocale.Country.Currency;
                }
            }

            foreach (SalesInvoiceItem salesInvoiceItem in this.SalesInvoiceItems)
            {
                salesInvoiceItem.SalesReps = salesInvoiceItem.Product?.ProductCategoriesWhereProduct.Select(v => SalesRepRelationships.SalesRep(this.BillToCustomer, v, this.InvoiceDate)).ToArray();
                salesInvoiceItem.AddSalesRep(SalesRepRelationships.SalesRep(this.BillToCustomer, null, this.InvoiceDate));

                foreach (OrderItemBilling orderItemBilling in salesInvoiceItem.OrderItemBillingsWhereInvoiceItem)
                {
                    if (orderItemBilling.OrderItem is SalesOrderItem salesOrderItem && !this.SalesOrders.Contains(salesOrderItem.SalesOrderWhereSalesOrderItem))
                    {
                        this.AddSalesOrder(salesOrderItem.SalesOrderWhereSalesOrderItem);
                    }
                }

                foreach (WorkEffortBilling workEffortBilling in salesInvoiceItem.WorkEffortBillingsWhereInvoiceItem)
                {
                    if (!this.WorkEfforts.Contains(workEffortBilling.WorkEffort))
                    {
                        this.AddWorkEffort(workEffortBilling.WorkEffort);
                    }
                }

                foreach (TimeEntryBilling timeEntryBilling in salesInvoiceItem.TimeEntryBillingsWhereInvoiceItem)
                {
                    if (!this.WorkEfforts.Contains(timeEntryBilling.TimeEntry.WorkEffort))
                    {
                        this.AddWorkEffort(timeEntryBilling.TimeEntry.WorkEffort);
                    }
                }
            }

            this.IsRepeatingInvoice = this.ExistRepeatingSalesInvoiceWhereSource && (!this.RepeatingSalesInvoiceWhereSource.ExistFinalExecutionDate || this.RepeatingSalesInvoiceWhereSource.FinalExecutionDate.Value.Date >= this.Strategy.Session.Now().Date);

            this.SalesInvoiceItems = this.SalesInvoiceItems.ToArray();

            if (this.ExistBillToCustomer && this.BillToCustomer.ExistLocale)
            {
                this.Locale = this.BillToCustomer.Locale;
            }
            else
            {
                this.Locale = this.Strategy.Session.GetSingleton().DefaultLocale;
            }

            var validInvoiceItems = this.SalesInvoiceItems.Where(v => v.IsValid).ToArray();
            this.ValidInvoiceItems = validInvoiceItems;

            #region Pricing
            var currentPriceComponents = new PriceComponents(this.Strategy.Session).CurrentPriceComponents(this.InvoiceDate);

            var quantityByProduct = validInvoiceItems
                .Where(v => v.ExistProduct)
                .GroupBy(v => v.Product)
                .ToDictionary(v => v.Key, v => v.Sum(w => w.Quantity));

            // First run to calculate price
            foreach (SalesInvoiceItem salesInvoiceItem in validInvoiceItems)
            {
                decimal quantityOrdered = 0;

                if (salesInvoiceItem.ExistProduct)
                {
                    quantityByProduct.TryGetValue(salesInvoiceItem.Product, out quantityOrdered);
                }

                this.CalculatePrices(derivation, salesInvoiceItem, currentPriceComponents, quantityOrdered, 0);
            }

            var totalBasePriceByProduct = validInvoiceItems
                .Where(v => v.ExistProduct)
                .GroupBy(v => v.Product)
                .ToDictionary(v => v.Key, v => v.Sum(w => w.TotalBasePrice));

            // Second run to calculate price (because of order value break)
            foreach (SalesInvoiceItem salesInvoiceItem in validInvoiceItems)
            {
                decimal quantityOrdered = 0;
                decimal totalBasePrice = 0;

                if (salesInvoiceItem.ExistProduct)
                {
                    quantityByProduct.TryGetValue(salesInvoiceItem.Product, out quantityOrdered);
                    totalBasePriceByProduct.TryGetValue(salesInvoiceItem.Product, out totalBasePrice);
                }

                this.CalculatePrices(derivation, salesInvoiceItem, currentPriceComponents, quantityOrdered, totalBasePrice);
            }

            // Calculate Totals
            if (this.ExistSalesInvoiceItems)
            {
                this.TotalBasePrice = 0;
                this.TotalDiscount = 0;
                this.TotalSurcharge = 0;
                this.TotalExVat = 0;
                this.TotalFee = 0;
                this.TotalShippingAndHandling = 0;
                this.TotalVat = 0;
                this.TotalIncVat = 0;
                this.TotalListPrice = 0;

                foreach (SalesInvoiceItem item in validInvoiceItems)
                {
                    this.TotalBasePrice += item.TotalBasePrice;
                    this.TotalDiscount += item.TotalDiscount;
                    this.TotalSurcharge += item.TotalSurcharge;
                    this.TotalExVat += item.TotalExVat;
                    this.TotalVat += item.TotalVat;
                    this.TotalIncVat += item.TotalIncVat;
                    this.TotalListPrice += item.UnitPrice;
                }

                if (this.ExistDiscountAdjustment)
                {
                    var discount = this.DiscountAdjustment.Percentage.HasValue ?
                                           Math.Round((this.TotalExVat * this.DiscountAdjustment.Percentage.Value) / 100, 2) :
                                           this.DiscountAdjustment.Amount ?? 0;

                    this.TotalDiscount += discount;
                    this.TotalExVat -= discount;

                    if (this.ExistVatRegime)
                    {
                        decimal vat = Math.Round((discount * this.VatRegime.VatRate.Rate) / 100, 2);

                        this.TotalVat -= vat;
                        this.TotalIncVat -= discount + vat;
                    }
                }

                if (this.ExistSurchargeAdjustment)
                {
                    decimal surcharge = this.SurchargeAdjustment.Percentage.HasValue ?
                                            Math.Round((this.TotalExVat * this.SurchargeAdjustment.Percentage.Value) / 100, 2) :
                                            this.SurchargeAdjustment.Amount ?? 0;

                    this.TotalSurcharge += surcharge;
                    this.TotalExVat += surcharge;

                    if (this.ExistVatRegime)
                    {
                        decimal vat = Math.Round((surcharge * this.VatRegime.VatRate.Rate) / 100, 2);
                        this.TotalVat += vat;
                        this.TotalIncVat += surcharge + vat;
                    }
                }

                if (this.ExistFee)
                {
                    decimal fee = this.Fee.Percentage.HasValue ?
                                      Math.Round((this.TotalExVat * this.Fee.Percentage.Value) / 100, 2) :
                                      this.Fee.Amount ?? 0;

                    this.TotalFee += fee;
                    this.TotalExVat += fee;

                    if (this.Fee.ExistVatRate)
                    {
                        decimal vat1 = Math.Round((fee * this.Fee.VatRate.Rate) / 100, 2);
                        this.TotalVat += vat1;
                        this.TotalIncVat += fee + vat1;
                    }
                }

                if (this.ExistShippingAndHandlingCharge)
                {
                    decimal shipping = this.ShippingAndHandlingCharge.Percentage.HasValue ?
                                           Math.Round((this.TotalExVat * this.ShippingAndHandlingCharge.Percentage.Value) / 100, 2) :
                                           this.ShippingAndHandlingCharge.Amount ?? 0;

                    this.TotalShippingAndHandling += shipping;
                    this.TotalExVat += shipping;

                    if (this.ShippingAndHandlingCharge.ExistVatRate)
                    {
                        decimal vat2 = Math.Round((shipping * this.ShippingAndHandlingCharge.VatRate.Rate) / 100, 2);
                        this.TotalVat += vat2;
                        this.TotalIncVat += shipping + vat2;
                    }
                }

                //// Only take into account items for which there is data at the item level.
                //// Skip negative sales.
                decimal totalUnitBasePrice = 0;
                decimal totalListPrice = 0;

                foreach (SalesInvoiceItem item1 in validInvoiceItems)
                {
                    if (item1.TotalExVat > 0)
                    {
                        totalUnitBasePrice += item1.UnitBasePrice;
                        totalListPrice += item1.UnitPrice;
                    }
                }
            }
            #endregion

            #region States

            var salesInvoiceItemStates = new SalesInvoiceItemStates(derivation.Session);
            var salesInvoiceStates = new SalesInvoiceStates(derivation.Session);

            foreach (SalesInvoiceItem invoiceItem in validInvoiceItems)
            {
                if (!invoiceItem.SalesInvoiceItemState.Equals(salesInvoiceItemStates.Cancelled) &&
                    !invoiceItem.SalesInvoiceItemState.Equals(salesInvoiceItemStates.WrittenOff))
                {
                    if (invoiceItem.AmountPaid == 0)
                    {
                        invoiceItem.SalesInvoiceItemState = salesInvoiceItemStates.NotPaid;
                    }
                    else if (invoiceItem.ExistAmountPaid && invoiceItem.AmountPaid > 0 && invoiceItem.AmountPaid >= invoiceItem.TotalIncVat)
                    {
                        invoiceItem.SalesInvoiceItemState = salesInvoiceItemStates.Paid;
                    }
                    else
                    {
                        invoiceItem.SalesInvoiceItemState = salesInvoiceItemStates.PartiallyPaid;
                    }
                }
            }

            if (validInvoiceItems.Any()
                && !this.SalesInvoiceState.Equals(salesInvoiceStates.Cancelled) 
                && !this.SalesInvoiceState.Equals(salesInvoiceStates.WrittenOff))
            {
                if (this.SalesInvoiceItems.All(v => v.SalesInvoiceItemState.IsPaid))
                {
                    this.SalesInvoiceState = salesInvoiceStates.Paid;
                }
                else if (this.SalesInvoiceItems.All(v => v.SalesInvoiceItemState.IsNotPaid))
                {
                    this.SalesInvoiceState = salesInvoiceStates.NotPaid;
                }
                else
                {
                    this.SalesInvoiceState = salesInvoiceStates.PartiallyPaid;
                }

            }

            this.AmountPaid = this.AdvancePayment;
            this.AmountPaid += this.PaymentApplicationsWhereInvoice.Sum(v => v.AmountApplied);

            //// Perhaps payments are recorded at the item level.
            if (this.AmountPaid == 0)
            {
                this.AmountPaid = this.InvoiceItems.Sum(v => v.AmountPaid);
            }

            // If receipts are not matched at invoice level
            if (this.AmountPaid > 0)
            {
                if (this.AmountPaid >= this.TotalIncVat)
                {
                    this.SalesInvoiceState = salesInvoiceStates.Paid;
                }
                else
                {
                    this.SalesInvoiceState = salesInvoiceStates.PartiallyPaid;
                }

                foreach (SalesInvoiceItem invoiceItem in validInvoiceItems)
                {
                    if (!invoiceItem.SalesInvoiceItemState.Equals(salesInvoiceItemStates.Cancelled) &&
                        !invoiceItem.SalesInvoiceItemState.Equals(salesInvoiceItemStates.WrittenOff))
                    {
                        if (this.AmountPaid >= this.TotalIncVat)
                        {
                            invoiceItem.SalesInvoiceItemState = salesInvoiceItemStates.Paid;
                        }
                        else
                        {
                            invoiceItem.SalesInvoiceItemState = salesInvoiceItemStates.PartiallyPaid;
                        }
                    }
                }
            }
            #endregion

            this.SalesReps = validInvoiceItems
            .Cast<SalesInvoiceItem>()
            .SelectMany(v => v.SalesReps)
            .Distinct()
            .ToArray();

            this.AppsOnDeriveCustomers(derivation);

            if (this.ExistBillToCustomer && !this.BillToCustomer.AppsIsActiveCustomer(this.BilledFrom, this.InvoiceDate))
            {
                derivation.Validation.AddError(this, M.SalesInvoice.BillToCustomer, ErrorMessages.PartyIsNotACustomer);
            }

            if (this.ExistShipToCustomer && !this.ShipToCustomer.AppsIsActiveCustomer(this.BilledFrom, this.InvoiceDate))
            {
                derivation.Validation.AddError(this, M.SalesInvoice.ShipToCustomer, ErrorMessages.PartyIsNotACustomer);
            }

            this.PreviousBillToCustomer = this.BillToCustomer;
            this.PreviousShipToCustomer = this.ShipToCustomer;

            //this.AppsOnDeriveRevenues(derivation);

            this.ResetPrintDocument();
        }
        
        public void AppsSend(SalesInvoiceSend method)
        {
            if (object.Equals(this.SalesInvoiceType, new SalesInvoiceTypes(this.Strategy.Session).SalesInvoice))
            {
                this.InvoiceNumber = this.Store.DeriveNextInvoiceNumber(this.InvoiceDate.Year);
            }

            if (object.Equals(this.SalesInvoiceType, new SalesInvoiceTypes(this.Strategy.Session).CreditNote))
            {
                this.InvoiceNumber = this.Store.DeriveNextCreditNoteNumber(this.InvoiceDate.Year);
            }

            this.SalesInvoiceState = new SalesInvoiceStates(this.Strategy.Session).Sent;
            foreach (SalesInvoiceItem salesInvoiceItem in this.SalesInvoiceItems)
            {
                salesInvoiceItem.AppsSend();
            }

            if (this.BillToCustomer is Organisation organisation && organisation.IsInternalOrganisation)
            {
                var purchaseInvoice = new PurchaseInvoiceBuilder(this.Strategy.Session)
                    .WithBilledFrom(this.BilledFrom)
                    .WithBilledFromContactPerson(this.BilledFromContactPerson)
                    .WithBilledTo((InternalOrganisation)this.BillToCustomer)
                    .WithBilledToContactPerson(this.BillToContactPerson)
                    .WithBillToEndCustomer(this.BillToEndCustomer)
                    .WithBillToEndCustomerContactMechanism(this.BillToEndCustomerContactMechanism)
                    .WithBillToEndCustomerContactPerson(this.BillToEndCustomerContactPerson)
                    .WithBillToCustomerPaymentMethod(this.PaymentMethod)
                    .WithShipToCustomer(this.ShipToCustomer)
                    .WithShipToCustomerAddress(this.ShipToAddress)
                    .WithShipToCustomerContactPerson(this.ShipToContactPerson)
                    .WithShipToEndCustomer(this.ShipToEndCustomer)
                    .WithShipToEndCustomerAddress(this.ShipToEndCustomerAddress)
                    .WithShipToEndCustomerContactPerson(this.ShipToEndCustomerContactPerson)
                    .WithDescription(this.Description)
                    .WithInvoiceDate(this.strategy.Session.Now())
                    .WithPurchaseInvoiceType(new PurchaseInvoiceTypes(this.Strategy.Session).PurchaseInvoice)
                    .WithVatRegime(this.VatRegime)
                    .WithDiscountAdjustment(this.DiscountAdjustment)
                    .WithSurchargeAdjustment(this.SurchargeAdjustment)
                    .WithShippingAndHandlingCharge(this.ShippingAndHandlingCharge)
                    .WithFee(this.Fee)
                    .WithCustomerReference(this.CustomerReference)
                    .WithComment(this.Comment)
                    .WithInternalComment(this.InternalComment)
                    .Build();

                foreach (SalesInvoiceItem salesInvoiceItem in this.SalesInvoiceItems)
                {
                    var invoiceItem = new PurchaseInvoiceItemBuilder(this.Strategy.Session)
                        .WithInvoiceItemType(salesInvoiceItem.InvoiceItemType)
                        .WithAssignedUnitPrice(salesInvoiceItem.AssignedUnitPrice)
                        .WithProduct(salesInvoiceItem.Product)
                        .WithQuantity(salesInvoiceItem.Quantity)
                        .WithComment(salesInvoiceItem.Comment)
                        .WithInternalComment(salesInvoiceItem.InternalComment)
                        .Build();

                    purchaseInvoice.AddPurchaseInvoiceItem(invoiceItem);
                }
            }
        }

        public void AppsWriteOff(SalesInvoiceWriteOff method)
        {
            this.SalesInvoiceState = new SalesInvoiceStates(this.Strategy.Session).WrittenOff;
            foreach (SalesInvoiceItem salesInvoiceItem in this.SalesInvoiceItems)
            {
                salesInvoiceItem.AppsWriteOff();
            }
        }

        public void AppsReopen(SalesInvoiceReopen method)
        {
            this.SalesInvoiceState = this.PreviousSalesInvoiceState;
        }

        public void AppsCancelInvoice(SalesInvoiceCancelInvoice method)
        {
            this.SalesInvoiceState = new SalesInvoiceStates(this.Strategy.Session).Cancelled;
            foreach (SalesInvoiceItem salesInvoiceItem in this.SalesInvoiceItems)
            {
                salesInvoiceItem.AppsCancel();
            }
        }

        public SalesInvoice AppsCopy(SalesInvoiceCopy method)
        {
            var salesInvoice = new SalesInvoiceBuilder(this.Strategy.Session)
                .WithPurchaseInvoice(this.PurchaseInvoice)
                .WithBilledFrom(this.BilledFrom)
                .WithBilledFromContactMechanism(this.BilledFromContactMechanism)
                .WithBilledFromContactPerson(this.BilledFromContactPerson)
                .WithBillToCustomer(this.BillToCustomer)
                .WithBillToContactMechanism(this.BillToContactMechanism)
                .WithBillToContactPerson(this.BillToContactPerson)
                .WithBillToEndCustomer(this.BillToEndCustomer)
                .WithBillToEndCustomerContactMechanism(this.BillToEndCustomerContactMechanism)
                .WithBillToEndCustomerContactPerson(this.BillToEndCustomerContactPerson)
                .WithShipToCustomer(this.ShipToCustomer)
                .WithShipToAddress(this.ShipToAddress)
                .WithShipToContactPerson(this.ShipToContactPerson)
                .WithShipToEndCustomer(this.ShipToEndCustomer)
                .WithShipToEndCustomerAddress(this.ShipToEndCustomerAddress)
                .WithShipToEndCustomerContactPerson(this.ShipToEndCustomerContactPerson)
                .WithDescription(this.Description)
                .WithStore(this.Store)
                .WithInvoiceDate(this.strategy.Session.Now())
                .WithSalesChannel(this.SalesChannel)
                .WithSalesInvoiceType(new SalesInvoiceTypes(this.Strategy.Session).SalesInvoice)
                .WithVatRegime(this.VatRegime)
                .WithDiscountAdjustment(this.DiscountAdjustment)
                .WithSurchargeAdjustment(this.SurchargeAdjustment)
                .WithShippingAndHandlingCharge(this.ShippingAndHandlingCharge)
                .WithFee(this.Fee)
                .WithCustomerReference(this.CustomerReference)
                .WithPaymentMethod(this.PaymentMethod)
                .WithComment(this.Comment)
                .WithInternalComment(this.InternalComment)
                .WithMessage(this.Message)
                .WithBillingAccount(this.BillingAccount)
                .Build();

            foreach (SalesInvoiceItem salesInvoiceItem in this.SalesInvoiceItems)
            {
                var invoiceItem = new SalesInvoiceItemBuilder(this.Strategy.Session)
                    .WithInvoiceItemType(salesInvoiceItem.InvoiceItemType)
                    .WithAssignedUnitPrice(salesInvoiceItem.AssignedUnitPrice)
                    .WithProduct(salesInvoiceItem.Product)
                    .WithQuantity(salesInvoiceItem.Quantity)
                    .WithDescription(salesInvoiceItem.Description)
                    .WithSerialisedItem(salesInvoiceItem.SerialisedItem)
                    .WithComment(salesInvoiceItem.Comment)
                    .WithInternalComment(salesInvoiceItem.InternalComment)
                    .WithMessage(salesInvoiceItem.Message)
                    .WithFacility(salesInvoiceItem.Facility)
                    .Build();

                invoiceItem.ProductFeatures = salesInvoiceItem.ProductFeatures;
                salesInvoice.AddSalesInvoiceItem(invoiceItem);

                foreach (SalesTerm salesTerm in salesInvoiceItem.SalesTerms)
                {
                    if (salesTerm.GetType().Name == typeof(IncoTerm).Name)
                    {
                        salesInvoiceItem.AddSalesTerm(new IncoTermBuilder(this.Strategy.Session)
                            .WithTermType(salesTerm.TermType)
                            .WithTermValue(salesTerm.TermValue)
                            .WithDescription(salesTerm.Description)
                            .Build());
                    }

                    if (salesTerm.GetType().Name == typeof(InvoiceTerm).Name)
                    {
                        salesInvoiceItem.AddSalesTerm(new InvoiceTermBuilder(this.Strategy.Session)
                            .WithTermType(salesTerm.TermType)
                            .WithTermValue(salesTerm.TermValue)
                            .WithDescription(salesTerm.Description)
                            .Build());
                    }

                    if (salesTerm.GetType().Name == typeof(OrderTerm).Name)
                    {
                        salesInvoiceItem.AddSalesTerm(new OrderTermBuilder(this.Strategy.Session)
                            .WithTermType(salesTerm.TermType)
                            .WithTermValue(salesTerm.TermValue)
                            .WithDescription(salesTerm.Description)
                            .Build());
                    }
                }
            }

            foreach (SalesTerm salesTerm in this.SalesTerms)
            {
                if (salesTerm.GetType().Name == typeof(IncoTerm).Name)
                {
                    salesInvoice.AddSalesTerm(new IncoTermBuilder(this.Strategy.Session)
                                                .WithTermType(salesTerm.TermType)
                                                .WithTermValue(salesTerm.TermValue)
                                                .WithDescription(salesTerm.Description)
                                                .Build());
                }

                if (salesTerm.GetType().Name == typeof(InvoiceTerm).Name)
                {
                    salesInvoice.AddSalesTerm(new InvoiceTermBuilder(this.Strategy.Session)
                        .WithTermType(salesTerm.TermType)
                        .WithTermValue(salesTerm.TermValue)
                        .WithDescription(salesTerm.Description)
                        .Build());
                }

                if (salesTerm.GetType().Name == typeof(OrderTerm).Name)
                {
                    salesInvoice.AddSalesTerm(new OrderTermBuilder(this.Strategy.Session)
                        .WithTermType(salesTerm.TermType)
                        .WithTermValue(salesTerm.TermValue)
                        .WithDescription(salesTerm.Description)
                        .Build());
                }
            }

            return salesInvoice;
        }

        public SalesInvoice AppsCredit(SalesInvoiceCredit method)
        {
            var salesInvoice = new SalesInvoiceBuilder(this.Strategy.Session)
                .WithPurchaseInvoice(this.PurchaseInvoice)
                .WithBilledFrom(this.BilledFrom)
                .WithBilledFromContactMechanism(this.BilledFromContactMechanism)
                .WithBilledFromContactPerson(this.BilledFromContactPerson)
                .WithBillToCustomer(this.BillToCustomer)
                .WithBillToContactMechanism(this.BillToContactMechanism)
                .WithBillToContactPerson(this.BillToContactPerson)
                .WithBillToEndCustomer(this.BillToEndCustomer)
                .WithBillToEndCustomerContactMechanism(this.BillToEndCustomerContactMechanism)
                .WithBillToEndCustomerContactPerson(this.BillToEndCustomerContactPerson)
                .WithShipToCustomer(this.ShipToCustomer)
                .WithShipToAddress(this.ShipToAddress)
                .WithShipToContactPerson(this.ShipToContactPerson)
                .WithShipToEndCustomer(this.ShipToEndCustomer)
                .WithShipToEndCustomerAddress(this.ShipToEndCustomerAddress)
                .WithShipToEndCustomerContactPerson(this.ShipToEndCustomerContactPerson)
                .WithDescription(this.Description)
                .WithStore(this.Store)
                .WithInvoiceDate(this.strategy.Session.Now())
                .WithSalesChannel(this.SalesChannel)
                .WithSalesInvoiceType(new SalesInvoiceTypes(this.Strategy.Session).CreditNote)
                .WithVatRegime(this.VatRegime)
                .WithDiscountAdjustment(this.DiscountAdjustment)
                .WithSurchargeAdjustment(this.SurchargeAdjustment)
                .WithShippingAndHandlingCharge(this.ShippingAndHandlingCharge)
                .WithCustomerReference(this.CustomerReference)
                .WithPaymentMethod(this.PaymentMethod)
                .WithBillingAccount(this.BillingAccount)
                .Build();

            if (this.ExistDiscountAdjustment)
            {
                salesInvoice.DiscountAdjustment = new DiscountAdjustmentBuilder(this.Strategy.Session).WithAmount(this.DiscountAdjustment.Amount * -1).Build();
            }

            if (this.ExistSurchargeAdjustment)
            {
                salesInvoice.SurchargeAdjustment = new SurchargeAdjustmentBuilder(this.Strategy.Session).WithAmount(this.SurchargeAdjustment.Amount * -1).Build();
            }

            foreach (SalesInvoiceItem salesInvoiceItem in this.SalesInvoiceItems)
            {
                var invoiceItem = new SalesInvoiceItemBuilder(this.Strategy.Session)
                    .WithInvoiceItemType(salesInvoiceItem.InvoiceItemType)
                    .WithAssignedUnitPrice(salesInvoiceItem.AssignedUnitPrice * -1)
                    .WithProduct(salesInvoiceItem.Product)
                    .WithQuantity(salesInvoiceItem.Quantity)
                    .WithDescription(salesInvoiceItem.Description)
                    .WithSerialisedItem(salesInvoiceItem.SerialisedItem)
                    .WithComment(salesInvoiceItem.Comment)
                    .WithInternalComment(salesInvoiceItem.InternalComment)
                    .WithFacility(salesInvoiceItem.Facility)
                    .WithAssignedVatRegime(salesInvoiceItem.AssignedVatRegime)
                    .Build();

                invoiceItem.ProductFeatures = salesInvoiceItem.ProductFeatures;
                salesInvoice.AddSalesInvoiceItem(invoiceItem);
            }

            return salesInvoice;
        }

        public void AppsOnDeriveCustomers(IDerivation derivation)
        {
            this.RemoveCustomers();
            if (this.ExistBillToCustomer && !this.Customers.Contains(this.BillToCustomer))
            {
                this.AddCustomer(this.BillToCustomer);
            }

            if (this.ExistShipToCustomer && !this.Customers.Contains(this.ShipToCustomer))
            {
                this.AddCustomer(this.ShipToCustomer);
            }
        }

        public void AppsDelete(DeletableDelete method)
        {
            if (this.IsDeletable)
            {
                if (this.ExistShippingAndHandlingCharge)
                {
                    this.ShippingAndHandlingCharge.Delete();
                }

                if (this.ExistFee)
                {
                    this.Fee.Delete();
                }

                if (this.ExistDiscountAdjustment)
                {
                    this.DiscountAdjustment.Delete();
                }

                if (this.ExistSurchargeAdjustment)
                {
                    this.SurchargeAdjustment.Delete();
                }

                foreach (SalesInvoiceItem salesInvoiceItem in this.SalesInvoiceItems)
                {
                    salesInvoiceItem.Delete();
                }

                foreach (SalesTerm salesTerm in this.SalesTerms)
                {
                    salesTerm.Delete();
                }
            }
        }

        public void AppsPrint(PrintablePrint method)
        {
            if (!method.IsPrinted)
            {
                var singleton = this.Strategy.Session.GetSingleton();
                var logo = this.BilledFrom?.ExistLogoImage == true ?
                               this.BilledFrom.LogoImage.MediaContent.Data :
                               singleton.LogoImage.MediaContent.Data;

                var images = new Dictionary<string, byte[]>
                                 {
                                     { "Logo", logo },
                                 };

                if (this.ExistInvoiceNumber)
                {
                    var session = this.Strategy.Session;
                    var barcodeService = session.ServiceProvider.GetRequiredService<IBarcodeService>();
                    var barcode = barcodeService.Generate(this.InvoiceNumber, BarcodeType.CODE_128, 320, 80);
                    images.Add("Barcode", barcode);
                }

                var printModel = new Print.SalesInvoiceModel.Model(this);
                this.RenderPrintDocument(this.BilledFrom?.SalesInvoiceTemplate, printModel, images);

                this.PrintDocument.Media.FileName = $"{this.InvoiceNumber}.odt";
            }
        }

        public void CalculatePrices(
            IDerivation derivation,
            SalesInvoiceItem salesInvoiceItem,
            PriceComponent[] currentPriceComponents,
            decimal quantityOrdered,
            decimal totalBasePrice)
        {
            var currentGenericOrProductOrFeaturePriceComponents = new List<PriceComponent>();
            if (salesInvoiceItem.ExistProduct)
            {
                currentGenericOrProductOrFeaturePriceComponents.AddRange(salesInvoiceItem.Product.GetPriceComponents(currentPriceComponents));
            }

            foreach (ProductFeature productFeature in salesInvoiceItem.ProductFeatures)
            {
                currentGenericOrProductOrFeaturePriceComponents.AddRange(productFeature.GetPriceComponents(salesInvoiceItem.Product, currentPriceComponents));

            }

            var priceComponents = currentGenericOrProductOrFeaturePriceComponents.Where(
                v => PriceComponents.AppsIsApplicable(
                    new PriceComponents.IsApplicable
                    {
                        PriceComponent = v,
                        Customer = this.BillToCustomer,
                        Product = salesInvoiceItem.Product,
                        SalesInvoice = this,
                        QuantityOrdered = quantityOrdered,
                        ValueOrdered = totalBasePrice,
                    })).ToArray();

            var unitBasePrice = priceComponents.OfType<BasePrice>().Min(v => v.Price);

            // Calculate Unit Price (with Discounts and Surcharges)
            if (salesInvoiceItem.AssignedUnitPrice.HasValue)
            {
                salesInvoiceItem.UnitBasePrice = unitBasePrice ?? 0M;
                salesInvoiceItem.UnitDiscount = 0;
                salesInvoiceItem.UnitSurcharge = 0;
                salesInvoiceItem.UnitPrice = salesInvoiceItem.AssignedUnitPrice.Value;
            }
            else
            {
                if (!unitBasePrice.HasValue)
                {
                    derivation.Validation.AddError(salesInvoiceItem, M.SalesOrderItem.UnitBasePrice, "No BasePrice with a Price");
                    return;
                }

                salesInvoiceItem.UnitBasePrice = unitBasePrice.Value;

                salesInvoiceItem.UnitDiscount = priceComponents.OfType<DiscountComponent>().Sum(
                    v => v.Percentage.HasValue
                             ? Math.Round(salesInvoiceItem.UnitBasePrice * v.Percentage.Value / 100, 2)
                             : v.Price ?? 0);

                salesInvoiceItem.UnitSurcharge = priceComponents.OfType<SurchargeComponent>().Sum(
                    v => v.Percentage.HasValue
                             ? Math.Round(salesInvoiceItem.UnitBasePrice * v.Percentage.Value / 100, 2)
                             : v.Price ?? 0);


                salesInvoiceItem.UnitPrice = salesInvoiceItem.UnitBasePrice - salesInvoiceItem.UnitDiscount + salesInvoiceItem.UnitSurcharge;

                if (salesInvoiceItem.ExistDiscountAdjustment)
                {
                    salesInvoiceItem.UnitDiscount += salesInvoiceItem.DiscountAdjustment.Percentage.HasValue ?
                        Math.Round((salesInvoiceItem.UnitPrice * salesInvoiceItem.DiscountAdjustment.Percentage.Value) / 100, 2) :
                        salesInvoiceItem.DiscountAdjustment.Amount ?? 0;
                }

                if (salesInvoiceItem.ExistSurchargeAdjustment)
                {
                    salesInvoiceItem.UnitSurcharge += salesInvoiceItem.SurchargeAdjustment.Percentage.HasValue ?
                        Math.Round((salesInvoiceItem.UnitPrice * salesInvoiceItem.SurchargeAdjustment.Percentage.Value) / 100, 2) :
                        salesInvoiceItem.SurchargeAdjustment.Amount ?? 0;
                }

                salesInvoiceItem.UnitPrice = salesInvoiceItem.UnitBasePrice - salesInvoiceItem.UnitDiscount + salesInvoiceItem.UnitSurcharge;
            }

            salesInvoiceItem.UnitVat = salesInvoiceItem.ExistVatRate ? Math.Round((salesInvoiceItem.UnitPrice * salesInvoiceItem.VatRate.Rate) / 100, 2) : 0;

            // Calculate Totals
            salesInvoiceItem.TotalBasePrice = salesInvoiceItem.UnitBasePrice * salesInvoiceItem.Quantity;
            salesInvoiceItem.TotalDiscount = salesInvoiceItem.UnitDiscount * salesInvoiceItem.Quantity;
            salesInvoiceItem.TotalSurcharge = salesInvoiceItem.UnitSurcharge * salesInvoiceItem.Quantity;

            if (salesInvoiceItem.TotalBasePrice > 0)
            {
                salesInvoiceItem.TotalDiscountAsPercentage = Math.Round((salesInvoiceItem.TotalDiscount / salesInvoiceItem.TotalBasePrice) * 100, 2);
                salesInvoiceItem.TotalSurchargeAsPercentage = Math.Round((salesInvoiceItem.TotalSurcharge / salesInvoiceItem.TotalBasePrice) * 100, 2);
            }
            else
            {
                salesInvoiceItem.TotalDiscountAsPercentage = 0;
                salesInvoiceItem.TotalSurchargeAsPercentage = 0;
            }

            salesInvoiceItem.TotalExVat = salesInvoiceItem.UnitPrice * salesInvoiceItem.Quantity;
            salesInvoiceItem.TotalVat = salesInvoiceItem.UnitVat * salesInvoiceItem.Quantity;
            salesInvoiceItem.TotalIncVat = salesInvoiceItem.TotalExVat + salesInvoiceItem.TotalVat;
        }
    }
}
