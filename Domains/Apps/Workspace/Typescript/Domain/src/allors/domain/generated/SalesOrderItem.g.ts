// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "../../framework";

import { OrderItem } from './OrderItem.g';
import { Priceable } from './Priceable.g';
import { Commentable } from './Commentable.g';
import { Deletable } from './Deletable.g';
import { SalesOrderItemState } from './SalesOrderItemState.g';
import { SalesOrderItemPaymentState } from './SalesOrderItemPaymentState.g';
import { SalesOrderItemShipmentState } from './SalesOrderItemShipmentState.g';
import { SalesOrderItemVersion } from './SalesOrderItemVersion.g';
import { PostalAddress } from './PostalAddress.g';
import { Party } from './Party.g';
import { Person } from './Person.g';
import { NonSerialisedInventoryItem } from './NonSerialisedInventoryItem.g';
import { Product } from './Product.g';
import { ProductFeature } from './ProductFeature.g';
import { SalesInvoiceItemType } from './SalesInvoiceItemType.g';
import { PurchaseOrder } from './PurchaseOrder.g';
import { QuoteItem } from './QuoteItem.g';
import { OrderTerm } from './OrderTerm.g';
import { DiscountAdjustment } from './DiscountAdjustment.g';
import { VatRegime } from './VatRegime.g';
import { VatRate } from './VatRate.g';
import { SurchargeAdjustment } from './SurchargeAdjustment.g';
import { SalesInvoiceItemVersion } from './SalesInvoiceItemVersion.g';
import { SalesOrderVersion } from './SalesOrderVersion.g';
import { SalesInvoiceItem } from './SalesInvoiceItem.g';
import { SalesOrder } from './SalesOrder.g';
import { OrderItemVersion } from './OrderItemVersion.g';
import { OrderVersion } from './OrderVersion.g';
import { Order } from './Order.g';

export class SalesOrderItem extends SessionObject implements OrderItem {
    get CanReadSalesOrderItemState(): boolean {
        return this.canRead('SalesOrderItemState');
    }

    get CanWriteSalesOrderItemState(): boolean {
        return this.canWrite('SalesOrderItemState');
    }

    get SalesOrderItemState(): SalesOrderItemState {
        return this.get('SalesOrderItemState');
    }

    set SalesOrderItemState(value: SalesOrderItemState) {
        this.set('SalesOrderItemState', value);
    }

    get CanReadSalesOrderItemPaymentState(): boolean {
        return this.canRead('SalesOrderItemPaymentState');
    }

    get CanWriteSalesOrderItemPaymentState(): boolean {
        return this.canWrite('SalesOrderItemPaymentState');
    }

    get SalesOrderItemPaymentState(): SalesOrderItemPaymentState {
        return this.get('SalesOrderItemPaymentState');
    }

    set SalesOrderItemPaymentState(value: SalesOrderItemPaymentState) {
        this.set('SalesOrderItemPaymentState', value);
    }

    get CanReadSalesOrderItemShipmentState(): boolean {
        return this.canRead('SalesOrderItemShipmentState');
    }

    get CanWriteSalesOrderItemShipmentState(): boolean {
        return this.canWrite('SalesOrderItemShipmentState');
    }

    get SalesOrderItemShipmentState(): SalesOrderItemShipmentState {
        return this.get('SalesOrderItemShipmentState');
    }

    set SalesOrderItemShipmentState(value: SalesOrderItemShipmentState) {
        this.set('SalesOrderItemShipmentState', value);
    }

    get CanReadCurrentVersion(): boolean {
        return this.canRead('CurrentVersion');
    }

    get CanWriteCurrentVersion(): boolean {
        return this.canWrite('CurrentVersion');
    }

    get CurrentVersion(): SalesOrderItemVersion {
        return this.get('CurrentVersion');
    }

    set CurrentVersion(value: SalesOrderItemVersion) {
        this.set('CurrentVersion', value);
    }

    get CanReadAllVersions(): boolean {
        return this.canRead('AllVersions');
    }

    get CanWriteAllVersions(): boolean {
        return this.canWrite('AllVersions');
    }

