// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { OrderItem } from './OrderItem.g';
import { Priceable } from './Priceable.g';
import { Commentable } from './Commentable.g';
import { Deletable } from './Deletable.g';
import { PurchaseOrderItemState } from './PurchaseOrderItemState.g';
import { PurchaseOrderItemVersion } from './PurchaseOrderItemVersion.g';
import { PurchaseOrder } from './PurchaseOrder.g';
import { QuoteItem } from './QuoteItem.g';
import { OrderTerm } from './OrderTerm.g';
import { DiscountAdjustment } from './DiscountAdjustment.g';
import { VatRegime } from './VatRegime.g';
import { VatRate } from './VatRate.g';
import { SurchargeAdjustment } from './SurchargeAdjustment.g';
import { SalesOrderItemVersion } from './SalesOrderItemVersion.g';
import { SalesOrderItem } from './SalesOrderItem.g';
import { OrderItemVersion } from './OrderItemVersion.g';
import { OrderVersion } from './OrderVersion.g';
import { Order } from './Order.g';

export class PurchaseOrderItem extends SessionObject implements OrderItem {
    get CanReadPurchaseOrderItemState(): boolean {
        return this.canRead('PurchaseOrderItemState');
    }

    get CanWritePurchaseOrderItemState(): boolean {
        return this.canWrite('PurchaseOrderItemState');
    }

    get PurchaseOrderItemState(): PurchaseOrderItemState {
        return this.get('PurchaseOrderItemState');
    }

    set PurchaseOrderItemState(value: PurchaseOrderItemState) {
        this.set('PurchaseOrderItemState', value);
    }

    get CanReadCurrentVersion(): boolean {
        return this.canRead('CurrentVersion');
    }

    get CanWriteCurrentVersion(): boolean {
        return this.canWrite('CurrentVersion');
    }

    get CurrentVersion(): PurchaseOrderItemVersion {
        return this.get('CurrentVersion');
    }

    set CurrentVersion(value: PurchaseOrderItemVersion) {
        this.set('CurrentVersion', value);
    }

    get CanReadAllVersions(): boolean {
        return this.canRead('AllVersions');
    }

    get CanWriteAllVersions(): boolean {
        return this.canWrite('AllVersions');
    }

    get AllVersions(): PurchaseOrderItemVersion[] {
        return this.get('AllVersions');
    }

    AddAllVersion(value: PurchaseOrderItemVersion) {
        return this.add('AllVersions', value);
    }

    RemoveAllVersion(value: PurchaseOrderItemVersion) {
        return this.remove('AllVersions', value);
    }

