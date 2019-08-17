// <copyright file="QuoteItem.cs" company="Allors bvba">
// Copyright (c) Allors bvba. All rights reserved.
// Licensed under the LGPL license. See LICENSE file in the project root for full license information.
// </copyright>

namespace Allors.Domain
{
    using Meta;

    public partial class QuoteItem
    {
        public decimal LineTotal => this.Quantity * this.UnitPrice;

        public static readonly TransitionalConfiguration[] StaticTransitionalConfigurations =
            {
                new TransitionalConfiguration(M.QuoteItem, M.QuoteItem.QuoteItemState),
            };

        public TransitionalConfiguration[] TransitionalConfigurations => StaticTransitionalConfigurations;

        public void BaseDelegateAccess(DelegatedAccessControlledObjectDelegateAccess method)
        {
            method.SecurityTokens = this.SyncedQuote?.SecurityTokens.ToArray();
            method.DeniedPermissions = this.SyncedQuote?.DeniedPermissions.ToArray();
        }

        public void BaseOnBuild(ObjectOnBuild method)
        {
            if (!this.ExistQuoteItemState)
            {
                this.QuoteItemState = new QuoteItemStates(this.Strategy.Session).Submitted;
            }

            if (this.ExistProduct && !this.ExistInvoiceItemType)
            {
                this.InvoiceItemType = new InvoiceItemTypes(this.Strategy.Session).ProductItem;
            }
        }

        public void BaseOnPreDerive(ObjectOnPreDerive method)
        {
            var derivation = method.Derivation;

            if (derivation.IsModified(this))
            {
                if (this.ExistQuoteWhereQuoteItem)
                {
                    derivation.AddDependency(this.QuoteWhereQuoteItem, this);
                }
            }
        }

        public void BaseOnDerive(ObjectOnDerive method)
        {
            var derivation = method.Derivation;

            derivation.Validation.AssertAtLeastOne(this, M.QuoteItem.Product, M.QuoteItem.ProductFeature, M.QuoteItem.SerialisedItem, M.QuoteItem.Deliverable, M.QuoteItem.WorkEffort);
            derivation.Validation.AssertExistsAtMostOne(this, M.QuoteItem.Product, M.QuoteItem.ProductFeature, M.QuoteItem.Deliverable, M.QuoteItem.WorkEffort);
            derivation.Validation.AssertExistsAtMostOne(this, M.QuoteItem.SerialisedItem, M.QuoteItem.ProductFeature, M.QuoteItem.Deliverable, M.QuoteItem.WorkEffort);

            if (!this.ExistDetails && this.ExistSerialisedItem)
            {
                this.Details = this.SerialisedItem.Details;
            }

            if (this.ExistRequestItem)
            {
                this.RequiredByDate = this.RequestItem.RequiredByDate;
            }

            if (!this.ExistUnitOfMeasure)
            {
                this.UnitOfMeasure = new UnitsOfMeasure(this.Strategy.Session).Piece;
            }

            if (this.QuoteWhereQuoteItem.QuoteState.Equals(new QuoteStates(this.Strategy.Session).Cancelled))
            {
                if (this.QuoteItemState != new QuoteItemStates(this.Strategy.Session).Rejected)
                {
                    this.QuoteItemState = new QuoteItemStates(this.Strategy.Session).Cancelled;
                }
            }

            if (this.QuoteWhereQuoteItem.QuoteState.Equals(new QuoteStates(this.Strategy.Session).Rejected))
            {
                if (this.QuoteItemState != new QuoteItemStates(this.Strategy.Session).Cancelled)
                {
                    this.QuoteItemState = new QuoteItemStates(this.Strategy.Session).Rejected;
                }
            }
        }

        public void BaseCancel(QuoteItemCancel method) => this.QuoteItemState = new QuoteItemStates(this.Strategy.Session).Cancelled;

        public void BaseReject(QuoteItemReject method) => this.QuoteItemState = new QuoteItemStates(this.Strategy.Session).Rejected;

        public void BaseOrder(QuoteItemOrder method) => this.QuoteItemState = new QuoteItemStates(this.Strategy.Session).Ordered;

        public void BaseSubmit(QuoteItemSubmit method) => this.QuoteItemState = new QuoteItemStates(this.Strategy.Session).Submitted;

        public void Sync(Quote quote) => this.SyncedQuote = quote;
    }
}