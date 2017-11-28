import { AfterViewInit, ChangeDetectorRef, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { TdDialogService, TdMediaService } from "@covalent/core";
import { MetaDomain, Singleton, Person, ContactMechanism, EmailCommunication, Party, CommunicationEventPurpose, EmailTemplate } from "@allors/workspace";
import { WorkspaceService, ErrorService } from "@allors/base-angular";
export declare class PartyCommunicationEventEmailCommunicationComponent implements OnInit, AfterViewInit, OnDestroy {
    private workspaceService;
    private errorService;
    private route;
    private snackBar;
    private dialogService;
    media: TdMediaService;
    private changeDetectorRef;
    title: string;
    subTitle: string;
    addOriginator: boolean;
    addAddressee: boolean;
    m: MetaDomain;
    singleton: Singleton;
    communicationEvent: EmailCommunication;
    employees: Person[];
    party: Party;
    purposes: CommunicationEventPurpose[];
    emailAddresses: ContactMechanism[];
    emailTemplate: EmailTemplate;
    private refresh$;
    private subscription;
    private scope;
    constructor(workspaceService: WorkspaceService, errorService: ErrorService, route: ActivatedRoute, snackBar: MatSnackBar, dialogService: TdDialogService, media: TdMediaService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    originatorCancelled(): void;
    addresseeCancelled(): void;
    originatorAdded(id: string): void;
    addresseeAdded(id: string): void;
    cancel(): void;
    close(): void;
    reopen(): void;
    save(): void;
    refresh(): void;
    goBack(): void;
}