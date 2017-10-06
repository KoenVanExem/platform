//------------------------------------------------------------------------------------------------- 
// <copyright file="PurchaseOrderTests.cs" company="Allors bvba">
// Copyright 2002-2009 Allors bvba.
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
// <summary>Defines the MediaTests type.</summary>
//-------------------------------------------------------------------------------------------------

using Resources;

namespace Allors.Domain
{
    using System;
    using System.Security.Principal;
    using System.Threading;
    using Meta;
    using Xunit;

    public class PurchaseOrderTests : DomainTest
    {
        [Fact]
        public void GivenPurchaseOrderBuilder_WhenBuild_ThenPostBuildRelationsMustExist()
        {
            var supplier = new OrganisationBuilder(this.DatabaseSession).WithName("supplier").WithOrganisationRole(new OrganisationRoles(this.DatabaseSession).Supplier).Build();
            var internalOrganisation = Singleton.Instance(this.DatabaseSession).InternalOrganisation;
            new SupplierRelationshipBuilder(this.DatabaseSession).WithSupplier(supplier).Build();

            var order = new PurchaseOrderBuilder(this.DatabaseSession).WithTakenViaSupplier(supplier).Build();

            Assert.Equal(new PurchaseOrderStates(this.DatabaseSession).Provisional, order.PurchaseOrderState);
            Assert.Equal(DateTime.UtcNow.Date, order.OrderDate.Date);
            Assert.Equal(DateTime.UtcNow.Date, order.EntryDate.Date);
            Assert.Equal(order.PreviousTakenViaSupplier, order.TakenViaSupplier);
            Assert.True(order.ExistUniqueId);
        }

        [Fact]
        public void GivenOrder_WhenDeriving_ThenRequiredRelationsMustExist()
        {
            var supplier = new OrganisationBuilder(this.DatabaseSession).WithName("customer2").WithOrganisationRole(new OrganisationRoles(this.DatabaseSession).Customer).Build();
            var internalOrganisation = Singleton.Instance(this.DatabaseSession).InternalOrganisation;
            new SupplierRelationshipBuilder(this.DatabaseSession).WithSupplier(supplier).Build();

            var mechelen = new CityBuilder(this.DatabaseSession).WithName("Mechelen").Build();
            ContactMechanism takenViaContactMechanism = new PostalAddressBuilder(this.DatabaseSession).WithGeographicBoundary(mechelen).WithAddress1("Haverwerf 15").Build();
            var supplierContactMechanism = new PartyContactMechanismBuilder(this.DatabaseSession)
                .WithContactMechanism(takenViaContactMechanism)
                .WithUseAsDefault(true)
                .WithContactPurpose(new ContactMechanismPurposes(this.DatabaseSession).OrderAddress)
                .Build();
            supplier.AddPartyContactMechanism(supplierContactMechanism);

            this.DatabaseSession.Derive();
            this.DatabaseSession.Commit();

            var builder = new PurchaseOrderBuilder(this.DatabaseSession);
            builder.Build();

            Assert.True(this.DatabaseSession.Derive(false).HasErrors);

            this.DatabaseSession.Rollback();

            builder.WithTakenViaSupplier(supplier);
            builder.Build();

            Assert.False(this.DatabaseSession.Derive(false).HasErrors);

            builder.WithTakenViaContactMechanism(takenViaContactMechanism);
            builder.Build();

            Assert.False(this.DatabaseSession.Derive(false).HasErrors);
        }

        [Fact]
        public void GivenPurchaseOrder_WhenDeriving_ThenTakenViaSupplierMustBeInSupplierRelationship()
        {
            var supplier = new OrganisationBuilder(this.DatabaseSession).WithName("customer2").WithOrganisationRole(new OrganisationRoles(this.DatabaseSession).Customer).Build();
            var internalOrganisation = Singleton.Instance(this.DatabaseSession).InternalOrganisation;

            new PurchaseOrderBuilder(this.DatabaseSession)
                .WithTakenViaSupplier(supplier)
                .Build();

            var expectedError = ErrorMessages.PartyIsNotASupplier;
            Assert.Equal(expectedError, this.DatabaseSession.Derive(false).Errors[0].Message);

            new SupplierRelationshipBuilder(this.DatabaseSession).WithSupplier(supplier).Build();

            Assert.False(this.DatabaseSession.Derive(false).HasErrors);
        }

