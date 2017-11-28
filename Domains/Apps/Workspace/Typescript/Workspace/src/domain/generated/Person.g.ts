// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { User } from './User.g';
import { Localised } from './Localised.g';
import { Party } from './Party.g';
import { Auditable } from './Auditable.g';
import { UniquelyIdentifiable } from './UniquelyIdentifiable.g';
import { Commentable } from './Commentable.g';
import { Deletable } from './Deletable.g';
import { PersonVersion } from './PersonVersion.g';
import { PersonRole } from './PersonRole.g';
import { Salutation } from './Salutation.g';
import { PersonClassification } from './PersonClassification.g';
import { Citizenship } from './Citizenship.g';
import { PersonalTitle } from './PersonalTitle.g';
import { PersonTraining } from './PersonTraining.g';
import { GenderType } from './GenderType.g';
import { Hobby } from './Hobby.g';
import { Passport } from './Passport.g';
import { MaritalStatus } from './MaritalStatus.g';
import { Media } from './Media.g';
import { TaskList } from './TaskList.g';
import { NotificationList } from './NotificationList.g';
import { Locale } from './Locale.g';
import { PostalAddress } from './PostalAddress.g';
import { TelecommunicationsNumber } from './TelecommunicationsNumber.g';
import { Qualification } from './Qualification.g';
import { ContactMechanism } from './ContactMechanism.g';
import { OrganisationContactRelationship } from './OrganisationContactRelationship.g';
import { PartyContactMechanism } from './PartyContactMechanism.g';
import { BillingAccount } from './BillingAccount.g';
import { PartySkill } from './PartySkill.g';
import { PartyClassification } from './PartyClassification.g';
import { BankAccount } from './BankAccount.g';
import { EmailAddress } from './EmailAddress.g';
import { ShipmentMethod } from './ShipmentMethod.g';
import { Resume } from './Resume.g';
import { ElectronicAddress } from './ElectronicAddress.g';
import { CreditCard } from './CreditCard.g';
import { PaymentMethod } from './PaymentMethod.g';
import { Currency } from './Currency.g';
import { VatRegime } from './VatRegime.g';
import { DunningType } from './DunningType.g';
import { Employment } from './Employment.g';
import { InternalOrganisation } from './InternalOrganisation.g';
import { PickListVersion } from './PickListVersion.g';
import { SalesInvoiceItemVersion } from './SalesInvoiceItemVersion.g';
import { SalesInvoiceVersion } from './SalesInvoiceVersion.g';
import { SalesOrderItemVersion } from './SalesOrderItemVersion.g';
import { SalesOrderVersion } from './SalesOrderVersion.g';
import { PickList } from './PickList.g';
import { ProfessionalServicesRelationship } from './ProfessionalServicesRelationship.g';
import { SalesInvoice } from './SalesInvoice.g';
import { SalesInvoiceItem } from './SalesInvoiceItem.g';
import { SalesOrder } from './SalesOrder.g';
import { SalesOrderItem } from './SalesOrderItem.g';
import { SalesRepRelationship } from './SalesRepRelationship.g';
import { WorkEffortAssignment } from './WorkEffortAssignment.g';
import { Task } from './Task.g';
import { CommunicationEventVersion } from './CommunicationEventVersion.g';
import { CommunicationEvent } from './CommunicationEvent.g';
import { Invoice } from './Invoice.g';
import { PartyVersion } from './PartyVersion.g';
import { Order } from './Order.g';
import { Quote } from './Quote.g';
import { Request } from './Request.g';
import { WorkEffort } from './WorkEffort.g';
import { Singleton } from './Singleton.g';
import { TaskAssignment } from './TaskAssignment.g';
import { InvoiceVersion } from './InvoiceVersion.g';
import { OrderVersion } from './OrderVersion.g';
import { CustomerRelationship } from './CustomerRelationship.g';
import { FaceToFaceCommunication } from './FaceToFaceCommunication.g';
import { FaceToFaceCommunicationVersion } from './FaceToFaceCommunicationVersion.g';
import { FaxCommunication } from './FaxCommunication.g';
import { FaxCommunicationVersion } from './FaxCommunicationVersion.g';
import { Good } from './Good.g';
import { LetterCorrespondence } from './LetterCorrespondence.g';
import { LetterCorrespondenceVersion } from './LetterCorrespondenceVersion.g';
import { PhoneCommunicationVersion } from './PhoneCommunicationVersion.g';
import { QuoteItemVersion } from './QuoteItemVersion.g';
import { RequirementVersion } from './RequirementVersion.g';
import { OrganisationGlAccount } from './OrganisationGlAccount.g';
import { PhoneCommunication } from './PhoneCommunication.g';
import { QuoteItem } from './QuoteItem.g';
import { Requirement } from './Requirement.g';
import { SubContractorRelationship } from './SubContractorRelationship.g';
import { WebSiteCommunicationVersion } from './WebSiteCommunicationVersion.g';
import { WebSiteCommunication } from './WebSiteCommunication.g';
import { PartyRelationship } from './PartyRelationship.g';
import { QuoteVersion } from './QuoteVersion.g';
import { RequestVersion } from './RequestVersion.g';
import { ShipmentVersion } from './ShipmentVersion.g';

