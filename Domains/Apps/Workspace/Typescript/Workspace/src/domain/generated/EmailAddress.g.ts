// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { ElectronicAddress } from './ElectronicAddress.g';
import { ContactMechanism } from './ContactMechanism.g';
import { Auditable } from './Auditable.g';
import { Deletable } from './Deletable.g';
import { ContactMechanismType } from './ContactMechanismType.g';
import { User } from './User.g';
import { EmailCommunication } from './EmailCommunication.g';
import { EmailCommunicationVersion } from './EmailCommunicationVersion.g';
import { Party } from './Party.g';
import { PartyVersion } from './PartyVersion.g';
import { InternalOrganisation } from './InternalOrganisation.g';
import { SalesInvoiceVersion } from './SalesInvoiceVersion.g';
import { SalesOrderVersion } from './SalesOrderVersion.g';
import { PartyContactMechanism } from './PartyContactMechanism.g';
import { SalesInvoice } from './SalesInvoice.g';
import { SalesOrder } from './SalesOrder.g';
import { CommunicationEventVersion } from './CommunicationEventVersion.g';
import { CommunicationEvent } from './CommunicationEvent.g';
import { QuoteVersion } from './QuoteVersion.g';
import { RequestVersion } from './RequestVersion.g';
import { Quote } from './Quote.g';
import { Request } from './Request.g';
import { ShipmentVersion } from './ShipmentVersion.g';

export class EmailAddress extends SessionObject implements ElectronicAddress {
    get CanReadElectronicAddressString(): boolean {
        return this.canRead('ElectronicAddressString');
    }

    get CanWriteElectronicAddressString(): boolean {
        return this.canWrite('ElectronicAddressString');
    }

    get ElectronicAddressString(): string {
        return this.get('ElectronicAddressString');
    }

    set ElectronicAddressString(value: string) {
        this.set('ElectronicAddressString', value);
    }

    get CanReadDescription(): boolean {
        return this.canRead('Description');
    }

    get CanWriteDescription(): boolean {
        return this.canWrite('Description');
    }

    get Description(): string {
        return this.get('Description');
    }

    set Description(value: string) {
        this.set('Description', value);
    }

    get CanReadContactMechanismType(): boolean {
        return this.canRead('ContactMechanismType');
    }

    get CanWriteContactMechanismType(): boolean {
        return this.canWrite('ContactMechanismType');
    }

    get ContactMechanismType(): ContactMechanismType {
        return this.get('ContactMechanismType');
    }

    set ContactMechanismType(value: ContactMechanismType) {
        this.set('ContactMechanismType', value);
    }

    get CanReadCreatedBy(): boolean {
        return this.canRead('CreatedBy');
    }

    get CanWriteCreatedBy(): boolean {
        return this.canWrite('CreatedBy');
    }

    get CreatedBy(): User {
        return this.get('CreatedBy');
    }

    set CreatedBy(value: User) {
        this.set('CreatedBy', value);
    }

    get CanReadLastModifiedBy(): boolean {
        return this.canRead('LastModifiedBy');
    }

    get CanWriteLastModifiedBy(): boolean {
        return this.canWrite('LastModifiedBy');
    }

    get LastModifiedBy(): User {
        return this.get('LastModifiedBy');
    }

    set LastModifiedBy(value: User) {
        this.set('LastModifiedBy', value);
    }

    get CanReadCreationDate(): boolean {
        return this.canRead('CreationDate');
    }

    get CanWriteCreationDate(): boolean {
        return this.canWrite('CreationDate');
    }

    get CreationDate(): Date {
        return this.get('CreationDate');
    }

    set CreationDate(value: Date) {
        this.set('CreationDate', value);
    }

    get CanReadLastModifiedDate(): boolean {
        return this.canRead('LastModifiedDate');
    }

    get CanWriteLastModifiedDate(): boolean {
        return this.canWrite('LastModifiedDate');
    }

    get LastModifiedDate(): Date {
        return this.get('LastModifiedDate');
    }

    set LastModifiedDate(value: Date) {
        this.set('LastModifiedDate', value);
    }


    get CanExecuteDelete(): boolean {
        return this.canExecute('Delete');
    }

    get Delete(): Method {
        return new Method(this, 'Delete');
    }
}
