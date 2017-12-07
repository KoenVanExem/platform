// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "../../framework";

import { Commentable } from './Commentable.g';
import { VarianceReason } from './VarianceReason.g';
import { InventoryItemVersion } from './InventoryItemVersion.g';
import { InventoryItem } from './InventoryItem.g';

export class InventoryItemVariance extends SessionObject implements Commentable {
    get CanReadQuantity(): boolean {
        return this.canRead('Quantity');
    }

    get CanWriteQuantity(): boolean {
        return this.canWrite('Quantity');
    }

    get Quantity(): number {
        return this.get('Quantity');
    }

    set Quantity(value: number) {
        this.set('Quantity', value);
    }

    get CanReadInventoryDate(): boolean {
        return this.canRead('InventoryDate');
    }

    get CanWriteInventoryDate(): boolean {
        return this.canWrite('InventoryDate');
    }

    get InventoryDate(): Date {
        return this.get('InventoryDate');
    }

    set InventoryDate(value: Date) {
        this.set('InventoryDate', value);
    }

    get CanReadReason(): boolean {
        return this.canRead('Reason');
    }

    get CanWriteReason(): boolean {
        return this.canWrite('Reason');
    }

    get Reason(): VarianceReason {
        return this.get('Reason');
    }

    set Reason(value: VarianceReason) {
        this.set('Reason', value);
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


}