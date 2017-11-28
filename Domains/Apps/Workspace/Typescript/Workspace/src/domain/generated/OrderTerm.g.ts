// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { TermType } from './TermType.g';
import { OrderItemVersion } from './OrderItemVersion.g';
import { OrderVersion } from './OrderVersion.g';
import { Order } from './Order.g';
import { OrderItem } from './OrderItem.g';

export class OrderTerm extends SessionObject  {
    get CanReadTermValue(): boolean {
        return this.canRead('TermValue');
    }

    get CanWriteTermValue(): boolean {
        return this.canWrite('TermValue');
    }

    get TermValue(): string {
        return this.get('TermValue');
    }

    set TermValue(value: string) {
        this.set('TermValue', value);
    }

    get CanReadTermType(): boolean {
        return this.canRead('TermType');
    }

    get CanWriteTermType(): boolean {
        return this.canWrite('TermType');
    }

    get TermType(): TermType {
        return this.get('TermType');
    }

    set TermType(value: TermType) {
        this.set('TermType', value);
    }


}