        [Fact]
        public void GivenOrder_WhenDeriving_ThenLocaleMustExist()
        {
            var englischLocale = new Locales(this.DatabaseSession).EnglishGreatBritain;

            var supplier = new OrganisationBuilder(this.DatabaseSession).WithName("customer2").WithOrganisationRole(new OrganisationRoles(this.DatabaseSession).Customer).Build();
            new SupplierRelationshipBuilder(this.DatabaseSession).WithSupplier(supplier).Build();

            var mechelen = new CityBuilder(this.DatabaseSession).WithName("Mechelen").Build();
            ContactMechanism takenViaContactMechanism = new PostalAddressBuilder(this.DatabaseSession).WithGeographicBoundary(mechelen).WithAddress1("Haverwerf 15").Build();
            var supplierContactMechanism = new PartyContactMechanismBuilder(this.DatabaseSession)
                .WithContactMechanism(takenViaContactMechanism)
                .WithUseAsDefault(true)
                .WithContactPurpose(new ContactMechanismPurposes(this.DatabaseSession).OrderAddress)
                .Build();
            supplier.AddPartyContactMechanism(supplierContactMechanism);

            var order = new PurchaseOrderBuilder(this.DatabaseSession)
                .WithTakenViaSupplier(supplier)
                .Build();

            this.DatabaseSession.Derive();

            Assert.Equal(Singleton.Instance(this.DatabaseSession).DefaultLocale, order.Locale);
        }

        [Fact]
        public void GivenPurchaseOrder_WhenGettingOrderNumberWithoutFormat_ThenOrderNumberShouldBeReturned()
        {
            var internalOrganisation = Singleton.Instance(this.DatabaseSession).InternalOrganisation;
            internalOrganisation.RemovePurchaseOrderNumberPrefix();

            var supplier = new OrganisationBuilder(this.DatabaseSession).WithName("customer2").WithOrganisationRole(new OrganisationRoles(this.DatabaseSession).Customer).Build();

            var order1 = new PurchaseOrderBuilder(this.DatabaseSession).WithTakenViaSupplier(supplier).Build();
            Assert.Equal("1", order1.OrderNumber);

            var order2 = new PurchaseOrderBuilder(this.DatabaseSession).WithTakenViaSupplier(supplier).Build();
            Assert.Equal("2", order2.OrderNumber);
        }

        [Fact]
        public void GivenPurchaseOrder_WhenGettingOrderNumberWithFormat_ThenFormattedOrderNumberShouldBeReturned()
        {
            var supplier = new OrganisationBuilder(this.DatabaseSession).WithName("customer2").WithOrganisationRole(new OrganisationRoles(this.DatabaseSession).Customer).Build();
            var internalOrganisation = Singleton.Instance(this.DatabaseSession).InternalOrganisation;
            internalOrganisation.PurchaseOrderNumberPrefix = "the format is ";

            var order1 = new PurchaseOrderBuilder(this.DatabaseSession)
                .WithTakenViaSupplier(supplier)
                .Build();

            Assert.Equal("the format is 1", order1.OrderNumber);

            var order2 = new PurchaseOrderBuilder(this.DatabaseSession)
                .WithTakenViaSupplier(supplier)
                .Build();

            Assert.Equal("the format is 2", order2.OrderNumber);
        }

        [Fact]
        public void GivenPurchaseOrder_WhenObjectStateIsApproved_ThenCheckTransitions()
        {
            this.SetIdentity("orderProcessor");

            var supplier = new OrganisationBuilder(this.DatabaseSession).WithName("customer2").WithOrganisationRole(new OrganisationRoles(this.DatabaseSession).Customer).Build();
            var internalOrganisation = Singleton.Instance(this.DatabaseSession).InternalOrganisation;
            new SupplierRelationshipBuilder(this.DatabaseSession).WithSupplier(supplier).Build();

            var order = new PurchaseOrderBuilder(this.DatabaseSession)
                .WithTakenViaSupplier(supplier)
                .Build();

            order.Confirm();

            this.DatabaseSession.Derive(); 
            
            order.Approve();

            this.DatabaseSession.Derive();

            Assert.Equal(new PurchaseOrderStates(this.DatabaseSession).RequestsApproval, order.PurchaseOrderState);
            var acl = new AccessControlList(order, new Users(this.DatabaseSession).CurrentUser);
            Assert.False(acl.CanExecute(M.PurchaseOrder.Confirm));
            Assert.False(acl.CanExecute(M.PurchaseOrder.Reject));
            Assert.False(acl.CanExecute(M.PurchaseOrder.Approve));
            Assert.False(acl.CanExecute(M.PurchaseOrder.Continue));
        }