export class Person extends SessionObject implements User, Party, Deletable {
    get CanReadFirstName(): boolean {
        return this.canRead('FirstName');
    }

    get CanWriteFirstName(): boolean {
        return this.canWrite('FirstName');
    }

    get FirstName(): string {
        return this.get('FirstName');
    }

    set FirstName(value: string) {
        this.set('FirstName', value);
    }

    get CanReadLastName(): boolean {
        return this.canRead('LastName');
    }

    get CanWriteLastName(): boolean {
        return this.canWrite('LastName');
    }

    get LastName(): string {
        return this.get('LastName');
    }

    set LastName(value: string) {
        this.set('LastName', value);
    }

    get CanReadMiddleName(): boolean {
        return this.canRead('MiddleName');
    }

    get CanWriteMiddleName(): boolean {
        return this.canWrite('MiddleName');
    }

    get MiddleName(): string {
        return this.get('MiddleName');
    }

    set MiddleName(value: string) {
        this.set('MiddleName', value);
    }

    get CanReadCurrentVersion(): boolean {
        return this.canRead('CurrentVersion');
    }

    get CanWriteCurrentVersion(): boolean {
        return this.canWrite('CurrentVersion');
    }

    get CurrentVersion(): PersonVersion {
        return this.get('CurrentVersion');
    }

    set CurrentVersion(value: PersonVersion) {
        this.set('CurrentVersion', value);
    }

    get CanReadAllVersions(): boolean {
        return this.canRead('AllVersions');
    }

    get CanWriteAllVersions(): boolean {
        return this.canWrite('AllVersions');
    }

    get AllVersions(): PersonVersion[] {
        return this.get('AllVersions');
    }

    AddAllVersion(value: PersonVersion) {
        return this.add('AllVersions', value);
    }

    RemoveAllVersion(value: PersonVersion) {
        return this.remove('AllVersions', value);
    }

    set AllVersions(value: PersonVersion[]) {
        this.set('AllVersions', value);
    }

    get CanReadPersonRoles(): boolean {
        return this.canRead('PersonRoles');
    }

    get CanWritePersonRoles(): boolean {
        return this.canWrite('PersonRoles');
    }

    get PersonRoles(): PersonRole[] {
        return this.get('PersonRoles');
    }

    AddPersonRole(value: PersonRole) {
        return this.add('PersonRoles', value);
    }

    RemovePersonRole(value: PersonRole) {
        return this.remove('PersonRoles', value);
    }

    set PersonRoles(value: PersonRole[]) {
        this.set('PersonRoles', value);
    }

    get CanReadSalutation(): boolean {
        return this.canRead('Salutation');
    }

    get CanWriteSalutation(): boolean {
        return this.canWrite('Salutation');
    }

    get Salutation(): Salutation {
        return this.get('Salutation');
    }

    set Salutation(value: Salutation) {
        this.set('Salutation', value);
    }

    get CanReadYTDCommission(): boolean {
        return this.canRead('YTDCommission');
    }

    get YTDCommission(): number {
        return this.get('YTDCommission');
    }


    get CanReadPersonClassifications(): boolean {
        return this.canRead('PersonClassifications');
    }

    get PersonClassifications(): PersonClassification[] {
        return this.get('PersonClassifications');
    }


    get CanReadCitizenship(): boolean {
        return this.canRead('Citizenship');
    }

    get CanWriteCitizenship(): boolean {
        return this.canWrite('Citizenship');
    }

    get Citizenship(): Citizenship {
        return this.get('Citizenship');
    }

    set Citizenship(value: Citizenship) {
        this.set('Citizenship', value);
    }

    get CanReadLastYearsCommission(): boolean {
        return this.canRead('LastYearsCommission');
    }

    get LastYearsCommission(): number {
        return this.get('LastYearsCommission');
    }


