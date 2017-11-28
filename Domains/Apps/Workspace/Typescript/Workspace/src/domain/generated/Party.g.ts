// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { Localised } from './Localised.g';
import { Auditable } from './Auditable.g';
import { UniquelyIdentifiable } from './UniquelyIdentifiable.g';
import { Commentable } from './Commentable.g';
import { PostalAddress } from './PostalAddress.g';
import { TelecommunicationsNumber } from './TelecommunicationsNumber.g';
import { Qualification } from './Qualification.g';
import { ContactMechanism } from './ContactMechanism.g';
import { OrganisationContactRelationship } from './OrganisationContactRelationship.g';
import { Person } from './Person.g';
import { PartyContactMechanism } from './PartyContactMechanism.g';
import { BillingAccount } from './BillingAccount.g';
import { PartySkill } from './PartySkill.g';
import { PartyClassification } from './PartyClassification.g';
import { BankAccount } from './BankAccount.g';
import { EmailAddress } from './EmailAddress.g';
import { ShipmentMethod } from './ShipmentMethod.g';
import { Resume } from './Resume.g';
import { ElectronicAddress } from './ElectronicAddress.g';
import { Media } from './Media.g';
import { CreditCard } from './CreditCard.g';
import { PaymentMethod } from './PaymentMethod.g';
import { Currency } from './Currency.g';
import { VatRegime } from './VatRegime.g';
import { DunningType } from './DunningType.g';
import { Locale } from './Locale.g';
import { User } from './User.g';
import { CustomerRelationship } from './CustomerRelationship.g';
import { FaceToFaceCommunication } from './FaceToFaceCommunication.g';
import { FaceToFaceCommunicationVersion } from './FaceToFaceCommunicationVersion.g';
import { FaxCommunication } from './FaxCommunication.g';
import { FaxCommunicationVersion } from './FaxCommunicationVersion.g';
import { Good } from './Good.g';
import { InternalOrganisation } from './InternalOrganisation.g';
import { LetterCorrespondence } from './LetterCorrespondence.g';
import { LetterCorrespondenceVersion } from './LetterCorrespondenceVersion.g';
import { PhoneCommunicationVersion } from './PhoneCommunicationVersion.g';
import { PickListVersion } from './PickListVersion.g';
import { QuoteItemVersion } from './QuoteItemVersion.g';
import { RequirementVersion } from './RequirementVersion.g';
import { SalesInvoiceVersion } from './SalesInvoiceVersion.g';
import { SalesOrderItemVersion } from './SalesOrderItemVersion.g';
import { SalesOrderVersion } from './SalesOrderVersion.g';
import { OrganisationGlAccount } from './OrganisationGlAccount.g';
import { PhoneCommunication } from './PhoneCommunication.g';
import { PickList } from './PickList.g';
import { QuoteItem } from './QuoteItem.g';
import { Requirement } from './Requirement.g';
import { SalesInvoice } from './SalesInvoice.g';
import { SalesOrder } from './SalesOrder.g';
import { SalesOrderItem } from './SalesOrderItem.g';
import { SalesRepRelationship } from './SalesRepRelationship.g';
import { SubContractorRelationship } from './SubContractorRelationship.g';
import { WebSiteCommunicationVersion } from './WebSiteCommunicationVersion.g';
import { WebSiteCommunication } from './WebSiteCommunication.g';
import { CommunicationEventVersion } from './CommunicationEventVersion.g';
import { CommunicationEvent } from './CommunicationEvent.g';
import { PartyRelationship } from './PartyRelationship.g';
import { QuoteVersion } from './QuoteVersion.g';
import { RequestVersion } from './RequestVersion.g';
import { Quote } from './Quote.g';
import { Request } from './Request.g';
import { ShipmentVersion } from './ShipmentVersion.g';

export interface Party extends SessionObject , Localised, Auditable, UniquelyIdentifiable, Commentable {
        PartyName : string;


        GeneralCorrespondence : PostalAddress;


        YTDRevenue : number;


        LastYearsRevenue : number;


        BillingInquiriesFax : TelecommunicationsNumber;


        Qualifications : Qualification[];
        AddQualification(value: Qualification);
        RemoveQualification(value: Qualification);


        HomeAddress : ContactMechanism;


        InactiveOrganisationContactRelationships : OrganisationContactRelationship[];


        SalesOffice : ContactMechanism;


        InactiveContacts : Person[];


        InactivePartyContactMechanisms : PartyContactMechanism[];


        OrderInquiriesFax : TelecommunicationsNumber;


        CurrentSalesReps : Person[];


        PartyContactMechanisms : PartyContactMechanism[];
        AddPartyContactMechanism(value: PartyContactMechanism);
        RemovePartyContactMechanism(value: PartyContactMechanism);


        ShippingInquiriesFax : TelecommunicationsNumber;


        ShippingInquiriesPhone : TelecommunicationsNumber;


        BillingAccounts : BillingAccount[];
        AddBillingAccount(value: BillingAccount);
        RemoveBillingAccount(value: BillingAccount);


        OrderInquiriesPhone : TelecommunicationsNumber;


        PartySkills : PartySkill[];
        AddPartySkill(value: PartySkill);
        RemovePartySkill(value: PartySkill);


        PartyClassifications : PartyClassification[];


        ExcludeFromDunning : boolean;


        BankAccounts : BankAccount[];
        AddBankAccount(value: BankAccount);
        RemoveBankAccount(value: BankAccount);


        CurrentContacts : Person[];


        BillingAddress : ContactMechanism;


        GeneralEmail : EmailAddress;


        DefaultShipmentMethod : ShipmentMethod;


        Resumes : Resume[];
        AddResume(value: Resume);
        RemoveResume(value: Resume);


        HeadQuarter : ContactMechanism;


        PersonalEmailAddress : EmailAddress;


        CellPhoneNumber : TelecommunicationsNumber;


        BillingInquiriesPhone : TelecommunicationsNumber;


        OrderAddress : ContactMechanism;


        InternetAddress : ElectronicAddress;


        Contents : Media[];
        AddContent(value: Media);
        RemoveContent(value: Media);


        CreditCards : CreditCard[];
        AddCreditCard(value: CreditCard);
        RemoveCreditCard(value: CreditCard);


        ShippingAddress : PostalAddress;


        CurrentOrganisationContactRelationships : OrganisationContactRelationship[];


        OpenOrderAmount : number;


        GeneralFaxNumber : TelecommunicationsNumber;


        DefaultPaymentMethod : PaymentMethod;


        CurrentPartyContactMechanisms : PartyContactMechanism[];


        GeneralPhoneNumber : TelecommunicationsNumber;


        PreferredCurrency : Currency;


        VatRegime : VatRegime;


        AmountOverDue : number;


        DunningType : DunningType;


        AmountDue : number;


        LastReminderDate : Date;


        CreditLimit : number;


        SubAccountNumber : number;


        BlockedForDunning : Date;


}