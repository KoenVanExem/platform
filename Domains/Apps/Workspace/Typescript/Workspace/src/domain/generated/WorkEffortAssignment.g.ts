// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { Period } from './Period.g';
import { Commentable } from './Commentable.g';
import { Deletable } from './Deletable.g';
import { Person } from './Person.g';
import { WorkEffort } from './WorkEffort.g';

export class WorkEffortAssignment extends SessionObject implements Period, Commentable, Deletable {
    get CanReadProfessional(): boolean {
        return this.canRead('Professional');
    }

    get CanWriteProfessional(): boolean {
        return this.canWrite('Professional');
    }

    get Professional(): Person {
        return this.get('Professional');
    }

    set Professional(value: Person) {
        this.set('Professional', value);
    }

    get CanReadAssignment(): boolean {
        return this.canRead('Assignment');
    }

    get CanWriteAssignment(): boolean {
        return this.canWrite('Assignment');
    }

    get Assignment(): WorkEffort {
        return this.get('Assignment');
    }

    set Assignment(value: WorkEffort) {
        this.set('Assignment', value);
    }

    get CanReadFromDate(): boolean {
        return this.canRead('FromDate');
    }

    get CanWriteFromDate(): boolean {
        return this.canWrite('FromDate');
    }

    get FromDate(): Date {
        return this.get('FromDate');
    }

    set FromDate(value: Date) {
        this.set('FromDate', value);
    }

    get CanReadThroughDate(): boolean {
        return this.canRead('ThroughDate');
    }

    get CanWriteThroughDate(): boolean {
        return this.canWrite('ThroughDate');
    }

    get ThroughDate(): Date {
        return this.get('ThroughDate');
    }

    set ThroughDate(value: Date) {
        this.set('ThroughDate', value);
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


    get CanExecuteDelete(): boolean {
        return this.canExecute('Delete');
    }

    get Delete(): Method {
        return new Method(this, 'Delete');
    }
}