    get CanReadGivenName(): boolean {
        return this.canRead('GivenName');
    }

    get CanWriteGivenName(): boolean {
        return this.canWrite('GivenName');
    }

    get GivenName(): string {
        return this.get('GivenName');
    }

    set GivenName(value: string) {
        this.set('GivenName', value);
    }

    get CanReadTitles(): boolean {
        return this.canRead('Titles');
    }

    get CanWriteTitles(): boolean {
        return this.canWrite('Titles');
    }

    get Titles(): PersonalTitle[] {
        return this.get('Titles');
    }

    AddTitle(value: PersonalTitle) {
        return this.add('Titles', value);
    }

    RemoveTitle(value: PersonalTitle) {
        return this.remove('Titles', value);
    }

    set Titles(value: PersonalTitle[]) {
        this.set('Titles', value);
    }

    get CanReadMothersMaidenName(): boolean {
        return this.canRead('MothersMaidenName');
    }

    get CanWriteMothersMaidenName(): boolean {
        return this.canWrite('MothersMaidenName');
    }

    get MothersMaidenName(): string {
        return this.get('MothersMaidenName');
    }

    set MothersMaidenName(value: string) {
        this.set('MothersMaidenName', value);
    }

    get CanReadBirthDate(): boolean {
        return this.canRead('BirthDate');
    }

    get CanWriteBirthDate(): boolean {
        return this.canWrite('BirthDate');
    }

    get BirthDate(): Date {
        return this.get('BirthDate');
    }

    set BirthDate(value: Date) {
        this.set('BirthDate', value);
    }

    get CanReadHeight(): boolean {
        return this.canRead('Height');
    }

    get CanWriteHeight(): boolean {
        return this.canWrite('Height');
    }

    get Height(): number {
        return this.get('Height');
    }

    set Height(value: number) {
        this.set('Height', value);
    }

    get CanReadPersonTrainings(): boolean {
        return this.canRead('PersonTrainings');
    }

    get CanWritePersonTrainings(): boolean {
        return this.canWrite('PersonTrainings');
    }

    get PersonTrainings(): PersonTraining[] {
        return this.get('PersonTrainings');
    }

    AddPersonTraining(value: PersonTraining) {
        return this.add('PersonTrainings', value);
    }

    RemovePersonTraining(value: PersonTraining) {
        return this.remove('PersonTrainings', value);
    }

    set PersonTrainings(value: PersonTraining[]) {
        this.set('PersonTrainings', value);
    }

    get CanReadGender(): boolean {
        return this.canRead('Gender');
    }

    get CanWriteGender(): boolean {
        return this.canWrite('Gender');
    }

    get Gender(): GenderType {
        return this.get('Gender');
    }

    set Gender(value: GenderType) {
        this.set('Gender', value);
    }

    get CanReadWeight(): boolean {
        return this.canRead('Weight');
    }

    get CanWriteWeight(): boolean {
        return this.canWrite('Weight');
    }

    get Weight(): number {
        return this.get('Weight');
    }

    set Weight(value: number) {
        this.set('Weight', value);
    }

    get CanReadHobbies(): boolean {
        return this.canRead('Hobbies');
    }

    get CanWriteHobbies(): boolean {
        return this.canWrite('Hobbies');
    }

    get Hobbies(): Hobby[] {
        return this.get('Hobbies');
    }

    AddHobby(value: Hobby) {
        return this.add('Hobbies', value);
    }

    RemoveHobby(value: Hobby) {
        return this.remove('Hobbies', value);
    }

    set Hobbies(value: Hobby[]) {
        this.set('Hobbies', value);
    }

    get CanReadTotalYearsWorkExperience(): boolean {
        return this.canRead('TotalYearsWorkExperience');
    }

    get CanWriteTotalYearsWorkExperience(): boolean {
        return this.canWrite('TotalYearsWorkExperience');
    }

    get TotalYearsWorkExperience(): number {
        return this.get('TotalYearsWorkExperience');
    }

    set TotalYearsWorkExperience(value: number) {
        this.set('TotalYearsWorkExperience', value);
    }

    get CanReadPassports(): boolean {
        return this.canRead('Passports');
    }

    get CanWritePassports(): boolean {
        return this.canWrite('Passports');
    }

    get Passports(): Passport[] {
        return this.get('Passports');
    }

    AddPassport(value: Passport) {
        return this.add('Passports', value);
    }

    RemovePassport(value: Passport) {
        return this.remove('Passports', value);
    }

