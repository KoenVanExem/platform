import { AfterViewInit, ChangeDetectorRef, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { TdDialogService, TdMediaService } from "@covalent/core";
import 'rxjs/add/observable/combineLatest';
import { MetaDomain, Singleton, WorkEffortAssignment, WorkEffortState, Priority, Person, WorkTask, WorkEffortPurpose } from "@allors/workspace";
import { WorkspaceService, ErrorService } from "@allors/base-angular";
export declare class PartyCommunicationEventWorkTaskComponent implements OnInit, AfterViewInit, OnDestroy {
    private workspaceService;
    private errorService;
    private router;
    private route;
    private snackBar;
    private dialogService;
    media: TdMediaService;
    private changeDetectorRef;
    title: string;
    subTitle: string;
    m: MetaDomain;
    workTask: WorkTask;
    workEffortStates: WorkEffortState[];
    priorities: Priority[];
    workEffortPurposes: WorkEffortPurpose[];
    singleton: Singleton;
    employees: Person[];
    workEffortAssignments: WorkEffortAssignment[];
    assignees: Person[];
    private refresh$;
    private subscription;
    private scope;
    constructor(workspaceService: WorkspaceService, errorService: ErrorService, router: Router, route: ActivatedRoute, snackBar: MatSnackBar, dialogService: TdDialogService, media: TdMediaService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    save(): void;
    refresh(): void;
    goBack(): void;
}
