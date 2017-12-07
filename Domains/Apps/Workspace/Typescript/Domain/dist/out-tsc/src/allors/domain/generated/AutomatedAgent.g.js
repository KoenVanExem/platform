"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
const framework_1 = require("../../framework");
class AutomatedAgent extends framework_1.SessionObject {
    get CanReadCurrentVersion() {
        return this.canRead('CurrentVersion');
    }
    get CanWriteCurrentVersion() {
        return this.canWrite('CurrentVersion');
    }
    get CurrentVersion() {
        return this.get('CurrentVersion');
    }
    set CurrentVersion(value) {
        this.set('CurrentVersion', value);
    }
    get CanReadAllVersions() {
        return this.canRead('AllVersions');
    }
    get CanWriteAllVersions() {
        return this.canWrite('AllVersions');
    }
    get AllVersions() {
        return this.get('AllVersions');
    }
    AddAllVersion(value) {
        return this.add('AllVersions', value);
    }
    RemoveAllVersion(value) {
        return this.remove('AllVersions', value);
    }
    set AllVersions(value) {
        this.set('AllVersions', value);
    }
    get CanReadUserName() {
        return this.canRead('UserName');
    }
    get CanWriteUserName() {
        return this.canWrite('UserName');
    }
    get UserName() {
        return this.get('UserName');
    }
    set UserName(value) {
        this.set('UserName', value);
    }
    get CanReadNormalizedUserName() {
        return this.canRead('NormalizedUserName');
    }
    get CanWriteNormalizedUserName() {
        return this.canWrite('NormalizedUserName');
    }
    get NormalizedUserName() {
        return this.get('NormalizedUserName');
    }
    set NormalizedUserName(value) {
        this.set('NormalizedUserName', value);
    }
    get CanReadUserEmail() {
        return this.canRead('UserEmail');
    }
    get CanWriteUserEmail() {
        return this.canWrite('UserEmail');
    }
    get UserEmail() {
        return this.get('UserEmail');
    }
    set UserEmail(value) {
        this.set('UserEmail', value);
    }
    get CanReadUserEmailConfirmed() {
        return this.canRead('UserEmailConfirmed');
    }
    get CanWriteUserEmailConfirmed() {
        return this.canWrite('UserEmailConfirmed');
    }
    get UserEmailConfirmed() {
        return this.get('UserEmailConfirmed');
    }
    set UserEmailConfirmed(value) {
        this.set('UserEmailConfirmed', value);
    }
    get CanReadTaskList() {
        return this.canRead('TaskList');
    }
    get TaskList() {
        return this.get('TaskList');
    }
    get CanReadNotificationList() {
        return this.canRead('NotificationList');
    }
    get CanWriteNotificationList() {
        return this.canWrite('NotificationList');
    }
    get NotificationList() {
        return this.get('NotificationList');
    }
    set NotificationList(value) {
        this.set('NotificationList', value);
    }
    get CanReadLocale() {
        return this.canRead('Locale');
    }
    get CanWriteLocale() {
        return this.canWrite('Locale');
    }
    get Locale() {
        return this.get('Locale');
    }
    set Locale(value) {
        this.set('Locale', value);
    }
    get CanReadPartyName() {
        return this.canRead('PartyName');
    }
    get CanWritePartyName() {
        return this.canWrite('PartyName');
    }
    get PartyName() {
        return this.get('PartyName');
    }
    set PartyName(value) {
        this.set('PartyName', value);
    }
    get CanReadGeneralCorrespondence() {
        return this.canRead('GeneralCorrespondence');
    }
    get GeneralCorrespondence() {
        return this.get('GeneralCorrespondence');
    }
    get CanReadYTDRevenue() {
        return this.canRead('YTDRevenue');
    }
    get YTDRevenue() {
        return this.get('YTDRevenue');
    }
    get CanReadLastYearsRevenue() {
        return this.canRead('LastYearsRevenue');
    }
    get LastYearsRevenue() {
        return this.get('LastYearsRevenue');
    }
    get CanReadBillingInquiriesFax() {
        return this.canRead('BillingInquiriesFax');
    }
    get BillingInquiriesFax() {
        return this.get('BillingInquiriesFax');
    }
    get CanReadQualifications() {
        return this.canRead('Qualifications');
    }
    get CanWriteQualifications() {
        return this.canWrite('Qualifications');
    }
    get Qualifications() {
        return this.get('Qualifications');
    }
    AddQualification(value) {
        return this.add('Qualifications', value);
    }
    RemoveQualification(value) {
        return this.remove('Qualifications', value);
    }
    set Qualifications(value) {
        this.set('Qualifications', value);
    }
    get CanReadHomeAddress() {
        return this.canRead('HomeAddress');
    }
    get HomeAddress() {
        return this.get('HomeAddress');
    }
    get CanReadInactiveOrganisationContactRelationships() {
        return this.canRead('InactiveOrganisationContactRelationships');
    }
    get InactiveOrganisationContactRelationships() {
        return this.get('InactiveOrganisationContactRelationships');
    }
    get CanReadSalesOffice() {
        return this.canRead('SalesOffice');
    }
    get SalesOffice() {
        return this.get('SalesOffice');
    }
    get CanReadInactiveContacts() {
        return this.canRead('InactiveContacts');
    }
    get InactiveContacts() {
        return this.get('InactiveContacts');
    }
    get CanReadInactivePartyContactMechanisms() {
        return this.canRead('InactivePartyContactMechanisms');
    }
    get InactivePartyContactMechanisms() {
        return this.get('InactivePartyContactMechanisms');
    }
    get CanReadOrderInquiriesFax() {
        return this.canRead('OrderInquiriesFax');
    }
    get OrderInquiriesFax() {
        return this.get('OrderInquiriesFax');
    }
    get CanReadCurrentSalesReps() {
        return this.canRead('CurrentSalesReps');
    }
    get CurrentSalesReps() {
        return this.get('CurrentSalesReps');
    }
    get CanReadPartyContactMechanisms() {
        return this.canRead('PartyContactMechanisms');
    }
    get CanWritePartyContactMechanisms() {
        return this.canWrite('PartyContactMechanisms');
    }
    get PartyContactMechanisms() {
        return this.get('PartyContactMechanisms');
    }
    AddPartyContactMechanism(value) {
        return this.add('PartyContactMechanisms', value);
    }
    RemovePartyContactMechanism(value) {
        return this.remove('PartyContactMechanisms', value);
    }
    set PartyContactMechanisms(value) {
        this.set('PartyContactMechanisms', value);
    }
    get CanReadShippingInquiriesFax() {
        return this.canRead('ShippingInquiriesFax');
    }
    get ShippingInquiriesFax() {
        return this.get('ShippingInquiriesFax');
    }
    get CanReadShippingInquiriesPhone() {
        return this.canRead('ShippingInquiriesPhone');
    }
    get ShippingInquiriesPhone() {
        return this.get('ShippingInquiriesPhone');
    }
    get CanReadBillingAccounts() {
        return this.canRead('BillingAccounts');
    }
    get CanWriteBillingAccounts() {
        return this.canWrite('BillingAccounts');
    }
    get BillingAccounts() {
        return this.get('BillingAccounts');
    }
    AddBillingAccount(value) {
        return this.add('BillingAccounts', value);
    }
    RemoveBillingAccount(value) {
        return this.remove('BillingAccounts', value);
    }
    set BillingAccounts(value) {
        this.set('BillingAccounts', value);
    }
    get CanReadOrderInquiriesPhone() {
        return this.canRead('OrderInquiriesPhone');
    }
    get OrderInquiriesPhone() {
        return this.get('OrderInquiriesPhone');
    }
    get CanReadPartySkills() {
        return this.canRead('PartySkills');
    }
    get CanWritePartySkills() {
        return this.canWrite('PartySkills');
    }
    get PartySkills() {
        return this.get('PartySkills');
    }
    AddPartySkill(value) {
        return this.add('PartySkills', value);
    }
    RemovePartySkill(value) {
        return this.remove('PartySkills', value);
    }
    set PartySkills(value) {
        this.set('PartySkills', value);
    }
    get CanReadPartyClassifications() {
        return this.canRead('PartyClassifications');
    }
    get PartyClassifications() {
        return this.get('PartyClassifications');
    }
    get CanReadExcludeFromDunning() {
        return this.canRead('ExcludeFromDunning');
    }
    get CanWriteExcludeFromDunning() {
        return this.canWrite('ExcludeFromDunning');
    }
    get ExcludeFromDunning() {
        return this.get('ExcludeFromDunning');
    }
    set ExcludeFromDunning(value) {
        this.set('ExcludeFromDunning', value);
    }
    get CanReadBankAccounts() {
        return this.canRead('BankAccounts');
    }
    get CanWriteBankAccounts() {
        return this.canWrite('BankAccounts');
    }
    get BankAccounts() {
        return this.get('BankAccounts');
    }
    AddBankAccount(value) {
        return this.add('BankAccounts', value);
    }
    RemoveBankAccount(value) {
        return this.remove('BankAccounts', value);
    }
    set BankAccounts(value) {
        this.set('BankAccounts', value);
    }
    get CanReadCurrentContacts() {
        return this.canRead('CurrentContacts');
    }
    get CurrentContacts() {
        return this.get('CurrentContacts');
    }
    get CanReadBillingAddress() {
        return this.canRead('BillingAddress');
    }
    get BillingAddress() {
        return this.get('BillingAddress');
    }
    get CanReadGeneralEmail() {
        return this.canRead('GeneralEmail');
    }
    get GeneralEmail() {
        return this.get('GeneralEmail');
    }
    get CanReadDefaultShipmentMethod() {
        return this.canRead('DefaultShipmentMethod');
    }
    get CanWriteDefaultShipmentMethod() {
        return this.canWrite('DefaultShipmentMethod');
    }
    get DefaultShipmentMethod() {
        return this.get('DefaultShipmentMethod');
    }
    set DefaultShipmentMethod(value) {
        this.set('DefaultShipmentMethod', value);
    }
    get CanReadResumes() {
        return this.canRead('Resumes');
    }
    get CanWriteResumes() {
        return this.canWrite('Resumes');
    }
    get Resumes() {
        return this.get('Resumes');
    }
    AddResume(value) {
        return this.add('Resumes', value);
    }
    RemoveResume(value) {
        return this.remove('Resumes', value);
    }
    set Resumes(value) {
        this.set('Resumes', value);
    }
    get CanReadHeadQuarter() {
        return this.canRead('HeadQuarter');
    }
    get HeadQuarter() {
        return this.get('HeadQuarter');
    }
    get CanReadPersonalEmailAddress() {
        return this.canRead('PersonalEmailAddress');
    }
    get PersonalEmailAddress() {
        return this.get('PersonalEmailAddress');
    }
    get CanReadCellPhoneNumber() {
        return this.canRead('CellPhoneNumber');
    }
    get CellPhoneNumber() {
        return this.get('CellPhoneNumber');
    }
    get CanReadBillingInquiriesPhone() {
        return this.canRead('BillingInquiriesPhone');
    }
    get BillingInquiriesPhone() {
        return this.get('BillingInquiriesPhone');
    }
    get CanReadOrderAddress() {
        return this.canRead('OrderAddress');
    }
    get OrderAddress() {
        return this.get('OrderAddress');
    }
    get CanReadInternetAddress() {
        return this.canRead('InternetAddress');
    }
    get InternetAddress() {
        return this.get('InternetAddress');
    }
    get CanReadContents() {
        return this.canRead('Contents');
    }
    get CanWriteContents() {
        return this.canWrite('Contents');
    }
    get Contents() {
        return this.get('Contents');
    }
    AddContent(value) {
        return this.add('Contents', value);
    }
    RemoveContent(value) {
        return this.remove('Contents', value);
    }
    set Contents(value) {
        this.set('Contents', value);
    }
    get CanReadCreditCards() {
        return this.canRead('CreditCards');
    }
    get CanWriteCreditCards() {
        return this.canWrite('CreditCards');
    }
    get CreditCards() {
        return this.get('CreditCards');
    }
    AddCreditCard(value) {
        return this.add('CreditCards', value);
    }
    RemoveCreditCard(value) {
        return this.remove('CreditCards', value);
    }
    set CreditCards(value) {
        this.set('CreditCards', value);
    }
    get CanReadShippingAddress() {
        return this.canRead('ShippingAddress');
    }
    get ShippingAddress() {
        return this.get('ShippingAddress');
    }
    get CanReadCurrentOrganisationContactRelationships() {
        return this.canRead('CurrentOrganisationContactRelationships');
    }
    get CurrentOrganisationContactRelationships() {
        return this.get('CurrentOrganisationContactRelationships');
    }
    get CanReadOpenOrderAmount() {
        return this.canRead('OpenOrderAmount');
    }
    get OpenOrderAmount() {
        return this.get('OpenOrderAmount');
    }
    get CanReadGeneralFaxNumber() {
        return this.canRead('GeneralFaxNumber');
    }
    get GeneralFaxNumber() {
        return this.get('GeneralFaxNumber');
    }
    get CanReadDefaultPaymentMethod() {
        return this.canRead('DefaultPaymentMethod');
    }
    get CanWriteDefaultPaymentMethod() {
        return this.canWrite('DefaultPaymentMethod');
    }
    get DefaultPaymentMethod() {
        return this.get('DefaultPaymentMethod');
    }
    set DefaultPaymentMethod(value) {
        this.set('DefaultPaymentMethod', value);
    }
    get CanReadCurrentPartyContactMechanisms() {
        return this.canRead('CurrentPartyContactMechanisms');
    }
    get CurrentPartyContactMechanisms() {
        return this.get('CurrentPartyContactMechanisms');
    }
    get CanReadGeneralPhoneNumber() {
        return this.canRead('GeneralPhoneNumber');
    }
    get GeneralPhoneNumber() {
        return this.get('GeneralPhoneNumber');
    }
    get CanReadPreferredCurrency() {
        return this.canRead('PreferredCurrency');
    }
    get CanWritePreferredCurrency() {
        return this.canWrite('PreferredCurrency');
    }
    get PreferredCurrency() {
        return this.get('PreferredCurrency');
    }
    set PreferredCurrency(value) {
        this.set('PreferredCurrency', value);
    }
    get CanReadVatRegime() {
        return this.canRead('VatRegime');
    }
    get CanWriteVatRegime() {
        return this.canWrite('VatRegime');
    }
    get VatRegime() {
        return this.get('VatRegime');
    }
    set VatRegime(value) {
        this.set('VatRegime', value);
    }
    get CanReadAmountOverDue() {
        return this.canRead('AmountOverDue');
    }
    get CanWriteAmountOverDue() {
        return this.canWrite('AmountOverDue');
    }
    get AmountOverDue() {
        return this.get('AmountOverDue');
    }
    set AmountOverDue(value) {
        this.set('AmountOverDue', value);
    }
    get CanReadDunningType() {
        return this.canRead('DunningType');
    }
    get CanWriteDunningType() {
        return this.canWrite('DunningType');
    }
    get DunningType() {
        return this.get('DunningType');
    }
    set DunningType(value) {
        this.set('DunningType', value);
    }
    get CanReadAmountDue() {
        return this.canRead('AmountDue');
    }
    get AmountDue() {
        return this.get('AmountDue');
    }
    get CanReadLastReminderDate() {
        return this.canRead('LastReminderDate');
    }
    get CanWriteLastReminderDate() {
        return this.canWrite('LastReminderDate');
    }
    get LastReminderDate() {
        return this.get('LastReminderDate');
    }
    set LastReminderDate(value) {
        this.set('LastReminderDate', value);
    }
    get CanReadCreditLimit() {
        return this.canRead('CreditLimit');
    }
    get CanWriteCreditLimit() {
        return this.canWrite('CreditLimit');
    }
    get CreditLimit() {
        return this.get('CreditLimit');
    }
    set CreditLimit(value) {
        this.set('CreditLimit', value);
    }
    get CanReadSubAccountNumber() {
        return this.canRead('SubAccountNumber');
    }
    get CanWriteSubAccountNumber() {
        return this.canWrite('SubAccountNumber');
    }
    get SubAccountNumber() {
        return this.get('SubAccountNumber');
    }
    set SubAccountNumber(value) {
        this.set('SubAccountNumber', value);
    }
    get CanReadBlockedForDunning() {
        return this.canRead('BlockedForDunning');
    }
    get CanWriteBlockedForDunning() {
        return this.canWrite('BlockedForDunning');
    }
    get BlockedForDunning() {
        return this.get('BlockedForDunning');
    }
    set BlockedForDunning(value) {
        this.set('BlockedForDunning', value);
    }
    get CanReadCreatedBy() {
        return this.canRead('CreatedBy');
    }
    get CanWriteCreatedBy() {
        return this.canWrite('CreatedBy');
    }
    get CreatedBy() {
        return this.get('CreatedBy');
    }
    set CreatedBy(value) {
        this.set('CreatedBy', value);
    }
    get CanReadLastModifiedBy() {
        return this.canRead('LastModifiedBy');
    }
    get CanWriteLastModifiedBy() {
        return this.canWrite('LastModifiedBy');
    }
    get LastModifiedBy() {
        return this.get('LastModifiedBy');
    }
    set LastModifiedBy(value) {
        this.set('LastModifiedBy', value);
    }
    get CanReadCreationDate() {
        return this.canRead('CreationDate');
    }
    get CanWriteCreationDate() {
        return this.canWrite('CreationDate');
    }
    get CreationDate() {
        return this.get('CreationDate');
    }
    set CreationDate(value) {
        this.set('CreationDate', value);
    }
    get CanReadLastModifiedDate() {
        return this.canRead('LastModifiedDate');
    }
    get CanWriteLastModifiedDate() {
        return this.canWrite('LastModifiedDate');
    }
    get LastModifiedDate() {
        return this.get('LastModifiedDate');
    }
    set LastModifiedDate(value) {
        this.set('LastModifiedDate', value);
    }
    get CanReadUniqueId() {
        return this.canRead('UniqueId');
    }
    get CanWriteUniqueId() {
        return this.canWrite('UniqueId');
    }
    get UniqueId() {
        return this.get('UniqueId');
    }
    set UniqueId(value) {
        this.set('UniqueId', value);
    }
    get CanReadComment() {
        return this.canRead('Comment');
    }
    get CanWriteComment() {
        return this.canWrite('Comment');
    }
    get Comment() {
        return this.get('Comment');
    }
    set Comment(value) {
        this.set('Comment', value);
    }
}
exports.AutomatedAgent = AutomatedAgent;
//# sourceMappingURL=AutomatedAgent.g.js.map