    set Passports(value: Passport[]) {
        this.set('Passports', value);
    }

    get CanReadMaritalStatus(): boolean {
        return this.canRead('MaritalStatus');
    }

    get CanWriteMaritalStatus(): boolean {
        return this.canWrite('MaritalStatus');
    }

    get MaritalStatus(): MaritalStatus {
        return this.get('MaritalStatus');
    }

    set MaritalStatus(value: MaritalStatus) {
        this.set('MaritalStatus', value);
    }

    get CanReadPicture(): boolean {
        return this.canRead('Picture');
    }

    get CanWritePicture(): boolean {
        return this.canWrite('Picture');
    }

    get Picture(): Media {
        return this.get('Picture');
    }

    set Picture(value: Media) {
        this.set('Picture', value);
    }

    get CanReadSocialSecurityNumber(): boolean {
        return this.canRead('SocialSecurityNumber');
    }

    get CanWriteSocialSecurityNumber(): boolean {
        return this.canWrite('SocialSecurityNumber');
    }

    get SocialSecurityNumber(): string {
        return this.get('SocialSecurityNumber');
    }

    set SocialSecurityNumber(value: string) {
        this.set('SocialSecurityNumber', value);
    }

    get CanReadDeceasedDate(): boolean {
        return this.canRead('DeceasedDate');
    }

    get CanWriteDeceasedDate(): boolean {
        return this.canWrite('DeceasedDate');
    }

    get DeceasedDate(): Date {
        return this.get('DeceasedDate');
    }

    set DeceasedDate(value: Date) {
        this.set('DeceasedDate', value);
    }

    get CanReadFunction(): boolean {
        return this.canRead('Function');
    }

    get CanWriteFunction(): boolean {
        return this.canWrite('Function');
    }

    get Function(): string {
        return this.get('Function');
    }

    set Function(value: string) {
        this.set('Function', value);
    }

    get CanReadUserName(): boolean {
        return this.canRead('UserName');
    }

    get CanWriteUserName(): boolean {
        return this.canWrite('UserName');
    }

    get UserName(): string {
        return this.get('UserName');
    }

    set UserName(value: string) {
        this.set('UserName', value);
    }

    get CanReadNormalizedUserName(): boolean {
        return this.canRead('NormalizedUserName');
    }

    get CanWriteNormalizedUserName(): boolean {
        return this.canWrite('NormalizedUserName');
    }

    get NormalizedUserName(): string {
        return this.get('NormalizedUserName');
    }

    set NormalizedUserName(value: string) {
        this.set('NormalizedUserName', value);
    }

    get CanReadUserEmail(): boolean {
        return this.canRead('UserEmail');
    }

    get CanWriteUserEmail(): boolean {
        return this.canWrite('UserEmail');
    }

    get UserEmail(): string {
        return this.get('UserEmail');
    }

    set UserEmail(value: string) {
        this.set('UserEmail', value);
    }

    get CanReadUserEmailConfirmed(): boolean {
        return this.canRead('UserEmailConfirmed');
    }

    get CanWriteUserEmailConfirmed(): boolean {
        return this.canWrite('UserEmailConfirmed');
    }

    get UserEmailConfirmed(): boolean {
        return this.get('UserEmailConfirmed');
    }

    set UserEmailConfirmed(value: boolean) {
        this.set('UserEmailConfirmed', value);
    }

    get CanReadTaskList(): boolean {
        return this.canRead('TaskList');
    }

    get TaskList(): TaskList {
        return this.get('TaskList');
    }


    get CanReadNotificationList(): boolean {
        return this.canRead('NotificationList');
    }

    get CanWriteNotificationList(): boolean {
        return this.canWrite('NotificationList');
    }

    get NotificationList(): NotificationList {
        return this.get('NotificationList');
    }

    set NotificationList(value: NotificationList) {
        this.set('NotificationList', value);
    }

    get CanReadLocale(): boolean {
        return this.canRead('Locale');
    }

    get CanWriteLocale(): boolean {
        return this.canWrite('Locale');
    }

    get Locale(): Locale {
        return this.get('Locale');
    }

    set Locale(value: Locale) {
        this.set('Locale', value);
    }

    get CanReadPartyName(): boolean {
        return this.canRead('PartyName');
    }

    get CanWritePartyName(): boolean {
        return this.canWrite('PartyName');
    }

    get PartyName(): string {
        return this.get('PartyName');
    }

    set PartyName(value: string) {
        this.set('PartyName', value);
    }

