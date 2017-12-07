// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "../../framework";

import { InventoryItemVersion } from './InventoryItemVersion.g';
import { Version } from './Version.g';
import { NonSerialisedInventoryItemState } from './NonSerialisedInventoryItemState.g';
import { ProductCharacteristicValue } from './ProductCharacteristicValue.g';
import { InventoryItemVariance } from './InventoryItemVariance.g';
import { Part } from './Part.g';
import { Lot } from './Lot.g';
import { UnitOfMeasure } from './UnitOfMeasure.g';
import { Good } from './Good.g';
import { ProductType } from './ProductType.g';
import { Facility } from './Facility.g';
import { NonSerialisedInventoryItem } from './NonSerialisedInventoryItem.g';

export class NonSerialisedInventoryItemVersion extends SessionObject implements InventoryItemVersion {
    get CanReadNonSerialisedInventoryItemState(): boolean {
        return this.canRead('NonSerialisedInventoryItemState');
    }

    get CanWriteNonSerialisedInventoryItemState(): boolean {
        return this.canWrite('NonSerialisedInventoryItemState');
    }

    get NonSerialisedInventoryItemState(): NonSerialisedInventoryItemState {
        return this.get('NonSerialisedInventoryItemState');
    }

    set NonSerialisedInventoryItemState(value: NonSerialisedInventoryItemState) {
        this.set('NonSerialisedInventoryItemState', value);
    }

    get CanReadQuantityCommittedOut(): boolean {
        return this.canRead('QuantityCommittedOut');
    }

    get QuantityCommittedOut(): number {
        return this.get('QuantityCommittedOut');
    }


    get CanReadQuantityOnHand(): boolean {
        return this.canRead('QuantityOnHand');
    }

    get QuantityOnHand(): number {
        return this.get('QuantityOnHand');
    }


    get CanReadPreviousQuantityOnHand(): boolean {
        return this.canRead('PreviousQuantityOnHand');
    }

    get PreviousQuantityOnHand(): number {
        return this.get('PreviousQuantityOnHand');
    }


    get CanReadAvailableToPromise(): boolean {
        return this.canRead('AvailableToPromise');
    }

    get CanWriteAvailableToPromise(): boolean {
        return this.canWrite('AvailableToPromise');
    }

    get AvailableToPromise(): number {
        return this.get('AvailableToPromise');
    }

    set AvailableToPromise(value: number) {
        this.set('AvailableToPromise', value);
    }

    get CanReadQuantityExpectedIn(): boolean {
        return this.canRead('QuantityExpectedIn');
    }

    get QuantityExpectedIn(): number {
        return this.get('QuantityExpectedIn');
    }


    get CanReadProductCharacteristicValues(): boolean {
        return this.canRead('ProductCharacteristicValues');
    }

    get CanWriteProductCharacteristicValues(): boolean {
        return this.canWrite('ProductCharacteristicValues');
    }

    get ProductCharacteristicValues(): ProductCharacteristicValue[] {
        return this.get('ProductCharacteristicValues');
    }

    AddProductCharacteristicValue(value: ProductCharacteristicValue) {
        return this.add('ProductCharacteristicValues', value);
    }

    RemoveProductCharacteristicValue(value: ProductCharacteristicValue) {
        return this.remove('ProductCharacteristicValues', value);
    }

    set ProductCharacteristicValues(value: ProductCharacteristicValue[]) {
        this.set('ProductCharacteristicValues', value);
    }

    get CanReadInventoryItemVariances(): boolean {
        return this.canRead('InventoryItemVariances');
    }

    get CanWriteInventoryItemVariances(): boolean {
        return this.canWrite('InventoryItemVariances');
    }

    get InventoryItemVariances(): InventoryItemVariance[] {
        return this.get('InventoryItemVariances');
    }

    AddInventoryItemVariance(value: InventoryItemVariance) {
        return this.add('InventoryItemVariances', value);
    }

    RemoveInventoryItemVariance(value: InventoryItemVariance) {
        return this.remove('InventoryItemVariances', value);
    }

    set InventoryItemVariances(value: InventoryItemVariance[]) {
        this.set('InventoryItemVariances', value);
    }

    get CanReadPart(): boolean {
        return this.canRead('Part');
    }

    get CanWritePart(): boolean {
        return this.canWrite('Part');
    }

    get Part(): Part {
        return this.get('Part');
    }

    set Part(value: Part) {
        this.set('Part', value);
    }

    get CanReadName(): boolean {
        return this.canRead('Name');
    }

    get Name(): string {
        return this.get('Name');
    }


    get CanReadLot(): boolean {
        return this.canRead('Lot');
    }

    get CanWriteLot(): boolean {
        return this.canWrite('Lot');
    }

    get Lot(): Lot {
        return this.get('Lot');
    }

    set Lot(value: Lot) {
        this.set('Lot', value);
    }

    get CanReadSku(): boolean {
        return this.canRead('Sku');
    }

    get Sku(): string {
        return this.get('Sku');
    }


    get CanReadUnitOfMeasure(): boolean {
        return this.canRead('UnitOfMeasure');
    }

    get UnitOfMeasure(): UnitOfMeasure {
        return this.get('UnitOfMeasure');
    }


    get CanReadGood(): boolean {
        return this.canRead('Good');
    }

    get CanWriteGood(): boolean {
        return this.canWrite('Good');
    }

    get Good(): Good {
        return this.get('Good');
    }

    set Good(value: Good) {
        this.set('Good', value);
    }

    get CanReadProductType(): boolean {
        return this.canRead('ProductType');
    }

    get CanWriteProductType(): boolean {
        return this.canWrite('ProductType');
    }

    get ProductType(): ProductType {
        return this.get('ProductType');
    }

    set ProductType(value: ProductType) {
        this.set('ProductType', value);
    }

    get CanReadFacility(): boolean {
        return this.canRead('Facility');
    }

    get CanWriteFacility(): boolean {
        return this.canWrite('Facility');
    }

    get Facility(): Facility {
        return this.get('Facility');
    }

    set Facility(value: Facility) {
        this.set('Facility', value);
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