    get AllVersions(): SalesOrderItemVersion[] {
        return this.get('AllVersions');
    }

    AddAllVersion(value: SalesOrderItemVersion) {
        return this.add('AllVersions', value);
    }

    RemoveAllVersion(value: SalesOrderItemVersion) {
        return this.remove('AllVersions', value);
    }

    set AllVersions(value: SalesOrderItemVersion[]) {
        this.set('AllVersions', value);
    }

    get CanReadInitialProfitMargin(): boolean {
        return this.canRead('InitialProfitMargin');
    }

    get InitialProfitMargin(): number {
        return this.get('InitialProfitMargin');
    }


    get CanReadQuantityShortFalled(): boolean {
        return this.canRead('QuantityShortFalled');
    }

    get QuantityShortFalled(): number {
        return this.get('QuantityShortFalled');
    }


    get CanReadOrderedWithFeatures(): boolean {
        return this.canRead('OrderedWithFeatures');
    }

    get CanWriteOrderedWithFeatures(): boolean {
        return this.canWrite('OrderedWithFeatures');
    }

    get OrderedWithFeatures(): OrderItem[] {
        return this.get('OrderedWithFeatures');
    }

    AddOrderedWithFeature(value: OrderItem) {
        return this.add('OrderedWithFeatures', value);
    }

    RemoveOrderedWithFeature(value: OrderItem) {
        return this.remove('OrderedWithFeatures', value);
    }

    set OrderedWithFeatures(value: OrderItem[]) {
        this.set('OrderedWithFeatures', value);
    }

    get CanReadMaintainedProfitMargin(): boolean {
        return this.canRead('MaintainedProfitMargin');
    }

    get MaintainedProfitMargin(): number {
        return this.get('MaintainedProfitMargin');
    }


    get CanReadRequiredProfitMargin(): boolean {
        return this.canRead('RequiredProfitMargin');
    }

    get CanWriteRequiredProfitMargin(): boolean {
        return this.canWrite('RequiredProfitMargin');
    }

    get RequiredProfitMargin(): number {
        return this.get('RequiredProfitMargin');
    }

    set RequiredProfitMargin(value: number) {
        this.set('RequiredProfitMargin', value);
    }

    get CanReadQuantityShipNow(): boolean {
        return this.canRead('QuantityShipNow');
    }

    get CanWriteQuantityShipNow(): boolean {
        return this.canWrite('QuantityShipNow');
    }

    get QuantityShipNow(): number {
        return this.get('QuantityShipNow');
    }

    set QuantityShipNow(value: number) {
        this.set('QuantityShipNow', value);
    }

    get CanReadRequiredMarkupPercentage(): boolean {
        return this.canRead('RequiredMarkupPercentage');
    }

    get CanWriteRequiredMarkupPercentage(): boolean {
        return this.canWrite('RequiredMarkupPercentage');
    }

    get RequiredMarkupPercentage(): number {
        return this.get('RequiredMarkupPercentage');
    }

    set RequiredMarkupPercentage(value: number) {
        this.set('RequiredMarkupPercentage', value);
    }

    get CanReadQuantityShipped(): boolean {
        return this.canRead('QuantityShipped');
    }

    get QuantityShipped(): number {
        return this.get('QuantityShipped');
    }


    get CanReadShipToAddress(): boolean {
        return this.canRead('ShipToAddress');
    }

    get ShipToAddress(): PostalAddress {
        return this.get('ShipToAddress');
    }


    get CanReadQuantityPicked(): boolean {
        return this.canRead('QuantityPicked');
    }

    get QuantityPicked(): number {
        return this.get('QuantityPicked');
    }


    get CanReadUnitPurchasePrice(): boolean {
        return this.canRead('UnitPurchasePrice');
    }

    get UnitPurchasePrice(): number {
        return this.get('UnitPurchasePrice');
    }


    get CanReadShipToParty(): boolean {
        return this.canRead('ShipToParty');
    }

    get ShipToParty(): Party {
        return this.get('ShipToParty');
    }


    get CanReadAssignedShipToAddress(): boolean {
        return this.canRead('AssignedShipToAddress');
    }