    set AllVersions(value: PurchaseOrderItemVersion[]) {
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

    get CanReadQuantityOrdered(): boolean {
        return this.canRead('QuantityOrdered');
    }

    get CanWriteQuantityOrdered(): boolean {
        return this.canWrite('QuantityOrdered');
    }

    get QuantityOrdered(): number {
        return this.get('QuantityOrdered');
    }

    set QuantityOrdered(value: number) {
        this.set('QuantityOrdered', value);
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

    get CanReadCorrespondingPurchaseOrder(): boolean {
        return this.canRead('CorrespondingPurchaseOrder');
    }

    get CanWriteCorrespondingPurchaseOrder(): boolean {
        return this.canWrite('CorrespondingPurchaseOrder');
    }

    get CorrespondingPurchaseOrder(): PurchaseOrder {
        return this.get('CorrespondingPurchaseOrder');
    }

    set CorrespondingPurchaseOrder(value: PurchaseOrder) {
        this.set('CorrespondingPurchaseOrder', value);
    }

    get CanReadTotalOrderAdjustmentCustomerCurrency(): boolean {
        return this.canRead('TotalOrderAdjustmentCustomerCurrency');
    }

    get TotalOrderAdjustmentCustomerCurrency(): number {
        return this.get('TotalOrderAdjustmentCustomerCurrency');
    }


    get CanReadTotalOrderAdjustment(): boolean {
        return this.canRead('TotalOrderAdjustment');
    }

    get TotalOrderAdjustment(): number {
        return this.get('TotalOrderAdjustment');
    }


    get CanReadQuoteItem(): boolean {
        return this.canRead('QuoteItem');
    }

    get CanWriteQuoteItem(): boolean {
        return this.canWrite('QuoteItem');
    }

    get QuoteItem(): QuoteItem {
        return this.get('QuoteItem');
    }

    set QuoteItem(value: QuoteItem) {
        this.set('QuoteItem', value);
    }

    get CanReadAssignedDeliveryDate(): boolean {
        return this.canRead('AssignedDeliveryDate');
    }

    get CanWriteAssignedDeliveryDate(): boolean {
        return this.canWrite('AssignedDeliveryDate');
    }

    get AssignedDeliveryDate(): Date {
        return this.get('AssignedDeliveryDate');
    }

    set AssignedDeliveryDate(value: Date) {
        this.set('AssignedDeliveryDate', value);
    }

    get CanReadDeliveryDate(): boolean {
        return this.canRead('DeliveryDate');
    }

    get DeliveryDate(): Date {
        return this.get('DeliveryDate');
    }


    get CanReadOrderTerms(): boolean {
        return this.canRead('OrderTerms');
    }

    get CanWriteOrderTerms(): boolean {
        return this.canWrite('OrderTerms');
    }

    get OrderTerms(): OrderTerm[] {
        return this.get('OrderTerms');
    }

    AddOrderTerm(value: OrderTerm) {
        return this.add('OrderTerms', value);
    }

    RemoveOrderTerm(value: OrderTerm) {
        return this.remove('OrderTerms', value);
    }

    set OrderTerms(value: OrderTerm[]) {
        this.set('OrderTerms', value);
    }

    get CanReadShippingInstruction(): boolean {
        return this.canRead('ShippingInstruction');
    }

    get CanWriteShippingInstruction(): boolean {
        return this.canWrite('ShippingInstruction');
    }

    get ShippingInstruction(): string {
        return this.get('ShippingInstruction');
    }

    set ShippingInstruction(value: string) {
        this.set('ShippingInstruction', value);
    }

    get CanReadAssociations(): boolean {
        return this.canRead('Associations');
    }

    get CanWriteAssociations(): boolean {
        return this.canWrite('Associations');
    }

    get Associations(): OrderItem[] {
        return this.get('Associations');
    }

    AddAssociation(value: OrderItem) {
        return this.add('Associations', value);
    }

    RemoveAssociation(value: OrderItem) {
        return this.remove('Associations', value);
    }

    set Associations(value: OrderItem[]) {
        this.set('Associations', value);
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

    get CanReadTotalDiscountAsPercentage(): boolean {
        return this.canRead('TotalDiscountAsPercentage');
    }

    get TotalDiscountAsPercentage(): number {
        return this.get('TotalDiscountAsPercentage');
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

    get CanReadUnitVat(): boolean {
        return this.canRead('UnitVat');
    }

    get UnitVat(): number {
        return this.get('UnitVat');
    }


    get CanReadTotalVatCustomerCurrency(): boolean {
        return this.canRead('TotalVatCustomerCurrency');
    }

    get TotalVatCustomerCurrency(): number {
        return this.get('TotalVatCustomerCurrency');
    }


    get CanReadVatRegime(): boolean {
        return this.canRead('VatRegime');
    }

    get VatRegime(): VatRegime {
        return this.get('VatRegime');
    }


    get CanReadTotalVat(): boolean {
        return this.canRead('TotalVat');
    }

    get TotalVat(): number {
        return this.get('TotalVat');
    }


    get CanReadUnitSurcharge(): boolean {
        return this.canRead('UnitSurcharge');
    }

    get UnitSurcharge(): number {
        return this.get('UnitSurcharge');
    }


    get CanReadUnitDiscount(): boolean {
        return this.canRead('UnitDiscount');
    }

    get UnitDiscount(): number {
        return this.get('UnitDiscount');
    }


    get CanReadTotalExVatCustomerCurrency(): boolean {
        return this.canRead('TotalExVatCustomerCurrency');
    }

    get TotalExVatCustomerCurrency(): number {
        return this.get('TotalExVatCustomerCurrency');
    }


    get CanReadDerivedVatRate(): boolean {
        return this.canRead('DerivedVatRate');
    }

    get DerivedVatRate(): VatRate {
        return this.get('DerivedVatRate');
    }


    get CanReadActualUnitPrice(): boolean {
        return this.canRead('ActualUnitPrice');
    }

    get CanWriteActualUnitPrice(): boolean {
        return this.canWrite('ActualUnitPrice');
    }

    get ActualUnitPrice(): number {
        return this.get('ActualUnitPrice');
    }

    set ActualUnitPrice(value: number) {
        this.set('ActualUnitPrice', value);
    }

    get CanReadTotalIncVatCustomerCurrency(): boolean {
        return this.canRead('TotalIncVatCustomerCurrency');
    }

    get TotalIncVatCustomerCurrency(): number {
        return this.get('TotalIncVatCustomerCurrency');
    }


    get CanReadUnitBasePrice(): boolean {
        return this.canRead('UnitBasePrice');
    }

    get UnitBasePrice(): number {
        return this.get('UnitBasePrice');
    }


    get CanReadCalculatedUnitPrice(): boolean {
        return this.canRead('CalculatedUnitPrice');
    }

    get CalculatedUnitPrice(): number {
        return this.get('CalculatedUnitPrice');
    }


    get CanReadTotalSurchargeCustomerCurrency(): boolean {
        return this.canRead('TotalSurchargeCustomerCurrency');
    }

    get TotalSurchargeCustomerCurrency(): number {
        return this.get('TotalSurchargeCustomerCurrency');
    }


    get CanReadTotalIncVat(): boolean {
        return this.canRead('TotalIncVat');
    }

    get TotalIncVat(): number {
        return this.get('TotalIncVat');
    }


    get CanReadTotalSurchargeAsPercentage(): boolean {
        return this.canRead('TotalSurchargeAsPercentage');
    }

    get TotalSurchargeAsPercentage(): number {
        return this.get('TotalSurchargeAsPercentage');
    }


    get CanReadTotalDiscountCustomerCurrency(): boolean {
        return this.canRead('TotalDiscountCustomerCurrency');
    }

    get TotalDiscountCustomerCurrency(): number {
        return this.get('TotalDiscountCustomerCurrency');
    }


    get CanReadTotalDiscount(): boolean {
        return this.canRead('TotalDiscount');
    }

    get TotalDiscount(): number {
        return this.get('TotalDiscount');
    }


    get CanReadTotalSurcharge(): boolean {
        return this.canRead('TotalSurcharge');
    }

    get TotalSurcharge(): number {
        return this.get('TotalSurcharge');
    }


    get CanReadAssignedVatRegime(): boolean {
        return this.canRead('AssignedVatRegime');
    }

    get CanWriteAssignedVatRegime(): boolean {
        return this.canWrite('AssignedVatRegime');
    }

    get AssignedVatRegime(): VatRegime {
        return this.get('AssignedVatRegime');
    }

    set AssignedVatRegime(value: VatRegime) {
        this.set('AssignedVatRegime', value);
    }

    get CanReadTotalBasePrice(): boolean {
        return this.canRead('TotalBasePrice');
    }

    get TotalBasePrice(): number {
        return this.get('TotalBasePrice');
    }


    get CanReadTotalExVat(): boolean {
        return this.canRead('TotalExVat');
    }

    get TotalExVat(): number {
        return this.get('TotalExVat');
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


    get CanExecuteCancel(): boolean {
        return this.canExecute('Cancel');
    }

    get Cancel(): Method {
        return new Method(this, 'Cancel');
    }
    get CanExecuteReject(): boolean {
        return this.canExecute('Reject');
    }

    get Reject(): Method {
        return new Method(this, 'Reject');
    }
    get CanExecuteConfirm(): boolean {
        return this.canExecute('Confirm');
    }

    get Confirm(): Method {
        return new Method(this, 'Confirm');
    }
    get CanExecuteApprove(): boolean {
        return this.canExecute('Approve');
    }

    get Approve(): Method {
        return new Method(this, 'Approve');
    }
    get CanExecuteDelete(): boolean {
        return this.canExecute('Delete');
    }

    get Delete(): Method {
        return new Method(this, 'Delete');
    }
}
