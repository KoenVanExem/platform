// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PersonTests.cs" company="Allors bvba">
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
    
    public class PersonTests : DomainTest
    {
        [Fact]
        public void GivenPerson_WhenDeriving_ThenRequiredRelationsMustExist()
        {
            var builder = new PersonBuilder(this.Session);
            builder.Build();
                
            Assert.False(this.Session.Derive(false).HasErrors);
        }

        [Fact]
        public void GivenPerson_WhenEmployed_ThenIsEmployeeEqualsTrue()
        {
            var salesRep = new PersonBuilder(this.Session).WithLastName("salesRep").Build();

            var employment = new EmploymentBuilder(this.Session)
                .WithEmployee(salesRep)
                .WithFromDate(DateTime.UtcNow)
                .Build();

            this.Session.Derive();

            Assert.True(salesRep.AppsIsActiveEmployee(DateTime.UtcNow));
        }

        [Fact]
        public void GivenLoggedUserIsAdministrator_WhenAccessingSingleton_ThenLoggedInUserIsGrantedAccess()
        {
            var existingAdministrator = new People(this.Session).FindBy(M.Person.UserName, Users.AdministratorUserName);
            var secondAdministrator = new PersonBuilder(this.Session).WithLastName("second admin").Build();
            Assert.False(secondAdministrator.IsAdministrator);

            var internalOrganisation = this.InternalOrganisation;

            this.Session.Derive();

            this.SetIdentity(Users.AdministratorUserName);

            var acl = new AccessControlList(internalOrganisation, existingAdministrator);
            Assert.True(acl.CanWrite(M.Organisation.Name));
            
            acl = new AccessControlList(internalOrganisation, secondAdministrator);
            Assert.False(acl.CanRead(M.Organisation.Name));

            var administrators = new UserGroups(this.Session).Administrators;
            administrators.AddMember(secondAdministrator);

            this.Session.Derive();

            Assert.True(secondAdministrator.IsAdministrator);

            acl = new AccessControlList(internalOrganisation, secondAdministrator);
            Assert.True(acl.CanWrite(M.Organisation.Name));
        }

        [Fact]
        public void GivenPerson_WhenActiveContactRelationship_ThenPersonCurrentOrganisationContactRelationshipsContainsPerson()
        {
            var contact = new PersonBuilder(this.Session).WithLastName("organisationContact").Build();
            var organisation = new OrganisationBuilder(this.Session).WithName("organisation").Build();

            //new CustomerRelationshipBuilder(this.DatabaseSession)
            //    .WithCustomer(organisation)
            //    .WithFromDate(DateTimeFactory.CreateDate(2010, 01, 01))
            //    .Build();

            new OrganisationContactRelationshipBuilder(this.Session)
                .WithContact(contact)
                .WithOrganisation(organisation)
                .WithFromDate(DateTime.UtcNow.Date)
                .Build();

            this.Session.Derive();

            Assert.Equal(contact.CurrentOrganisationContactRelationships[0].Contact, contact);
            Assert.Equal(0, contact.InactiveOrganisationContactRelationships.Count);
        }

        [Fact]
        public void GivenPerson_WhenInActiveContactRelationship_ThenPersonInactiveOrganisationContactRelationshipsContainsPerson()
        {
            var contact = new PersonBuilder(this.Session).WithLastName("organisationContact").Build();
            var organisation = new OrganisationBuilder(this.Session).WithName("organisation").Build();

            new CustomerRelationshipBuilder(this.Session)
                .WithCustomer(organisation)
                .WithFromDate(DateTimeFactory.CreateDate(2010, 01, 01))
                .Build();

            new OrganisationContactRelationshipBuilder(this.Session)
                .WithContact(contact)
                .WithOrganisation(organisation)
                .WithFromDate(DateTime.UtcNow.Date.AddDays(-1))
                .WithThroughDate(DateTime.UtcNow.Date.AddDays(-1))
                .Build();

            this.Session.Derive();

            Assert.Equal(contact.InactiveOrganisationContactRelationships[0].Contact, contact);
            Assert.Equal(0, contact.CurrentOrganisationContactRelationships.Count);
        }
    }
}
