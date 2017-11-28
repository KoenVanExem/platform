// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { OrderItemVersion } from './OrderItemVersion.g';
import { PriceableVersion } from './PriceableVersion.g';
import { Version } from './Version.g';
import { PurchaseOrder } from './PurchaseOrder.g';
import { QuoteItem } from './QuoteItem.g';
import { OrderTerm } from './OrderTerm.g';
import { OrderItem } from './OrderItem.g';
import { PurchaseOrderItem } from './PurchaseOrderItem.g';

export class PurchaseOrderItemVersion extends SessionObject implements OrderItemVersion {
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

    get CanReadDerivationTimeStamp(): boolean {
        return this.canRead('DerivationTimeStamp');
    }

    get CanWriteDerivationTimeStamp(): boolean {
        return this.canWrite('DerivationTimeStamp');
    }

    get DerivationTimeStamp(): Date {
        return this.get('DerivationTimeStamp');
    }

    set DerivationTimeStamp(value: Date) {
        this.set('DerivationTimeStamp', value);
    }


}
