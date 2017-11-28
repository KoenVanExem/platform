// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { Enumeration } from './Enumeration.g';
import { UniquelyIdentifiable } from './UniquelyIdentifiable.g';
import { VatRate } from './VatRate.g';
import { OrganisationGlAccount } from './OrganisationGlAccount.g';
import { LocalisedText } from './LocalisedText.g';
import { InternalOrganisation } from './InternalOrganisation.g';
import { InvoiceVersion } from './InvoiceVersion.g';
import { Invoice } from './Invoice.g';
import { OrderVersion } from './OrderVersion.g';
import { PartyVersion } from './PartyVersion.g';
import { Order } from './Order.g';
import { Party } from './Party.g';
import { Priceable } from './Priceable.g';

export class VatRegime extends SessionObject implements Enumeration {
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

    get CanReadGeneralLedgerAccount(): boolean {
        return this.canRead('GeneralLedgerAccount');
    }

    get CanWriteGeneralLedgerAccount(): boolean {
        return this.canWrite('GeneralLedgerAccount');
    }

    get GeneralLedgerAccount(): OrganisationGlAccount {
        return this.get('GeneralLedgerAccount');
    }

    set GeneralLedgerAccount(value: OrganisationGlAccount) {
        this.set('GeneralLedgerAccount', value);
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


}
