// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { Invoice } from './Invoice.g';
import { Localised } from './Localised.g';
import { Commentable } from './Commentable.g';
import { Printable } from './Printable.g';
import { Auditable } from './Auditable.g';
import { PurchaseInvoiceState } from './PurchaseInvoiceState.g';
import { PurchaseInvoiceVersion } from './PurchaseInvoiceVersion.g';
import { Currency } from './Currency.g';
import { ShippingAndHandlingCharge } from './ShippingAndHandlingCharge.g';
import { Fee } from './Fee.g';
import { DiscountAdjustment } from './DiscountAdjustment.g';
import { BillingAccount } from './BillingAccount.g';
import { SurchargeAdjustment } from './SurchargeAdjustment.g';
import { InvoiceTerm } from './InvoiceTerm.g';
import { VatRegime } from './VatRegime.g';
import { Person } from './Person.g';
import { Locale } from './Locale.g';
import { User } from './User.g';

export class PurchaseInvoice extends SessionObject implements Invoice {
    get CanReadPurchaseInvoiceState(): boolean {
        return this.canRead('PurchaseInvoiceState');
    }

    get CanWritePurchaseInvoiceState(): boolean {
        return this.canWrite('PurchaseInvoiceState');
    }

    get PurchaseInvoiceState(): PurchaseInvoiceState {
        return this.get('PurchaseInvoiceState');
    }

    set PurchaseInvoiceState(value: PurchaseInvoiceState) {
        this.set('PurchaseInvoiceState', value);
    }

    get CanReadCurrentVersion(): boolean {
        return this.canRead('CurrentVersion');
    }

    get CanWriteCurrentVersion(): boolean {
        return this.canWrite('CurrentVersion');
    }

    get CurrentVersion(): PurchaseInvoiceVersion {
        return this.get('CurrentVersion');
    }

    set CurrentVersion(value: PurchaseInvoiceVersion) {
        this.set('CurrentVersion', value);
    }

    get CanReadAllVersions(): boolean {
        return this.canRead('AllVersions');
    }

    get CanWriteAllVersions(): boolean {
        return this.canWrite('AllVersions');
    }

    get AllVersions(): PurchaseInvoiceVersion[] {
        return this.get('AllVersions');
    }

    AddAllVersion(value: PurchaseInvoiceVersion) {
        return this.add('AllVersions', value);
    }

    RemoveAllVersion(value: PurchaseInvoiceVersion) {
        return this.remove('AllVersions', value);
    }

    set AllVersions(value: PurchaseInvoiceVersion[]) {
        this.set('AllVersions', value);
    }

    get CanReadInternalComment(): boolean {
        return this.canRead('InternalComment');
    }

    get CanWriteInternalComment(): boolean {
        return this.canWrite('InternalComment');
    }

    get InternalComment(): string {
        return this.get('InternalComment');
    }

    set InternalComment(value: string) {
        this.set('InternalComment', value);
    }

    get CanReadTotalShippingAndHandlingCustomerCurrency(): boolean {
        return this.canRead('TotalShippingAndHandlingCustomerCurrency');
    }

    get CanWriteTotalShippingAndHandlingCustomerCurrency(): boolean {
        return this.canWrite('TotalShippingAndHandlingCustomerCurrency');
    }

    get TotalShippingAndHandlingCustomerCurrency(): number {
        return this.get('TotalShippingAndHandlingCustomerCurrency');
    }

    set TotalShippingAndHandlingCustomerCurrency(value: number) {
        this.set('TotalShippingAndHandlingCustomerCurrency', value);
    }

    get CanReadCustomerCurrency(): boolean {
        return this.canRead('CustomerCurrency');
    }

    get CustomerCurrency(): Currency {
        return this.get('CustomerCurrency');
    }


    get CanReadDescription(): boolean {
        return this.canRead('Description');
    }

    get CanWriteDescription(): boolean {
        return this.canWrite('Description');
    }

    get Description(): string {
        return this.get('Description');
    }

    set Description(value: string) {
        this.set('Description', value);
    }

    get CanReadShippingAndHandlingCharge(): boolean {
        return this.canRead('ShippingAndHandlingCharge');
    }