    get CanReadGeneralCorrespondence(): boolean {
        return this.canRead('GeneralCorrespondence');
    }

    get GeneralCorrespondence(): PostalAddress {
        return this.get('GeneralCorrespondence');
    }


    get CanReadYTDRevenue(): boolean {
        return this.canRead('YTDRevenue');
    }

    get YTDRevenue(): number {
        return this.get('YTDRevenue');
    }


    get CanReadLastYearsRevenue(): boolean {
        return this.canRead('LastYearsRevenue');
    }

    get LastYearsRevenue(): number {
        return this.get('LastYearsRevenue');
    }


    get CanReadBillingInquiriesFax(): boolean {
        return this.canRead('BillingInquiriesFax');
    }

    get BillingInquiriesFax(): TelecommunicationsNumber {
        return this.get('BillingInquiriesFax');
    }


    get CanReadQualifications(): boolean {
        return this.canRead('Qualifications');
    }

    get CanWriteQualifications(): boolean {
        return this.canWrite('Qualifications');
    }

    get Qualifications(): Qualification[] {
        return this.get('Qualifications');
    }

    AddQualification(value: Qualification) {
        return this.add('Qualifications', value);
    }

    RemoveQualification(value: Qualification) {
        return this.remove('Qualifications', value);
    }

    set Qualifications(value: Qualification[]) {
        this.set('Qualifications', value);
    }

    get CanReadHomeAddress(): boolean {
        return this.canRead('HomeAddress');
    }

    get HomeAddress(): ContactMechanism {
        return this.get('HomeAddress');
    }


    get CanReadInactiveOrganisationContactRelationships(): boolean {
        return this.canRead('InactiveOrganisationContactRelationships');
    }

    get InactiveOrganisationContactRelationships(): OrganisationContactRelationship[] {
        return this.get('InactiveOrganisationContactRelationships');
    }


    get CanReadSalesOffice(): boolean {
        return this.canRead('SalesOffice');
    }

    get SalesOffice(): ContactMechanism {
        return this.get('SalesOffice');
    }


    get CanReadInactiveContacts(): boolean {
        return this.canRead('InactiveContacts');
    }

    get InactiveContacts(): Person[] {
        return this.get('InactiveContacts');
    }


    get CanReadInactivePartyContactMechanisms(): boolean {
        return this.canRead('InactivePartyContactMechanisms');
    }

    get InactivePartyContactMechanisms(): PartyContactMechanism[] {
        return this.get('InactivePartyContactMechanisms');
    }


    get CanReadOrderInquiriesFax(): boolean {
        return this.canRead('OrderInquiriesFax');
    }

    get OrderInquiriesFax(): TelecommunicationsNumber {
        return this.get('OrderInquiriesFax');
    }


    get CanReadCurrentSalesReps(): boolean {
        return this.canRead('CurrentSalesReps');
    }

    get CurrentSalesReps(): Person[] {
        return this.get('CurrentSalesReps');
    }


    get CanReadPartyContactMechanisms(): boolean {
        return this.canRead('PartyContactMechanisms');
    }

    get CanWritePartyContactMechanisms(): boolean {
        return this.canWrite('PartyContactMechanisms');
    }

    get PartyContactMechanisms(): PartyContactMechanism[] {
        return this.get('PartyContactMechanisms');
    }

    AddPartyContactMechanism(value: PartyContactMechanism) {
        return this.add('PartyContactMechanisms', value);
    }

    RemovePartyContactMechanism(value: PartyContactMechanism) {
        return this.remove('PartyContactMechanisms', value);
    }

    set PartyContactMechanisms(value: PartyContactMechanism[]) {
        this.set('PartyContactMechanisms', value);
    }

    get CanReadShippingInquiriesFax(): boolean {
        return this.canRead('ShippingInquiriesFax');
    }

    get ShippingInquiriesFax(): TelecommunicationsNumber {
        return this.get('ShippingInquiriesFax');
    }


    get CanReadShippingInquiriesPhone(): boolean {
        return this.canRead('ShippingInquiriesPhone');
    }

    get ShippingInquiriesPhone(): TelecommunicationsNumber {
        return this.get('ShippingInquiriesPhone');
    }


    get CanReadBillingAccounts(): boolean {
        return this.canRead('BillingAccounts');
    }

    get CanWriteBillingAccounts(): boolean {
        return this.canWrite('BillingAccounts');
    }

    get BillingAccounts(): BillingAccount[] {
        return this.get('BillingAccounts');
    }

