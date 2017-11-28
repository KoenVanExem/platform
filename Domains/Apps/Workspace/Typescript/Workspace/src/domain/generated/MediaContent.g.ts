// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { Deletable } from './Deletable.g';
import { Media } from './Media.g';

export class MediaContent extends SessionObject implements Deletable {
    get CanReadType(): boolean {
        return this.canRead('Type');
    }

    get CanWriteType(): boolean {
        return this.canWrite('Type');
    }

    get Type(): string {
        return this.get('Type');
    }

    set Type(value: string) {
        this.set('Type', value);
    }

    get CanReadData(): boolean {
        return this.canRead('Data');
    }

    get CanWriteData(): boolean {
        return this.canWrite('Data');
    }

    get Data(): any {
        return this.get('Data');
    }

    set Data(value: any) {
        this.set('Data', value);
    }


    get CanExecuteDelete(): boolean {
        return this.canExecute('Delete');
    }

    get Delete(): Method {
        return new Method(this, 'Delete');
    }
}