        [Fact]
        public void GivenPurchaseOrder_WhenObjectStateIsInProcess_ThenCheckTransitions()
        {
            this.SetIdentity("orderProcessor");

            var supplier = new OrganisationBuilder(this.DatabaseSession).WithName("customer2").WithOrganisationRole(new OrganisationRoles(this.DatabaseSession).Customer).Build();
            var internalOrganisation = Singleton.Instance(this.DatabaseSession).InternalOrganisation;
            new SupplierRelationshipBuilder(this.DatabaseSession).WithSupplier(supplier).Build();

            var order = new PurchaseOrderBuilder(this.DatabaseSession)
                .WithTakenViaSupplier(supplier)
                .Build();

            order.Confirm();

            this.DatabaseSession.Derive();

            Assert.Equal(new PurchaseOrderStates(this.DatabaseSession).InProcess, order.PurchaseOrderState);
            var acl = new AccessControlList(order, new Users(this.DatabaseSession).CurrentUser);
            Assert.True(acl.CanExecute(M.PurchaseOrder.Cancel));
            Assert.True(acl.CanExecute(M.PurchaseOrder.Hold));
            Assert.False(acl.CanExecute(M.PurchaseOrder.Confirm));
            Assert.False(acl.CanExecute(M.PurchaseOrder.Reject));
            Assert.False(acl.CanExecute(M.PurchaseOrder.Approve));
            Assert.False(acl.CanExecute(M.PurchaseOrder.Continue));
        }

        [Fact]
        public void GivenPurchaseOrder_WhenObjectStateIsOnHold_ThenCheckTransitions()
        {
            this.SetIdentity("orderProcessor");

            var supplier = new OrganisationBuilder(this.DatabaseSession).WithName("customer2").WithOrganisationRole(new OrganisationRoles(this.DatabaseSession).Customer).Build();
            var internalOrganisation = Singleton.Instance(this.DatabaseSession).InternalOrganisation;
            new SupplierRelationshipBuilder(this.DatabaseSession).WithSupplier(supplier).Build();

            var order = new PurchaseOrderBuilder(this.DatabaseSession)
                .WithTakenViaSupplier(supplier)
                .Build();

            order.Confirm();

            this.DatabaseSession.Derive(); 
            
            order.Hold();

            this.DatabaseSession.Derive();

            Assert.Equal(new PurchaseOrderStates(this.DatabaseSession).OnHold, order.PurchaseOrderState);
            var acl = new AccessControlList(order, new Users(this.DatabaseSession).CurrentUser);
            Assert.True(acl.CanExecute(M.PurchaseOrder.Cancel));
            Assert.True(acl.CanExecute(M.PurchaseOrder.Continue));
            Assert.False(acl.CanExecute(M.PurchaseOrder.Confirm));
            Assert.False(acl.CanExecute(M.PurchaseOrder.Reject));
            Assert.False(acl.CanExecute(M.PurchaseOrder.Approve));
            Assert.False(acl.CanExecute(M.PurchaseOrder.Hold));
        }