    AddBillingAccount(value: BillingAccount) {
        return this.add('BillingAccounts', value);
    }

    RemoveBillingAccount(value: BillingAccount) {
        return this.remove('BillingAccounts', value);
    }

    set BillingAccounts(value: BillingAccount[]) {
        this.set('BillingAccounts', value);
    }

    get CanReadOrderInquiriesPhone(): boolean {
        return this.canRead('OrderInquiriesPhone');
    }

    get OrderInquiriesPhone(): TelecommunicationsNumber {
        return this.get('OrderInquiriesPhone');
    }


    get CanReadPartySkills(): boolean {
        return this.canRead('PartySkills');
    }

    get CanWritePartySkills(): boolean {
        return this.canWrite('PartySkills');
    }

    get PartySkills(): PartySkill[] {
        return this.get('PartySkills');
    }

    AddPartySkill(value: PartySkill) {
        return this.add('PartySkills', value);
    }

    RemovePartySkill(value: PartySkill) {
        return this.remove('PartySkills', value);
    }

    set PartySkills(value: PartySkill[]) {
        this.set('PartySkills', value);
    }

    get CanReadPartyClassifications(): boolean {
        return this.canRead('PartyClassifications');
    }

    get PartyClassifications(): PartyClassification[] {
        return this.get('PartyClassifications');
    }


    get CanReadExcludeFromDunning(): boolean {
        return this.canRead('ExcludeFromDunning');
    }

    get CanWriteExcludeFromDunning(): boolean {
        return this.canWrite('ExcludeFromDunning');
    }

    get ExcludeFromDunning(): boolean {
        return this.get('ExcludeFromDunning');
    }

    set ExcludeFromDunning(value: boolean) {
        this.set('ExcludeFromDunning', value);
    }

    get CanReadBankAccounts(): boolean {
        return this.canRead('BankAccounts');
    }

    get CanWriteBankAccounts(): boolean {
        return this.canWrite('BankAccounts');
    }

    get BankAccounts(): BankAccount[] {
        return this.get('BankAccounts');
    }

    AddBankAccount(value: BankAccount) {
        return this.add('BankAccounts', value);
    }

    RemoveBankAccount(value: BankAccount) {
        return this.remove('BankAccounts', value);
    }

    set BankAccounts(value: BankAccount[]) {
        this.set('BankAccounts', value);
    }

    get CanReadCurrentContacts(): boolean {
        return this.canRead('CurrentContacts');
    }

    get CurrentContacts(): Person[] {
        return this.get('CurrentContacts');
    }


    get CanReadBillingAddress(): boolean {
        return this.canRead('BillingAddress');
    }

    get BillingAddress(): ContactMechanism {
        return this.get('BillingAddress');
    }


    get CanReadGeneralEmail(): boolean {
        return this.canRead('GeneralEmail');
    }

    get GeneralEmail(): EmailAddress {
        return this.get('GeneralEmail');
    }


    get CanReadDefaultShipmentMethod(): boolean {
        return this.canRead('DefaultShipmentMethod');
    }

    get CanWriteDefaultShipmentMethod(): boolean {
        return this.canWrite('DefaultShipmentMethod');
    }

    get DefaultShipmentMethod(): ShipmentMethod {
        return this.get('DefaultShipmentMethod');
    }

    set DefaultShipmentMethod(value: ShipmentMethod) {
        this.set('DefaultShipmentMethod', value);
    }

    get CanReadResumes(): boolean {
        return this.canRead('Resumes');
    }

    get CanWriteResumes(): boolean {
        return this.canWrite('Resumes');
    }

    get Resumes(): Resume[] {
        return this.get('Resumes');
    }

    AddResume(value: Resume) {
        return this.add('Resumes', value);
    }

    RemoveResume(value: Resume) {
        return this.remove('Resumes', value);
    }

    set Resumes(value: Resume[]) {
        this.set('Resumes', value);
    }

    get CanReadHeadQuarter(): boolean {
        return this.canRead('HeadQuarter');
    }

    get HeadQuarter(): ContactMechanism {
        return this.get('HeadQuarter');
    }


    get CanReadPersonalEmailAddress(): boolean {
        return this.canRead('PersonalEmailAddress');
    }

    get PersonalEmailAddress(): EmailAddress {
        return this.get('PersonalEmailAddress');
    }


    get CanReadCellPhoneNumber(): boolean {
        return this.canRead('CellPhoneNumber');
    }

    get CellPhoneNumber(): TelecommunicationsNumber {
        return this.get('CellPhoneNumber');
    }


