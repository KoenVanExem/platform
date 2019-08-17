// <copyright file="DiscountAdjustment.cs" company="Allors bvba">
// Copyright (c) Allors bvba. All rights reserved.
// Licensed under the LGPL license. See LICENSE file in the project root for full license information.
// </copyright>

namespace Allors.Domain
{
    using Meta;

    public partial class DiscountAdjustment
    {
        public void BaseOnPreDerive(ObjectOnPreDerive method)
        {
            var derivation = method.Derivation;

            if (derivation.HasChangedRoles(this))
            {
                if (this.ExistPriceableWhereDiscountAdjustment)
                {
                    var salesInvoiceItem = this.PriceableWhereDiscountAdjustment as SalesInvoiceItem;
                    var salesOrderItem = this.PriceableWhereDiscountAdjustment as SalesOrderItem;

                    if (salesInvoiceItem != null)
                    {
                        derivation.AddDependency(this, salesInvoiceItem);
                    }

                    if (salesOrderItem != null)
                    {
                        derivation.AddDependency(this, salesOrderItem);
                    }
                }

                if (this.ExistOrderWhereDiscountAdjustment)
                {
                    var salesOrder = (SalesOrder)this.OrderWhereDiscountAdjustment;
                    derivation.AddDependency(this, salesOrder);
                }

                if (this.ExistInvoiceWhereDiscountAdjustment)
                {
                    var salesInvoice = (SalesInvoice)this.InvoiceWhereDiscountAdjustment;
                    derivation.AddDependency(this, salesInvoice);
                }
            }
        }

        public void BaseOnDerive(ObjectOnDerive method)
        {
            var derivation = method.Derivation;

            if (!this.ExistCurrentVersion)
            {
                derivation.Validation.AssertAtLeastOne(
                    this,
                    M.DiscountAdjustment.Amount,
                    M.DiscountAdjustment.Percentage);
                derivation.Validation.AssertExistsAtMostOne(
                    this,
                    M.DiscountAdjustment.Amount,
                    M.DiscountAdjustment.Percentage);
            }
            else
            {
                if (this.ExistAmount && this.ExistPercentage)
                {
                    var version = CurrentVersion;
                    if (version.ExistAmount)
                    {
                        this.RemoveAmount();
                    }
                    else
                    {
                        this.RemovePercentage();
                    }
                }
            }
        }
    }
}