    get CanWriteAssignedShipToAddress(): boolean {
        return this.canWrite('AssignedShipToAddress');
    }

    get AssignedShipToAddress(): PostalAddress {
        return this.get('AssignedShipToAddress');
    }

    set AssignedShipToAddress(value: PostalAddress) {
        this.set('AssignedShipToAddress', value);
    }

    get CanReadQuantityReturned(): boolean {
        return this.canRead('QuantityReturned');
    }

    get CanWriteQuantityReturned(): boolean {
        return this.canWrite('QuantityReturned');
    }

    get QuantityReturned(): number {
        return this.get('QuantityReturned');
    }

    set QuantityReturned(value: number) {
        this.set('QuantityReturned', value);
    }

    get CanReadQuantityReserved(): boolean {
        return this.canRead('QuantityReserved');
    }

    get QuantityReserved(): number {
        return this.get('QuantityReserved');
    }


    get CanReadSalesRep(): boolean {
        return this.canRead('SalesRep');
    }

    get SalesRep(): Person {
        return this.get('SalesRep');
    }


    get CanReadAssignedShipToParty(): boolean {
        return this.canRead('AssignedShipToParty');
    }

    get CanWriteAssignedShipToParty(): boolean {
        return this.canWrite('AssignedShipToParty');
    }

    get AssignedShipToParty(): Party {
        return this.get('AssignedShipToParty');
    }

    set AssignedShipToParty(value: Party) {
        this.set('AssignedShipToParty', value);
    }

    get CanReadQuantityPendingShipment(): boolean {
        return this.canRead('QuantityPendingShipment');
    }

    get QuantityPendingShipment(): number {
        return this.get('QuantityPendingShipment');
    }


    get CanReadMaintainedMarkupPercentage(): boolean {
        return this.canRead('MaintainedMarkupPercentage');
    }

    get MaintainedMarkupPercentage(): number {
        return this.get('MaintainedMarkupPercentage');
    }


    get CanReadInitialMarkupPercentage(): boolean {
        return this.canRead('InitialMarkupPercentage');
    }

    get InitialMarkupPercentage(): number {
        return this.get('InitialMarkupPercentage');
    }


    get CanReadReservedFromInventoryItem(): boolean {
        return this.canRead('ReservedFromInventoryItem');
    }

    get CanWriteReservedFromInventoryItem(): boolean {
        return this.canWrite('ReservedFromInventoryItem');
    }

    get ReservedFromInventoryItem(): NonSerialisedInventoryItem {
        return this.get('ReservedFromInventoryItem');
    }

    set ReservedFromInventoryItem(value: NonSerialisedInventoryItem) {
        this.set('ReservedFromInventoryItem', value);
    }

    get CanReadProduct(): boolean {
        return this.canRead('Product');
    }

    get CanWriteProduct(): boolean {
        return this.canWrite('Product');
    }

    get Product(): Product {
        return this.get('Product');
    }

    set Product(value: Product) {
        this.set('Product', value);
    }

    get CanReadProductFeature(): boolean {
        return this.canRead('ProductFeature');
    }

    get CanWriteProductFeature(): boolean {
        return this.canWrite('ProductFeature');
    }

    get ProductFeature(): ProductFeature {
        return this.get('ProductFeature');
    }

    set ProductFeature(value: ProductFeature) {
        this.set('ProductFeature', value);
    }

    get CanReadQuantityRequestsShipping(): boolean {
        return this.canRead('QuantityRequestsShipping');
    }

    get QuantityRequestsShipping(): number {
        return this.get('QuantityRequestsShipping');
    }


    get CanReadItemType(): boolean {
        return this.canRead('ItemType');
    }

    get CanWriteItemType(): boolean {
        return this.canWrite('ItemType');
    }

    get ItemType(): SalesInvoiceItemType {
        return this.get('ItemType');
    }

    set ItemType(value: SalesInvoiceItemType) {
        this.set('ItemType', value);
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


    get CanExecuteContinue(): boolean {
        return this.canExecute('Continue');
    }

    get Continue(): Method {
        return new Method(this, 'Continue');
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