    get CanReadBillingInquiriesPhone(): boolean {
        return this.canRead('BillingInquiriesPhone');
    }

    get BillingInquiriesPhone(): TelecommunicationsNumber {
        return this.get('BillingInquiriesPhone');
    }


    get CanReadOrderAddress(): boolean {
        return this.canRead('OrderAddress');
    }

    get OrderAddress(): ContactMechanism {
        return this.get('OrderAddress');
    }


    get CanReadInternetAddress(): boolean {
        return this.canRead('InternetAddress');
    }

    get InternetAddress(): ElectronicAddress {
        return this.get('InternetAddress');
    }


    get CanReadContents(): boolean {
        return this.canRead('Contents');
    }

    get CanWriteContents(): boolean {
        return this.canWrite('Contents');
    }

    get Contents(): Media[] {
        return this.get('Contents');
    }

    AddContent(value: Media) {
        return this.add('Contents', value);
    }

    RemoveContent(value: Media) {
        return this.remove('Contents', value);
    }

    set Contents(value: Media[]) {
        this.set('Contents', value);
    }

    get CanReadCreditCards(): boolean {
        return this.canRead('CreditCards');
    }

    get CanWriteCreditCards(): boolean {
        return this.canWrite('CreditCards');
    }

    get CreditCards(): CreditCard[] {
        return this.get('CreditCards');
    }

    AddCreditCard(value: CreditCard) {
        return this.add('CreditCards', value);
    }

    RemoveCreditCard(value: CreditCard) {
        return this.remove('CreditCards', value);
    }

    set CreditCards(value: CreditCard[]) {
        this.set('CreditCards', value);
    }

    get CanReadShippingAddress(): boolean {
        return this.canRead('ShippingAddress');
    }

    get ShippingAddress(): PostalAddress {
        return this.get('ShippingAddress');
    }


    get CanReadCurrentOrganisationContactRelationships(): boolean {
        return this.canRead('CurrentOrganisationContactRelationships');
    }

    get CurrentOrganisationContactRelationships(): OrganisationContactRelationship[] {
        return this.get('CurrentOrganisationContactRelationships');
    }


    get CanReadOpenOrderAmount(): boolean {
        return this.canRead('OpenOrderAmount');
    }

    get OpenOrderAmount(): number {
        return this.get('OpenOrderAmount');
    }


    get CanReadGeneralFaxNumber(): boolean {
        return this.canRead('GeneralFaxNumber');
    }

    get GeneralFaxNumber(): TelecommunicationsNumber {
        return this.get('GeneralFaxNumber');
    }


    get CanReadDefaultPaymentMethod(): boolean {
        return this.canRead('DefaultPaymentMethod');
    }

    get CanWriteDefaultPaymentMethod(): boolean {
        return this.canWrite('DefaultPaymentMethod');
    }

    get DefaultPaymentMethod(): PaymentMethod {
        return this.get('DefaultPaymentMethod');
    }

    set DefaultPaymentMethod(value: PaymentMethod) {
        this.set('DefaultPaymentMethod', value);
    }

    get CanReadCurrentPartyContactMechanisms(): boolean {
        return this.canRead('CurrentPartyContactMechanisms');
    }

    get CurrentPartyContactMechanisms(): PartyContactMechanism[] {
        return this.get('CurrentPartyContactMechanisms');
    }


    get CanReadGeneralPhoneNumber(): boolean {
        return this.canRead('GeneralPhoneNumber');
    }

    get GeneralPhoneNumber(): TelecommunicationsNumber {
        return this.get('GeneralPhoneNumber');
    }


    get CanReadPreferredCurrency(): boolean {
        return this.canRead('PreferredCurrency');
    }

    get CanWritePreferredCurrency(): boolean {
        return this.canWrite('PreferredCurrency');
    }

    get PreferredCurrency(): Currency {
        return this.get('PreferredCurrency');
    }

    set PreferredCurrency(value: Currency) {
        this.set('PreferredCurrency', value);
    }

    get CanReadVatRegime(): boolean {
        return this.canRead('VatRegime');
    }

    get CanWriteVatRegime(): boolean {
        return this.canWrite('VatRegime');
    }

    get VatRegime(): VatRegime {
        return this.get('VatRegime');
    }

    set VatRegime(value: VatRegime) {
        this.set('VatRegime', value);
    }

    get CanReadAmountOverDue(): boolean {
        return this.canRead('AmountOverDue');
    }

    get CanWriteAmountOverDue(): boolean {
        return this.canWrite('AmountOverDue');
    }

