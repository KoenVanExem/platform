// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ContactMechanismPurpose.cs" company="Allors bvba">
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
    public partial class ContactMechanismPurpose
    {
        public bool IsHeadQuarters => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).HeadQuarters);

        public bool IsSalesOffice => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).SalesOffice);

        public bool IsHomeAddress => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).HomeAddress);

        public bool IsGeneralPhoneNumber => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).GeneralPhoneNumber);

        public bool IsGeneralFaxNumber => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).GeneralFaxNumber);

        public bool IsGeneralEmail => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).GeneralEmail);

        public bool IsGeneralCorrespondence => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).GeneralCorrespondence);

        public bool IsBillingAddress => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).BillingAddress);

        public bool IsInternetAddress => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).InternetAddress);

        public bool IsOrderAddress => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).OrderAddress);

        public bool IsShippingAddress => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).ShippingAddress);

        public bool IsBillingInquiriesPhone => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).BillingInquiriesPhone);

        public bool IsOrderInquiriesPhone => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).OrderInquiriesPhone);

        public bool IsShippingInquiriesPhone => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).ShippingInquiriesPhone);

        public bool IsBillingInquiriesFax => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).BillingInquiriesFax);

        public bool IsOrderInquiriesFax => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).OrderInquiriesFax);

        public bool IsShippingInquiriesFax => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).ShippingInquiriesFax);

        public bool IsPersonalEmailAddress => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).PersonalEmailAddress);

        public bool IsCellPhoneNumber => this.Equals(new ContactMechanismPurposes(this.Strategy.Session).MobilePhoneNumber);
    }
}