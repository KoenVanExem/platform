// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { Enumeration } from './Enumeration.g';
import { UniquelyIdentifiable } from './UniquelyIdentifiable.g';
import { LocalisedText } from './LocalisedText.g';
import { SalesOrderVersion } from './SalesOrderVersion.g';
import { SalesOrder } from './SalesOrder.g';
import { Store } from './Store.g';
import { PartyVersion } from './PartyVersion.g';
import { Party } from './Party.g';
import { ShipmentVersion } from './ShipmentVersion.g';

export class ShipmentMethod extends SessionObject implements Enumeration {
    get CanReadLocalisedNames(): boolean {
        return this.canRead('LocalisedNames');
    }

    get CanWriteLocalisedNames(): boolean {
        return this.canWrite('LocalisedNames');
    }

    get LocalisedNames(): LocalisedText[] {
        return this.get('LocalisedNames');
    }

    AddLocalisedName(value: LocalisedText) {
        return this.add('LocalisedNames', value);
    }

    RemoveLocalisedName(value: LocalisedText) {
        return this.remove('LocalisedNames', value);
    }

    set LocalisedNames(value: LocalisedText[]) {
        this.set('LocalisedNames', value);
    }

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

    get CanReadIsActive(): boolean {
        return this.canRead('IsActive');
    }

    get CanWriteIsActive(): boolean {
        return this.canWrite('IsActive');
    }

    get IsActive(): boolean {
        return this.get('IsActive');
    }

    set IsActive(value: boolean) {
        this.set('IsActive', value);
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


    get CanExecuteDelete(): boolean {
        return this.canExecute('Delete');
    }

    get Delete(): Method {
        return new Method(this, 'Delete');
    }
}
