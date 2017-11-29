import { AfterViewInit, ChangeDetectorRef, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { TdDialogService, TdMediaService } from "@covalent/core";
import 'rxjs/add/observable/combineLatest';
import { MetaDomain, PartyContactMechanism, Person, CommunicationEvent, Organisation, ContactMechanism } from "@allors/workspace";
import { WorkspaceService, ErrorService } from "@allors/base-angular";
export declare class WorkTaskOverviewComponent implements OnInit, AfterViewInit, OnDestroy {
    private workspaceService;
    private errorService;
    private route;
    private dialogService;
    private snackBar;
    media: TdMediaService;
    private changeDetectorRef;
    m: MetaDomain;
    communicationEvents: CommunicationEvent[];
    title: string;
    person: Person;
    organisation: Organisation;
    contactMechanismsCollection: string;
    currentContactMechanisms: PartyContactMechanism[];
    inactiveContactMechanisms: PartyContactMechanism[];
    allContactMechanisms: PartyContactMechanism[];
    private refresh$;
    private subscription;
    private scope;
    constructor(workspaceService: WorkspaceService, errorService: ErrorService, route: ActivatedRoute, dialogService: TdDialogService, snackBar: MatSnackBar, media: TdMediaService, changeDetectorRef: ChangeDetectorRef);
    readonly contactMechanisms: any;
    ngOnInit(): void;
    removeContactMechanism(partyContactMechanism: PartyContactMechanism): void;
    activateContactMechanism(partyContactMechanism: PartyContactMechanism): void;
    deleteContactMechanism(contactMechanism: ContactMechanism): void;
    cancelCommunication(communicationEvent: CommunicationEvent): void;
    closeCommunication(communicationEvent: CommunicationEvent): void;
    reopenCommunication(communicationEvent: CommunicationEvent): void;
    deleteCommunication(communicationEvent: CommunicationEvent): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    refresh(): void;
    goBack(): void;
    checkType(obj: any): string;
}
