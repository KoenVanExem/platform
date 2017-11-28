// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { ObjectState } from './ObjectState.g';
import { UniquelyIdentifiable } from './UniquelyIdentifiable.g';
import { RequestVersion } from './RequestVersion.g';
import { Request } from './Request.g';

export class RequestState extends SessionObject implements ObjectState {
    get CanReadName(): boolean {
        return this.canRead('Name');
    }

    get CanWriteName(): boolean {
        return this.canWrite('Name');
    }

    get Name(): string {
        return this.get('Name');
    }

    set Name(value: string) {
        this.set('Name', value);
    }

    get CanReadUniqueId(): boolean {
        return this.canRead('UniqueId');
    }

    get CanWriteUniqueId(): boolean {
        return this.canWrite('UniqueId');
    }

    get UniqueId(): string {
        return this.get('UniqueId');
    }

    set UniqueId(value: string) {
        this.set('UniqueId', value);
    }


}