    get CanWriteShippingAndHandlingCharge(): boolean {
        return this.canWrite('ShippingAndHandlingCharge');
    }

    get ShippingAndHandlingCharge(): ShippingAndHandlingCharge {
        return this.get('ShippingAndHandlingCharge');
    }

    set ShippingAndHandlingCharge(value: ShippingAndHandlingCharge) {
        this.set('ShippingAndHandlingCharge', value);
    }

    get CanReadTotalFeeCustomerCurrency(): boolean {
        return this.canRead('TotalFeeCustomerCurrency');
    }

    get TotalFeeCustomerCurrency(): number {
        return this.get('TotalFeeCustomerCurrency');
    }


    get CanReadFee(): boolean {
        return this.canRead('Fee');
    }

    get CanWriteFee(): boolean {
        return this.canWrite('Fee');
    }

    get Fee(): Fee {
        return this.get('Fee');
    }

    set Fee(value: Fee) {
        this.set('Fee', value);
    }

    get CanReadTotalExVatCustomerCurrency(): boolean {
        return this.canRead('TotalExVatCustomerCurrency');
    }

    get TotalExVatCustomerCurrency(): number {
        return this.get('TotalExVatCustomerCurrency');
    }


    get CanReadCustomerReference(): boolean {
        return this.canRead('CustomerReference');
    }

    get CanWriteCustomerReference(): boolean {
        return this.canWrite('CustomerReference');
    }

    get CustomerReference(): string {
        return this.get('CustomerReference');
    }

    set CustomerReference(value: string) {
        this.set('CustomerReference', value);
    }

    get CanReadDiscountAdjustment(): boolean {
        return this.canRead('DiscountAdjustment');
    }

    get CanWriteDiscountAdjustment(): boolean {
        return this.canWrite('DiscountAdjustment');
    }

    get DiscountAdjustment(): DiscountAdjustment {
        return this.get('DiscountAdjustment');
    }

    set DiscountAdjustment(value: DiscountAdjustment) {
        this.set('DiscountAdjustment', value);
    }

    get CanReadAmountPaid(): boolean {
        return this.canRead('AmountPaid');
    }

    get AmountPaid(): number {
        return this.get('AmountPaid');
    }


    get CanReadTotalDiscount(): boolean {
        return this.canRead('TotalDiscount');
    }

    get TotalDiscount(): number {
        return this.get('TotalDiscount');
    }


    get CanReadBillingAccount(): boolean {
        return this.canRead('BillingAccount');
    }

    get CanWriteBillingAccount(): boolean {
        return this.canWrite('BillingAccount');
    }

    get BillingAccount(): BillingAccount {
        return this.get('BillingAccount');
    }

    set BillingAccount(value: BillingAccount) {
        this.set('BillingAccount', value);
    }

    get CanReadTotalIncVat(): boolean {
        return this.canRead('TotalIncVat');
    }

    get TotalIncVat(): number {
        return this.get('TotalIncVat');
    }


    get CanReadTotalSurcharge(): boolean {
        return this.canRead('TotalSurcharge');
    }

    get TotalSurcharge(): number {
        return this.get('TotalSurcharge');
    }


    get CanReadTotalBasePrice(): boolean {
        return this.canRead('TotalBasePrice');
    }

    get TotalBasePrice(): number {
        return this.get('TotalBasePrice');
    }


    get CanReadTotalVatCustomerCurrency(): boolean {
        return this.canRead('TotalVatCustomerCurrency');
    }

    get TotalVatCustomerCurrency(): number {
        return this.get('TotalVatCustomerCurrency');
    }


    get CanReadInvoiceDate(): boolean {
        return this.canRead('InvoiceDate');
    }

    get CanWriteInvoiceDate(): boolean {
        return this.canWrite('InvoiceDate');
    }

    get InvoiceDate(): Date {
        return this.get('InvoiceDate');
    }

    set InvoiceDate(value: Date) {
        this.set('InvoiceDate', value);
    }

    get CanReadEntryDate(): boolean {
        return this.canRead('EntryDate');
    }

    get EntryDate(): Date {
        return this.get('EntryDate');
    }


    get CanReadTotalIncVatCustomerCurrency(): boolean {
        return this.canRead('TotalIncVatCustomerCurrency');
    }

