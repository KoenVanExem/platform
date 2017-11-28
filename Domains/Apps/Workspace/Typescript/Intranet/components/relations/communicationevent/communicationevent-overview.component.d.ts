import { AfterViewInit, ChangeDetectorRef, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { TdDialogService, TdMediaService } from "@covalent/core";
import { MetaDomain, WorkTask, CommunicationEvent, Party } from "@allors/workspace";
import { WorkspaceService, ErrorService } from "@allors/base-angular";
export declare class CommunicationEventOverviewComponent implements OnInit, AfterViewInit, OnDestroy {
    private workspaceService;
    private errorService;
    private route;
    private dialogService;
    private snackBar;
    media: TdMediaService;
    private changeDetectorRef;
    title: string;
    m: MetaDomain;
    communicationEventPrefetch: CommunicationEvent;
    communicationEvent: CommunicationEvent;
    party: Party;
    private refresh$;
    private subscription;
    private scope;
    readonly isEmail: boolean;
    readonly isMeeting: boolean;
    readonly isPhone: boolean;
    readonly isLetter: boolean;
    constructor(workspaceService: WorkspaceService, errorService: ErrorService, route: ActivatedRoute, dialogService: TdDialogService, snackBar: MatSnackBar, media: TdMediaService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    deleteWorkEffort(worktask: WorkTask): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    refresh(): void;
    goBack(): void;
}