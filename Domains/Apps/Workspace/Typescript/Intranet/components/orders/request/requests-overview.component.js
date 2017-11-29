"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const platform_browser_1 = require("@angular/platform-browser");
const router_1 = require("@angular/router");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/combineLatest");
const core_2 = require("@covalent/core");
const base_angular_1 = require("@allors/base-angular");
const framework_1 = require("@allors/framework");
let RequestsOverviewComponent = class RequestsOverviewComponent {
    constructor(workspaceService, errorService, formBuilder, titleService, router, dialogService, media, changeDetectorRef) {
        this.workspaceService = workspaceService;
        this.errorService = errorService;
        this.formBuilder = formBuilder;
        this.titleService = titleService;
        this.router = router;
        this.dialogService = dialogService;
        this.media = media;
        this.changeDetectorRef = changeDetectorRef;
        this.title = "Requests";
        this.scope = this.workspaceService.createScope();
        this.refresh$ = new BehaviorSubject_1.BehaviorSubject(undefined);
        this.searchForm = this.formBuilder.group({
            company: [""],
            description: [""],
            requestNumber: [""],
        });
        this.page$ = new BehaviorSubject_1.BehaviorSubject(50);
        const search$ = this.searchForm.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .startWith({});
        const combined$ = Observable_1.Observable
            .combineLatest(search$, this.page$, this.refresh$)
            .scan(([previousData, previousTake, previousDate], [data, take, date]) => {
            return [
                data,
                data !== previousData ? 50 : take,
                date,
            ];
        }, []);
        this.subscription = combined$
            .switchMap(([data, take]) => {
            const m = this.workspaceService.metaPopulation.metaDomain;
            const predicate = new framework_1.And();
            const predicates = predicate.predicates;
            if (data.requestNumber) {
                const like = "%" + data.requestNumber + "%";
                predicates.push(new framework_1.Like({ roleType: m.Request.RequestNumber, value: like }));
            }
            if (data.company) {
                const partyQuery = new framework_1.Query({
                    objectType: m.Party, predicate: new framework_1.Like({
                        roleType: m.Party.PartyName, value: data.company.replace("*", "%") + "%",
                    }),
                });
                const containedIn = new framework_1.ContainedIn({ roleType: m.Request.Originator, query: partyQuery });
                predicates.push(containedIn);
            }
            if (data.description) {
                const like = data.description.replace("*", "%") + "%";
                predicates.push(new framework_1.Like({ roleType: m.Request.Description, value: like }));
            }
            const query = [new framework_1.Query({
                    include: [
                        new framework_1.TreeNode({ roleType: m.Request.Originator }),
                        new framework_1.TreeNode({ roleType: m.Request.RequestState }),
                    ],
                    name: "requests",
                    objectType: m.Request,
                    page: new framework_1.Page({ skip: 0, take }),
                    predicate,
                    sort: [new framework_1.Sort({ roleType: m.Request.RequestNumber, direction: "Desc" })],
                })];
            return this.scope.load("Pull", new framework_1.PullRequest({ query }));
        })
            .subscribe((loaded) => {
            this.data = loaded.collections.requests;
            this.total = loaded.values.requests_total;
        }, (error) => {
            this.errorService.message(error);
            this.goBack();
        });
    }
    more() {
        this.page$.next(this.data.length + 50);
    }
    goBack() {
        window.history.back();
    }
    ngAfterViewInit() {
        this.titleService.setTitle("Requests");
        this.media.broadcast();
        this.changeDetectorRef.detectChanges();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    onView(request) {
        this.router.navigate(["/orders/requests/" + request.id + "/edit"]);
    }
};
RequestsOverviewComponent = __decorate([
    core_1.Component({
        template: `
<mat-toolbar>
  <div layout="row" layout-align="start center" flex>
    <button mat-icon-button tdLayoutManageListOpen [hideWhenOpened]="true" style="display: none">
          <mat-icon>arrow_back</mat-icon>
        </button>
    <span>{{title}}</span>
    <span flex></span>
    <button mat-icon-button><mat-icon>settings</mat-icon></button>
  </div>
</mat-toolbar>

<mat-card>
  <div class="pad-top-xs pad-left pad-right">
    <form novalidate [formGroup]="searchForm">
      <mat-input-container>
        <input fxFlex matInput placeholder="Organisation" formControlName="company">
        <mat-icon matSuffix>search</mat-icon>
      </mat-input-container>
      <mat-input-container>
        <input fxFlex matInput placeholder="Number" formControlName="requestNumber">
        <mat-icon matSuffix>search</mat-icon>
      </mat-input-container>
      <mat-input-container>
        <input fxFlex matInput placeholder="Description" formControlName="description">
        <mat-icon matSuffix>search</mat-icon>
      </mat-input-container>
    </form>
  </div>

  <mat-divider></mat-divider>

  <ng-template tdLoading="organisations">
    <mat-list class="will-load">
      <div class="mat-padding" *ngIf="data && data.length === 0" layout="row" layout-align="center center">
        <h3>No requests to display.</h3>
      </div>
      <ng-template let-request let-last="last" ngFor [ngForOf]="data">
        <mat-list-item>

          <h3 *ngIf="request.Originator" mat-line [routerLink]="['/orders/request/' + request.id ]" > {{request.Originator.displayName}}</h3>
          <h4 mat-line [routerLink]="['/orders/request/' + request.id ]" > {{request.RequestNumber }}: {{request.Description}} ({{request.RequestState.Name}})</h4>
          <p mat-line> Response required date: {{request.RequiredResponseDate | date}} </p>
          <p mat-line hide-gt-md class="mat-caption"> last modified: {{ request.LastModifiedDate | timeAgo }} </p>

          <span flex></span>

          <span hide-xs hide-sm hide-md flex-gt-xs="60" flex-xs="40" layout-gt-xs="row">
                <div class="mat-caption tc-grey-500" flex-gt-xs="50"> {{ request.CreationDate | date }} </div>
                <div class="mat-caption tc-grey-500" flex-gt-xs="50"> {{ request.LastModifiedDate | timeAgo }} </div>
          </span>

          <span>
            <button mat-icon-button [mat-menu-trigger-for]="menu">
            <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu x-position="before" #menu="matMenu">
            <a [routerLink]="['/orders/request/' + request.id ]" mat-menu-item>Details</a>
            <!-- <button mat-menu-item (click)="delete(organisation)">Delete</button> -->
            </mat-menu>
          </span>
        </mat-list-item>
        <mat-divider *ngIf="!last" mat-inset></mat-divider>
      </ng-template>
    </mat-list>
  </ng-template>
</mat-card>

<mat-card body tdMediaToggle="gt-xs" [mediaClasses]="['push']" *ngIf="this.data && this.data.length !== total">
  <mat-card-content>
    <button mat-button (click)="more()">More</button> {{this.data?.length}}/{{total}}
  </mat-card-content>
</mat-card>

<a mat-fab color="accent" class="mat-fab-bottom-right fixed" [routerLink]="['/request']">
  <mat-icon>add</mat-icon>
</a>
`,
    }),
    __metadata("design:paramtypes", [base_angular_1.WorkspaceService,
        base_angular_1.ErrorService,
        forms_1.FormBuilder,
        platform_browser_1.Title,
        router_1.Router,
        core_2.TdDialogService,
        core_2.TdMediaService,
        core_1.ChangeDetectorRef])
], RequestsOverviewComponent);
exports.RequestsOverviewComponent = RequestsOverviewComponent;