        [Fact]
        public void GivenPurchaseOrder_WhenConfirming_ThenAllValidItemsAreInConfirmedState()
        {
            var supplier = new OrganisationBuilder(this.DatabaseSession).WithName("customer2").WithOrganisationRole(new OrganisationRoles(this.DatabaseSession).Customer).Build();
            var internalOrganisation = Singleton.Instance(this.DatabaseSession).InternalOrganisation;
            new SupplierRelationshipBuilder(this.DatabaseSession).WithSupplier(supplier).Build();

            var part = new RawMaterialBuilder(this.DatabaseSession).WithName("RawMaterial").Build();

            var order = new PurchaseOrderBuilder(this.DatabaseSession)
                .WithTakenViaSupplier(supplier)
                .WithVatRegime(new VatRegimes(this.DatabaseSession).Exempt)
                .Build();

            var item1 = new PurchaseOrderItemBuilder(this.DatabaseSession).WithPart(part).WithQuantityOrdered(1).Build();
            var item2 = new PurchaseOrderItemBuilder(this.DatabaseSession).WithPart(part).WithQuantityOrdered(2).Build();
            var item3 = new PurchaseOrderItemBuilder(this.DatabaseSession).WithPart(part).WithQuantityOrdered(3).Build();
            var item4 = new PurchaseOrderItemBuilder(this.DatabaseSession).WithPart(part).WithQuantityOrdered(4).Build();
            order.AddPurchaseOrderItem(item1);
            order.AddPurchaseOrderItem(item2);
            order.AddPurchaseOrderItem(item3);
            order.AddPurchaseOrderItem(item4);

            this.DatabaseSession.Derive();

            order.Confirm();

            this.DatabaseSession.Derive();

            item4.Cancel();

            this.DatabaseSession.Derive(); 

            Assert.Equal(3, order.ValidOrderItems.Count);
            Assert.Contains(item1, order.ValidOrderItems);
            Assert.Contains(item2, order.ValidOrderItems);
            Assert.Contains(item3, order.ValidOrderItems);
            Assert.Equal(new PurchaseOrderItemStates(this.DatabaseSession).InProcess, item1.PurchaseOrderItemState);
            Assert.Equal(new PurchaseOrderItemStates(this.DatabaseSession).InProcess, item2.PurchaseOrderItemState);
            Assert.Equal(new PurchaseOrderItemStates(this.DatabaseSession).InProcess, item3.PurchaseOrderItemState);
            Assert.Equal(new PurchaseOrderItemStates(this.DatabaseSession).Cancelled, item4.PurchaseOrderItemState);
        }

        [Fact]
        public void GivenPurchaseOrder_WhenOrdering_ThenAllValidItemsAreInInProcessState()
        {
            var supplier = new OrganisationBuilder(this.DatabaseSession).WithName("customer2").WithOrganisationRole(new OrganisationRoles(this.DatabaseSession).Customer).Build();
            var internalOrganisation = Singleton.Instance(this.DatabaseSession).InternalOrganisation;
            new SupplierRelationshipBuilder(this.DatabaseSession).WithSupplier(supplier).Build();

            var part = new RawMaterialBuilder(this.DatabaseSession).WithName("RawMaterial").Build();

            var order = new PurchaseOrderBuilder(this.DatabaseSession)
                .WithTakenViaSupplier(supplier)
                .WithVatRegime(new VatRegimes(this.DatabaseSession).Exempt)
                .Build();

            var item1 = new PurchaseOrderItemBuilder(this.DatabaseSession).WithPart(part).WithQuantityOrdered(1).Build();
            var item2 = new PurchaseOrderItemBuilder(this.DatabaseSession).WithPart(part).WithQuantityOrdered(2).Build();
            var item3 = new PurchaseOrderItemBuilder(this.DatabaseSession).WithPart(part).WithQuantityOrdered(3).Build();
            order.AddPurchaseOrderItem(item1);
            order.AddPurchaseOrderItem(item2);
            order.AddPurchaseOrderItem(item3);

            this.DatabaseSession.Derive();

            order.Confirm();

            this.DatabaseSession.Derive();

            Assert.Equal(3, order.ValidOrderItems.Count);
            Assert.Contains(item1, order.ValidOrderItems);
            Assert.Contains(item2, order.ValidOrderItems);
            Assert.Contains(item3, order.ValidOrderItems);
            Assert.Equal(new PurchaseOrderItemStates(this.DatabaseSession).InProcess, item1.PurchaseOrderItemState);
            Assert.Equal(new PurchaseOrderItemStates(this.DatabaseSession).InProcess, item2.PurchaseOrderItemState);
            Assert.Equal(new PurchaseOrderItemStates(this.DatabaseSession).InProcess, item3.PurchaseOrderItemState);
        }
    }
}