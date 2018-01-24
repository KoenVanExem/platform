// --------------------------------------------------------------------------------------------------------------------
// <copyright file="StoreTests.cs" company="Allors bvba">
//   Copyright 2002-2009 Allors bvba.
// 
// Dual Licensed under
//   a) the General Public Licence v3 (GPL)
//   b) the Allors License
// 
// The GPL License is included in the file gpl.txt.
// The Allors License is an addendum to your contract.
// 
// Allors Platform is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// For more information visit http://www.allors.com/legal
// </copyright>
// <summary>
//   Defines the PersonTests type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Allors.Domain
{
    using System;
    using Meta;
    using Xunit;

    
    public class StoreTests : DomainTest
    {
        [Fact]
        public void GivenStore_WhenDeriving_ThenRequiredRelationsMustExist()
        {
            var builder = new StoreBuilder(this.Session);
            builder.Build();

            Assert.True(this.Session.Derive(false).HasErrors);

            this.Session.Rollback();

            builder.WithName("Organisation store");
            builder.Build();

            Assert.True(this.Session.Derive(false).HasErrors);

            this.Session.Rollback();

            builder.WithDefaultCarrier(new Carriers(this.Session).Fedex);
            builder.Build();

            Assert.True(this.Session.Derive(false).HasErrors);

            this.Session.Rollback();

            builder.WithDefaultShipmentMethod(new ShipmentMethods(this.Session).Ground);
            builder.Build();

            Assert.False(this.Session.Derive(false).HasErrors);

            builder.WithSalesInvoiceCounter( new CounterBuilder(this.Session).Build() ).Build();
            builder.Build();

            Assert.False(this.Session.Derive(false).HasErrors);

            builder.WithFiscalYearInvoiceNumber(new FiscalYearInvoiceNumberBuilder(this.Session).WithFiscalYear(DateTime.Today.Year).Build());
            builder.Build();

            Assert.True(this.Session.Derive(false).HasErrors);
        }

        [Fact]
        public void GivenStore_WhenBuild_ThenPostBuildRelationsMustExist()
        {
            var internalOrganisation = this.InternalOrganisation;

            var store = new StoreBuilder(this.Session)
                .WithName("Organisation store")
                .WithDefaultCarrier(new Carriers(this.Session).Fedex)
                .WithDefaultShipmentMethod(new ShipmentMethods(this.Session).Ground)
                .Build();

            this.Session.Derive();

            Assert.Equal(0, store.CreditLimit);
            Assert.Equal(0, store.PaymentGracePeriod);
            Assert.Equal(0, store.ShipmentThreshold);
            Assert.Equal(internalOrganisation.DefaultPaymentMethod, store.DefaultPaymentMethod);
            Assert.Equal(1, store.PaymentMethods.Count);
            Assert.Equal(new Facilities(this.Session).FindBy(M.Facility.FacilityType, new FacilityTypes(this.Session).Warehouse), store.DefaultFacility);
        }

        [Fact]
        public void GivenStore_WhenDefaultPaymentMethodIsSet_ThenPaymentMethodIsAddedToCollectionPaymentMethods()
        {
            this.Session.Commit();

            var netherlands = new Countries(this.Session).CountryByIsoCode["NL"];
            var euro = netherlands.Currency;

            var bank = new BankBuilder(this.Session).WithCountry(netherlands).WithName("RABOBANK GROEP").WithBic("RABONL2U").Build();

            var ownBankAccount = new OwnBankAccountBuilder(this.Session)
                .WithDescription("BE23 3300 6167 6391")
                .WithBankAccount(new BankAccountBuilder(this.Session).WithBank(bank).WithCurrency(euro).WithIban("NL50RABO0109546784").WithNameOnAccount("Martien").Build())
                .Build();

            var store = new StoreBuilder(this.Session)
                .WithName("Organisation store")
                .WithDefaultCarrier(new Carriers(this.Session).Fedex)
                .WithDefaultShipmentMethod(new ShipmentMethods(this.Session).Ground)
                .WithDefaultPaymentMethod(ownBankAccount)
                .Build();

            this.Session.Derive();

            Assert.Equal(1, store.PaymentMethods.Count);
            Assert.Equal(ownBankAccount, store.PaymentMethods.First);
        }

        [Fact]
        public void GivenStoreWithoutDefaultPaymentMethod_WhenSinglePaymentMethodIsAdded_ThenDefaultPaymentMethodIsSet()
        {
            this.Session.Commit();

            var netherlands = new Countries(this.Session).CountryByIsoCode["NL"];
            var euro = netherlands.Currency;

            var bank = new BankBuilder(this.Session).WithCountry(netherlands).WithName("RABOBANK GROEP").WithBic("RABONL2U").Build();

            var ownBankAccount = new OwnBankAccountBuilder(this.Session)
                .WithDescription("BE23 3300 6167 6391")
                .WithBankAccount(new BankAccountBuilder(this.Session).WithBank(bank).WithCurrency(euro).WithIban("NL50RABO0109546784").WithNameOnAccount("Martien").Build())
                .Build();

            var store = new StoreBuilder(this.Session)
                .WithName("Organisation store")
                .WithDefaultCarrier(new Carriers(this.Session).Fedex)
                .WithDefaultShipmentMethod(new ShipmentMethods(this.Session).Ground)
                .WithPaymentMethod(ownBankAccount)
                .Build();

            this.Session.Derive();

            Assert.Equal(ownBankAccount, store.DefaultPaymentMethod);
        }
    }
}