    get TotalIncVatCustomerCurrency(): number {
        return this.get('TotalIncVatCustomerCurrency');
    }


    get CanReadTotalShippingAndHandling(): boolean {
        return this.canRead('TotalShippingAndHandling');
    }

    get TotalShippingAndHandling(): number {
        return this.get('TotalShippingAndHandling');
    }


    get CanReadTotalBasePriceCustomerCurrency(): boolean {
        return this.canRead('TotalBasePriceCustomerCurrency');
    }

    get TotalBasePriceCustomerCurrency(): number {
        return this.get('TotalBasePriceCustomerCurrency');
    }


    get CanReadSurchargeAdjustment(): boolean {
        return this.canRead('SurchargeAdjustment');
    }

    get CanWriteSurchargeAdjustment(): boolean {
        return this.canWrite('SurchargeAdjustment');
    }

    get SurchargeAdjustment(): SurchargeAdjustment {
        return this.get('SurchargeAdjustment');
    }

    set SurchargeAdjustment(value: SurchargeAdjustment) {
        this.set('SurchargeAdjustment', value);
    }

    get CanReadTotalExVat(): boolean {
        return this.canRead('TotalExVat');
    }

    get TotalExVat(): number {
        return this.get('TotalExVat');
    }


    get CanReadInvoiceTerms(): boolean {
        return this.canRead('InvoiceTerms');
    }

    get CanWriteInvoiceTerms(): boolean {
        return this.canWrite('InvoiceTerms');
    }

    get InvoiceTerms(): InvoiceTerm[] {
        return this.get('InvoiceTerms');
    }

    AddInvoiceTerm(value: InvoiceTerm) {
        return this.add('InvoiceTerms', value);
    }

    RemoveInvoiceTerm(value: InvoiceTerm) {
        return this.remove('InvoiceTerms', value);
    }

    set InvoiceTerms(value: InvoiceTerm[]) {
        this.set('InvoiceTerms', value);
    }

    get CanReadTotalSurchargeCustomerCurrency(): boolean {
        return this.canRead('TotalSurchargeCustomerCurrency');
    }

    get TotalSurchargeCustomerCurrency(): number {
        return this.get('TotalSurchargeCustomerCurrency');
    }


    get CanReadInvoiceNumber(): boolean {
        return this.canRead('InvoiceNumber');
    }

    get CanWriteInvoiceNumber(): boolean {
        return this.canWrite('InvoiceNumber');
    }

    get InvoiceNumber(): string {
        return this.get('InvoiceNumber');
    }

    set InvoiceNumber(value: string) {
        this.set('InvoiceNumber', value);
    }

    get CanReadMessage(): boolean {
        return this.canRead('Message');
    }

    get CanWriteMessage(): boolean {
        return this.canWrite('Message');
    }

    get Message(): string {
        return this.get('Message');
    }

    set Message(value: string) {
        this.set('Message', value);
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

    get CanReadTotalDiscountCustomerCurrency(): boolean {
        return this.canRead('TotalDiscountCustomerCurrency');
    }

    get TotalDiscountCustomerCurrency(): number {
        return this.get('TotalDiscountCustomerCurrency');
    }


    get CanReadTotalVat(): boolean {
        return this.canRead('TotalVat');
    }

    get TotalVat(): number {
        return this.get('TotalVat');
    }


    get CanReadTotalFee(): boolean {
        return this.canRead('TotalFee');
    }

    get TotalFee(): number {
        return this.get('TotalFee');
    }


    get CanReadContactPerson(): boolean {
        return this.canRead('ContactPerson');
    }

    get CanWriteContactPerson(): boolean {
        return this.canWrite('ContactPerson');
    }

    get ContactPerson(): Person {
        return this.get('ContactPerson');
    }

    set ContactPerson(value: Person) {
        this.set('ContactPerson', value);
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

    get CanReadPrintContent(): boolean {
        return this.canRead('PrintContent');
    }

    get CanWritePrintContent(): boolean {
        return this.canWrite('PrintContent');
    }

    get PrintContent(): string {
        return this.get('PrintContent');
    }

    set PrintContent(value: string) {
        this.set('PrintContent', value);
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


}
