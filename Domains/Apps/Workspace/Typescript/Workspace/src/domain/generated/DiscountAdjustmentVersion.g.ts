// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { OrderAdjustmentVersion } from './OrderAdjustmentVersion.g';
import { Version } from './Version.g';
import { VatRate } from './VatRate.g';
import { DiscountAdjustment } from './DiscountAdjustment.g';

export class DiscountAdjustmentVersion extends SessionObject implements OrderAdjustmentVersion {
    get CanReadAmount(): boolean {
        return this.canRead('Amount');
    }

    get CanWriteAmount(): boolean {
        return this.canWrite('Amount');
    }

    get Amount(): number {
        return this.get('Amount');
    }

    set Amount(value: number) {
        this.set('Amount', value);
    }

    get CanReadVatRate(): boolean {
        return this.canRead('VatRate');
    }

    get CanWriteVatRate(): boolean {
        return this.canWrite('VatRate');
    }

    get VatRate(): VatRate {
        return this.get('VatRate');
    }

    set VatRate(value: VatRate) {
        this.set('VatRate', value);
    }

    get CanReadPercentage(): boolean {
        return this.canRead('Percentage');
    }

    get CanWritePercentage(): boolean {
        return this.canWrite('Percentage');
    }

    get Percentage(): number {
        return this.get('Percentage');
    }

    set Percentage(value: number) {
        this.set('Percentage', value);
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
