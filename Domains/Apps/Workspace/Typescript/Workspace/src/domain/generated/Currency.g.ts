// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { IUnitOfMeasure } from './IUnitOfMeasure.g';
import { UniquelyIdentifiable } from './UniquelyIdentifiable.g';
import { LocalisedText } from './LocalisedText.g';
import { Singleton } from './Singleton.g';
import { Country } from './Country.g';
import { InvoiceVersion } from './InvoiceVersion.g';
import { Invoice } from './Invoice.g';
import { OrderVersion } from './OrderVersion.g';
import { PartyVersion } from './PartyVersion.g';
import { QuoteVersion } from './QuoteVersion.g';
import { RequestVersion } from './RequestVersion.g';
import { Order } from './Order.g';
import { Party } from './Party.g';
import { Quote } from './Quote.g';
import { Request } from './Request.g';

export class Currency extends SessionObject implements IUnitOfMeasure {
    get CanReadIsoCode(): boolean {
        return this.canRead('IsoCode');
    }

    get CanWriteIsoCode(): boolean {
        return this.canWrite('IsoCode');
    }

    get IsoCode(): string {
        return this.get('IsoCode');
    }

    set IsoCode(value: string) {
        this.set('IsoCode', value);
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