    get AmountOverDue(): number {
        return this.get('AmountOverDue');
    }

    set AmountOverDue(value: number) {
        this.set('AmountOverDue', value);
    }

    get CanReadDunningType(): boolean {
        return this.canRead('DunningType');
    }

    get CanWriteDunningType(): boolean {
        return this.canWrite('DunningType');
    }

    get DunningType(): DunningType {
        return this.get('DunningType');
    }

    set DunningType(value: DunningType) {
        this.set('DunningType', value);
    }

    get CanReadAmountDue(): boolean {
        return this.canRead('AmountDue');
    }

    get AmountDue(): number {
        return this.get('AmountDue');
    }


    get CanReadLastReminderDate(): boolean {
        return this.canRead('LastReminderDate');
    }

    get CanWriteLastReminderDate(): boolean {
        return this.canWrite('LastReminderDate');
    }

    get LastReminderDate(): Date {
        return this.get('LastReminderDate');
    }

    set LastReminderDate(value: Date) {
        this.set('LastReminderDate', value);
    }

    get CanReadCreditLimit(): boolean {
        return this.canRead('CreditLimit');
    }

    get CanWriteCreditLimit(): boolean {
        return this.canWrite('CreditLimit');
    }

    get CreditLimit(): number {
        return this.get('CreditLimit');
    }

    set CreditLimit(value: number) {
        this.set('CreditLimit', value);
    }

    get CanReadSubAccountNumber(): boolean {
        return this.canRead('SubAccountNumber');
    }

    get CanWriteSubAccountNumber(): boolean {
        return this.canWrite('SubAccountNumber');
    }

    get SubAccountNumber(): number {
        return this.get('SubAccountNumber');
    }

    set SubAccountNumber(value: number) {
        this.set('SubAccountNumber', value);
    }

    get CanReadBlockedForDunning(): boolean {
        return this.canRead('BlockedForDunning');
    }

    get CanWriteBlockedForDunning(): boolean {
        return this.canWrite('BlockedForDunning');
    }

    get BlockedForDunning(): Date {
        return this.get('BlockedForDunning');
    }

    set BlockedForDunning(value: Date) {
        this.set('BlockedForDunning', value);
    }

    get CanReadCreatedBy(): boolean {
        return this.canRead('CreatedBy');
    }

    get CanWriteCreatedBy(): boolean {
        return this.canWrite('CreatedBy');
    }

    get CreatedBy(): User {
        return this.get('CreatedBy');
    }

    set CreatedBy(value: User) {
        this.set('CreatedBy', value);
    }

    get CanReadLastModifiedBy(): boolean {
        return this.canRead('LastModifiedBy');
    }

    get CanWriteLastModifiedBy(): boolean {
        return this.canWrite('LastModifiedBy');
    }

    get LastModifiedBy(): User {
        return this.get('LastModifiedBy');
    }

    set LastModifiedBy(value: User) {
        this.set('LastModifiedBy', value);
    }

    get CanReadCreationDate(): boolean {
        return this.canRead('CreationDate');
    }

    get CanWriteCreationDate(): boolean {
        return this.canWrite('CreationDate');
    }

    get CreationDate(): Date {
        return this.get('CreationDate');
    }

    set CreationDate(value: Date) {
        this.set('CreationDate', value);
    }

    get CanReadLastModifiedDate(): boolean {
        return this.canRead('LastModifiedDate');
    }

    get CanWriteLastModifiedDate(): boolean {
        return this.canWrite('LastModifiedDate');
    }

    get LastModifiedDate(): Date {
        return this.get('LastModifiedDate');
    }

    set LastModifiedDate(value: Date) {
        this.set('LastModifiedDate', value);
    }

    get CanReadUniqueId(): boolean {
        return this.canRead('UniqueId');
    }

    get CanWriteUniqueId(): boolean {
        return this.canWrite('UniqueId');
    }

    get UniqueId(): string {
        return this.get('UniqueId');
    }

    set UniqueId(value: string) {
        this.set('UniqueId', value);
    }

    get CanReadComment(): boolean {
        return this.canRead('Comment');
    }

    get CanWriteComment(): boolean {
        return this.canWrite('Comment');
    }

    get Comment(): string {
        return this.get('Comment');
    }

    set Comment(value: string) {
        this.set('Comment', value);
    }


    get CanExecuteDelete(): boolean {
        return this.canExecute('Delete');
    }

    get Delete(): Method {
        return new Method(this, 'Delete');
    }
}
