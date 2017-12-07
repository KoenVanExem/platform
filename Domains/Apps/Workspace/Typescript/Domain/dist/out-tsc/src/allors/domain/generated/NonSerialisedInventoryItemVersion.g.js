"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
const framework_1 = require("../../framework");
class NonSerialisedInventoryItemVersion extends framework_1.SessionObject {
    get CanReadNonSerialisedInventoryItemState() {
        return this.canRead('NonSerialisedInventoryItemState');
    }
    get CanWriteNonSerialisedInventoryItemState() {
        return this.canWrite('NonSerialisedInventoryItemState');
    }
    get NonSerialisedInventoryItemState() {
        return this.get('NonSerialisedInventoryItemState');
    }
    set NonSerialisedInventoryItemState(value) {
        this.set('NonSerialisedInventoryItemState', value);
    }
    get CanReadQuantityCommittedOut() {
        return this.canRead('QuantityCommittedOut');
    }
    get QuantityCommittedOut() {
        return this.get('QuantityCommittedOut');
    }
    get CanReadQuantityOnHand() {
        return this.canRead('QuantityOnHand');
    }
    get QuantityOnHand() {
        return this.get('QuantityOnHand');
    }
    get CanReadPreviousQuantityOnHand() {
        return this.canRead('PreviousQuantityOnHand');
    }
    get PreviousQuantityOnHand() {
        return this.get('PreviousQuantityOnHand');
    }
    get CanReadAvailableToPromise() {
        return this.canRead('AvailableToPromise');
    }
    get CanWriteAvailableToPromise() {
        return this.canWrite('AvailableToPromise');
    }
    get AvailableToPromise() {
        return this.get('AvailableToPromise');
    }
    set AvailableToPromise(value) {
        this.set('AvailableToPromise', value);
    }
    get CanReadQuantityExpectedIn() {
        return this.canRead('QuantityExpectedIn');
    }
    get QuantityExpectedIn() {
        return this.get('QuantityExpectedIn');
    }
    get CanReadProductCharacteristicValues() {
        return this.canRead('ProductCharacteristicValues');
    }
    get CanWriteProductCharacteristicValues() {
        return this.canWrite('ProductCharacteristicValues');
    }
    get ProductCharacteristicValues() {
        return this.get('ProductCharacteristicValues');
    }
    AddProductCharacteristicValue(value) {
        return this.add('ProductCharacteristicValues', value);
    }
    RemoveProductCharacteristicValue(value) {
        return this.remove('ProductCharacteristicValues', value);
    }
    set ProductCharacteristicValues(value) {
        this.set('ProductCharacteristicValues', value);
    }
    get CanReadInventoryItemVariances() {
        return this.canRead('InventoryItemVariances');
    }
    get CanWriteInventoryItemVariances() {
        return this.canWrite('InventoryItemVariances');
    }
    get InventoryItemVariances() {
        return this.get('InventoryItemVariances');
    }
    AddInventoryItemVariance(value) {
        return this.add('InventoryItemVariances', value);
    }
    RemoveInventoryItemVariance(value) {
        return this.remove('InventoryItemVariances', value);
    }
    set InventoryItemVariances(value) {
        this.set('InventoryItemVariances', value);
    }
    get CanReadPart() {
        return this.canRead('Part');
    }
    get CanWritePart() {
        return this.canWrite('Part');
    }
    get Part() {
        return this.get('Part');
    }
    set Part(value) {
        this.set('Part', value);
    }
    get CanReadName() {
        return this.canRead('Name');
    }
    get Name() {
        return this.get('Name');
    }
    get CanReadLot() {
        return this.canRead('Lot');
    }
    get CanWriteLot() {
        return this.canWrite('Lot');
    }
    get Lot() {
        return this.get('Lot');
    }
    set Lot(value) {
        this.set('Lot', value);
    }
    get CanReadSku() {
        return this.canRead('Sku');
    }
    get Sku() {
        return this.get('Sku');
    }
    get CanReadUnitOfMeasure() {
        return this.canRead('UnitOfMeasure');
    }
    get UnitOfMeasure() {
        return this.get('UnitOfMeasure');
    }
    get CanReadGood() {
        return this.canRead('Good');
    }
    get CanWriteGood() {
        return this.canWrite('Good');
    }
    get Good() {
        return this.get('Good');
    }
    set Good(value) {
        this.set('Good', value);
    }
    get CanReadProductType() {
        return this.canRead('ProductType');
    }
    get CanWriteProductType() {
        return this.canWrite('ProductType');
    }
    get ProductType() {
        return this.get('ProductType');
    }
    set ProductType(value) {
        this.set('ProductType', value);
    }
    get CanReadFacility() {
        return this.canRead('Facility');
    }
    get CanWriteFacility() {
        return this.canWrite('Facility');
    }
    get Facility() {
        return this.get('Facility');
    }
    set Facility(value) {
        this.set('Facility', value);
    }
    get CanReadDerivationTimeStamp() {
        return this.canRead('DerivationTimeStamp');
    }
    get CanWriteDerivationTimeStamp() {
        return this.canWrite('DerivationTimeStamp');
    }
    get DerivationTimeStamp() {
        return this.get('DerivationTimeStamp');
    }
    set DerivationTimeStamp(value) {
        this.set('DerivationTimeStamp', value);
    }
}
exports.NonSerialisedInventoryItemVersion = NonSerialisedInventoryItemVersion;
//# sourceMappingURL=NonSerialisedInventoryItemVersion.g.js.map