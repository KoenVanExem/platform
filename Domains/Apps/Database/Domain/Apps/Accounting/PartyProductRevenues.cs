// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PartyProductRevenues.cs" company="Allors bvba">
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
    using Meta;
    
    public partial class PartyProductRevenues
    {
        public static PartyProductRevenue AppsFindOrCreateAsDependable(ISession session, Product product, SalesInvoice invoice)
        {
            var partyProductRevenues = invoice.BillToCustomer.PartyProductRevenuesWhereParty;
            partyProductRevenues.Filter.AddEquals(M.PartyProductRevenue.Year, invoice.InvoiceDate.Year);
            partyProductRevenues.Filter.AddEquals(M.PartyProductRevenue.Month, invoice.InvoiceDate.Month);
            partyProductRevenues.Filter.AddEquals(M.PartyProductRevenue.Product, product);
            var partyProductRevenue = partyProductRevenues.First ?? new PartyProductRevenueBuilder(session)
                                                                        .WithParty(invoice.BillToCustomer)
                                                                        .WithProduct(product)
                                                                        .WithYear(invoice.InvoiceDate.Year)
                                                                        .WithMonth(invoice.InvoiceDate.Month)
                                                                        .WithCurrency(session.GetSingleton().PreferredCurrency)
                                                                        .Build();

            PartyRevenues.AppsFindOrCreateAsDependable(session, partyProductRevenue);
            ProductRevenues.AppsFindOrCreateAsDependable(session, partyProductRevenue);
            PartyProductCategoryRevenues.AppsFindOrCreateAsDependable(session, partyProductRevenue);

            return partyProductRevenue;
        }

        public static void AppsOnDeriveRevenues(ISession session)
        {
            var partyProductRevenuesByPeriodByProductByParty = new Dictionary<Party, Dictionary<Product, Dictionary<DateTime, PartyProductRevenue>>>();

            var partyProductRevenues = session.Extent<PartyProductRevenue>();

            foreach (PartyProductRevenue partyProductRevenue in partyProductRevenues)
            {
                partyProductRevenue.Revenue = 0;
                partyProductRevenue.Quantity = 0;
                var date = DateTimeFactory.CreateDate(partyProductRevenue.Year, partyProductRevenue.Month, 01);

                Dictionary<Product, Dictionary<DateTime, PartyProductRevenue>> partyProductRevenuesByPeriodByproduct;
                if (!partyProductRevenuesByPeriodByProductByParty.TryGetValue(partyProductRevenue.Party, out partyProductRevenuesByPeriodByproduct))
                {
                    partyProductRevenuesByPeriodByproduct = new Dictionary<Product, Dictionary<DateTime, PartyProductRevenue>>();
                    partyProductRevenuesByPeriodByProductByParty[partyProductRevenue.Party] = partyProductRevenuesByPeriodByproduct;
                }

                Dictionary<DateTime, PartyProductRevenue> partyProductRevenuesByPeriod;
                if (!partyProductRevenuesByPeriodByproduct.TryGetValue(partyProductRevenue.Product, out partyProductRevenuesByPeriod))
                {
                    partyProductRevenuesByPeriod = new Dictionary<DateTime, PartyProductRevenue>();
                    partyProductRevenuesByPeriodByproduct[partyProductRevenue.Product] = partyProductRevenuesByPeriod;
                }

                PartyProductRevenue revenue;
                if (!partyProductRevenuesByPeriod.TryGetValue(date, out revenue))
                {
                    partyProductRevenuesByPeriod.Add(date, partyProductRevenue);
                }
            }

            var revenues = new HashSet<long>();

            var salesInvoices = session.Extent<SalesInvoice>();
            var year = 0;
            foreach (SalesInvoice salesInvoice in salesInvoices)
            {
                if (year != salesInvoice.InvoiceDate.Year)
                {
                    session.Commit();
                    year = salesInvoice.InvoiceDate.Year;
                }

                var date = DateTimeFactory.CreateDate(salesInvoice.InvoiceDate.Year, salesInvoice.InvoiceDate.Month, 01);

                foreach (SalesInvoiceItem salesInvoiceItem in salesInvoice.SalesInvoiceItems)
                {
                    if (salesInvoiceItem.ExistProduct)
                    {
                        PartyProductRevenue partyProductRevenue;
                        Dictionary<Product, Dictionary<DateTime, PartyProductRevenue>> partyProductRevenuesByPeriodByProduct;
                        if (!partyProductRevenuesByPeriodByProductByParty.TryGetValue(salesInvoice.BillToCustomer, out partyProductRevenuesByPeriodByProduct))
                        {
                            partyProductRevenue = CreatePartyProductRevenue(session, salesInvoiceItem);

                            partyProductRevenuesByPeriodByProduct = new Dictionary<Product, Dictionary<DateTime, PartyProductRevenue>>
                                {
                                    { salesInvoiceItem.Product, new Dictionary<DateTime, PartyProductRevenue> { { date, partyProductRevenue } } }
                                };

                            partyProductRevenuesByPeriodByProductByParty[salesInvoice.BillToCustomer] = partyProductRevenuesByPeriodByProduct;
                        }

                        Dictionary<DateTime, PartyProductRevenue> partyProductRevenuesByPeriod;
                        if (!partyProductRevenuesByPeriodByProduct.TryGetValue(salesInvoiceItem.Product, out partyProductRevenuesByPeriod))
                        {
                            partyProductRevenue = CreatePartyProductRevenue(session, salesInvoiceItem);

                            partyProductRevenuesByPeriod = new Dictionary<DateTime, PartyProductRevenue>
                                {
                                    { date, partyProductRevenue } 
                                };

                            partyProductRevenuesByPeriodByProduct[salesInvoiceItem.Product] = partyProductRevenuesByPeriod;
                        }

                        if (!partyProductRevenuesByPeriod.TryGetValue(date, out partyProductRevenue))
                        {
                            partyProductRevenue = CreatePartyProductRevenue(session, salesInvoiceItem);
                            partyProductRevenuesByPeriod.Add(date, partyProductRevenue);
                        }

                        revenues.Add(partyProductRevenue.Id);
                        partyProductRevenue.Revenue += salesInvoiceItem.TotalExVat;
                        partyProductRevenue.Quantity += salesInvoiceItem.Quantity;
                    }
                }
            }

            foreach (PartyProductRevenue partyProductRevenue in partyProductRevenues)
            {
                if (!revenues.Contains(partyProductRevenue.Id))
                {
                    partyProductRevenue.Delete();
                }
            }
        }

        private static PartyProductRevenue CreatePartyProductRevenue(ISession session, SalesInvoiceItem item)
        {
            return new PartyProductRevenueBuilder(session)
                        .WithParty(item.SalesInvoiceWhereSalesInvoiceItem.BillToCustomer)
                        .WithYear(item.SalesInvoiceWhereSalesInvoiceItem.InvoiceDate.Year)
                        .WithMonth(item.SalesInvoiceWhereSalesInvoiceItem.InvoiceDate.Month)
                        .WithCurrency(session.GetSingleton().PreferredCurrency)
                        .WithProduct(item.Product)
                        .Build();
        }
    }
}
