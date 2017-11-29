import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, UrlSegment } from "@angular/router";
import { TdDialogService, TdMediaService } from "@covalent/core";

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/observable/combineLatest';

import { MetaDomain, SalesOrder, SalesInvoice, Good, SalesInvoiceItem, Catalogue, Singleton, Locale, ProductCategory, CatScope, PartyContactMechanism, Enumeration, ContactMechanismType, TelecommunicationsNumber, WorkEffortAssignment, WorkEffortState, Priority, Person, WorkTask, WorkEffortPurpose, CommunicationEvent, Organisation, OrganisationContactRelationship, ContactMechanism, PersonRole, CustomerRelationship, WorkEffort } from "@allors/workspace";
import { Scope, WorkspaceService, Saved, ErrorService, Loaded, Invoked } from "@allors/base-angular";
import { Fetch, TreeNode, Path, Query, PullRequest, And, Predicate, Like, ContainedIn, Page, Sort, Equals } from "@allors/framework";

@Component({
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

<div body *ngIf="person" layout-gt-md="row">
  <div flex-gt-xs="50">
    <mat-card tdMediaToggle="gt-xs" [mediaClasses]="['push']">
      <mat-card-title>Person</mat-card-title>
      <mat-divider></mat-divider>
      <mat-card-content>

        <div *ngIf="organisation" class="pointer" [routerLink]="['/relations/organisation/' + organisation.id ]" layout="row">
          <a-mat-static [object]="organisation" [roleType]="m.Organisation.Name" label="Organisation"></a-mat-static>
        </div>

        <a-mat-static [object]="person" [roleType]="m.Person.PersonRoles" display="Name"></a-mat-static>
        <a-mat-static [object]="person" [roleType]="m.Person.FirstName"></a-mat-static>
        <a-mat-static [object]="person" [roleType]="m.Person.MiddleName"></a-mat-static>
        <a-mat-static [object]="person" [roleType]="m.Person.LastName"></a-mat-static>
        <a-mat-static *ngIf="person.Comment "[object]="person" [roleType]="m.Person.Comment"></a-mat-static>
        <a-mat-static *ngIf="person.Function" [object]="person" [roleType]="m.Person.Function"></a-mat-static>
        <a-mat-static *ngIf="person.Gender" [object]="person" [roleType]="m.Person.Gender" display="Name"></a-mat-static>
        <a-mat-static *ngIf="person.Salutation" [object]="person" [roleType]="m.Person.Salutation" display="Name"></a-mat-static>
        <a-mat-static [object]="person" [roleType]="m.Person.Locale" display="Name"></a-mat-static>

        <div layout="row">
          <p class="mat-caption tc-grey-500"> last modified: {{ person.LastModifiedDate | date}} by {{ person.LastModifiedBy?.displayName}}</p>
        </div>

      </mat-card-content>

      <mat-divider></mat-divider>
      <mat-card-actions>
        <button mat-button [routerLink]="['/person/' + person.id]">Edit</button>
      </mat-card-actions>
    </mat-card>

    <mat-card tdMediaToggle="gt-xs" [mediaClasses]="['push']">
      <mat-card-title>Communications</mat-card-title>

      <mat-divider></mat-divider>
      <mat-card-content>
        <ng-template tdLoading="this.communicationEvents">
          <mat-list class="will-load">
            <div class="mat-padding" *ngIf="!this.communicationEvents" layout="row" layout-align="center center">
              <h3>No communications to display.</h3>
            </div>

            <ng-template let-communicationEvent let-last="last" ngFor [ngForOf]="this.communicationEvents">
              <mat-list-item>
                <div *ngIf="this.checkType(communicationEvent) === 'FaceToFaceCommunication'" mat-line class="mat-caption pointer" [routerLink]="['/relations/party/' + person.id + '/communicationevent/' + communicationEvent.id ]">
                  Meeting, {{ communicationEvent.CommunicationEventState.Name }}</div>

                <div *ngIf="this.checkType(communicationEvent) === 'PhoneCommunication'" mat-line class="mat-caption pointer" [routerLink]="['/relations/party/' + person.id + '/communicationevent/' + communicationEvent.id ]">
                  Phone call, {{ communicationEvent.CommunicationEventState.Name }}</div>

                <div *ngIf="this.checkType(communicationEvent) === 'EmailCommunication'" mat-line class="mat-caption pointer" [routerLink]="['/relations/party/' + person.id + '/communicationevent/' + communicationEvent.id ]">
                  Email, {{ communicationEvent.CommunicationEventState.Name }}</div>

                <div *ngIf="this.checkType(communicationEvent) === 'LetterCorrespondence'" mat-line class="mat-caption pointer" [routerLink]="['/relations/party/' + person.id + '/communicationevent/' + communicationEvent.id ]">
                  Letter, {{ communicationEvent.CommunicationEventState.Name }}</div>

                <p mat-line class="mat-caption">{{ communicationEvent.Subject }} </p>
                <p mat-line class="mat-caption">Involved:
                  <span *ngFor="let party of communicationEvent.InvolvedParties">{{ party.displayName }} </span>
                </p>

                <span hide-xs hide-sm hide-md flex-gt-xs="60" flex-xs="40" layout-gt-xs="row">
                  <div class="mat-caption tc-grey-500" flex-gt-xs="50"> started: {{ communicationEvent.ActualStart | date}} </div>
                  <div class="mat-caption tc-grey-500" flex-gt-xs="50"> ended: {{ communicationEvent.ActualEnd | date }} </div>
                  </span>

                <span>
                    <button mat-icon-button [mat-menu-trigger-for]="menu">
                      <mat-icon>more_vert</mat-icon>
                    </button>
                    <mat-menu x-position="before" #menu="matMenu">
                        <button mat-menu-item [routerLink]="['/relations/party/' + person.id + '/communicationevent/' + communicationEvent.id ]">Details</button>
                        <button *ngIf="this.checkType(communicationEvent) === 'EmailCommunication'" mat-menu-item [routerLink]="['/relations/party/' + person.id + '/communicationevent/emailcommunication/' + communicationEvent.id ]">Edit</button>
                        <button *ngIf="this.checkType(communicationEvent) === 'FaceToFaceCommunication'" mat-menu-item [routerLink]="['/relations/party/' + person.id + '/communicationevent/facetofacecommunication/' + communicationEvent.id ]">Edit</button>
                        <button *ngIf="this.checkType(communicationEvent) === 'LetterCorrespondence'" mat-menu-item [routerLink]="['/relations/party/' + person.id + '/communicationevent/lettercorrespondence/' + communicationEvent.id ]">Edit</button>
                        <button *ngIf="this.checkType(communicationEvent) === 'PhoneCommunication'" mat-menu-item [routerLink]="['/relations/party/' + person.id + '/communicationevent/emailcommunication/' + communicationEvent.id ]">Edit</button>
                        <button [disabled]="!communicationEvent.CanExecuteDelete" mat-menu-item (click)="deleteCommunication(communicationEvent)">Delete</button>
                        <button [disabled]="!communicationEvent.CanExecuteCancel" mat-menu-item (click)="cancelCommunication(communicationEvent)">Cancel</button>
                        <button [disabled]="!communicationEvent.CanExecuteClose" mat-menu-item (click)="closeCommunication(communicationEvent)">Close</button>
                        <button [disabled]="!communicationEvent.CanExecuteReopen" mat-menu-item (click)="reopenCommunication(communicationEvent)">Reopen</button>
                    </mat-menu>
                  </span>

              </mat-list-item>

              <mat-divider *ngIf="!last" mat-inset></mat-divider>

            </ng-template>
          </mat-list>
        </ng-template>
      </mat-card-content>

      <mat-divider></mat-divider>
      <mat-card-actions>
        <button mat-button [routerLink]="['/party/' + person.id +'/communicationevent/facetofacecommunication']">+ Meeting</button>
        <button mat-button [routerLink]="['/party/' + person.id +'/communicationevent/phonecommunication']">+ Phone</button>
        <button mat-button [routerLink]="['/party/' + person.id +'/communicationevent/emailcommunication']">+ Email</button>
        <button mat-button [routerLink]="['/party/' + person.id +'/communicationevent/lettercorrespondence']">+ Letter</button>
      </mat-card-actions>
    </mat-card>

  </div>

  <div flex-gt-xs="50">
    <mat-card tdMediaToggle="gt-xs" [mediaClasses]="['push']">
      <mat-card-title>Contact info</mat-card-title>

      <mat-divider></mat-divider>
      <mat-card-content>

        <mat-radio-group [(ngModel)]="contactMechanismsCollection">
          <mat-radio-button value="Current">Current</mat-radio-button>
          <mat-radio-button value="Inactive">Inactive</mat-radio-button>
          <mat-radio-button value="All">All</mat-radio-button>
        </mat-radio-group>

        <ng-template tdLoading="contactMechanisms">
          <mat-list class="will-load">
            <div class="mat-padding" *ngIf="contactMechanisms.length === 0" layout="row" layout-align="center center">
              <h3>No info to display.</h3>
            </div>
            <ng-template let-partyContactMechanism let-last="last" ngFor [ngForOf]="contactMechanisms">
              <mat-list-item>

                <h3 mat-line> {{partyContactMechanism.ContactPurpose?.Name}}</h3>
                <h3 mat-line> {{partyContactMechanism.Contact}}</h3>
                <div mat-line class="pointer" *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'EmailAddress'" [routerLink]="['/party/' + person.id + '/partycontactmechanism/emailaddress/' + partyContactMechanism.id]">
                  {{ partyContactMechanism.ContactMechanism.ElectronicAddressString}}
                </div>
                <div mat-line class="pointer" *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'WebAddress'" [routerLink]="['/party/' + person.id + '/partycontactmechanism/webaddress/' + partyContactMechanism.id]">
                  {{ partyContactMechanism.ContactMechanism.ElectronicAddressString}}
                </div>
                <div mat-line class="pointer" *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'TelecommunicationsNumber'"
                  [routerLink]="['/party/' + person.id + '/partycontactmechanism/telecommunicationsnumber/' + partyContactMechanism.id]">
                  {{ partyContactMechanism.ContactMechanism.CountryCode}} {{ partyContactMechanism.ContactMechanism.AreaCode}} {{ partyContactMechanism.ContactMechanism.ContactNumber}}
                </div>
                <div mat-line class="pointer" *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'PostalAddress'" [routerLink]="['/party/' + person.id + '/partycontactmechanism/postaladdress/' + partyContactMechanism.id]">
                  {{ partyContactMechanism.ContactMechanism.Address1}} {{ partyContactMechanism.ContactMechanism.PostalBoundary?.PostalCode}}
                  {{ partyContactMechanism.ContactMechanism.PostalBoundary?.Locality}} {{ partyContactMechanism.ContactMechanism.PostalBoundary?.Country.Name}}
                </div>
                <p mat-line class="mat-caption" *ngFor="let contactPurpose of partyContactMechanism.ContactPurposes">{{ contactPurpose.Name }} </p>

                <p mat-line hide-gt-md class="mat-caption"> last modified: {{ partyContactMechanism.LastModifiedDate | timeAgo }} </p>

                <span flex></span>

                <span hide-xs hide-sm hide-md flex-gt-xs="60" flex-xs="40" layout-gt-xs="row">
                  <div class="mat-caption tc-grey-500" flex-gt-xs="50"> created: {{ partyContactMechanism.CreationDate | date }} </div>
                  <div class="mat-caption tc-grey-500" flex-gt-xs="50"> modified: {{ partyContactMechanism.LastModifiedDate | timeAgo }} </div>
              </span>

                <span>
                  <button mat-icon-button [mat-menu-trigger-for]="menu">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu x-position="before" #menu="matMenu">
                      <a *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'EmailAddress'"
                          [routerLink]="['/party/' + person.id + '/partycontactmechanism/emailaddress/' + partyContactMechanism.id]" mat-menu-item>Edit</a>
                      <a *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'WebAddress'"
                          [routerLink]="['/party/' + person.id + '/partycontactmechanism/webaddress/' + partyContactMechanism.id]" mat-menu-item>Edit</a>
                      <a *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'TelecommunicationsNumber'"
                          [routerLink]="['/party/' + person.id + '/partycontactmechanism/telecommunicationsnumber/' + partyContactMechanism.id]" mat-menu-item>Edit</a>
                      <a *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'PostalAddress'"
                          [routerLink]="['/party/' + person.id + '/partycontactmechanism/postaladdress/' + partyContactMechanism.id]" mat-menu-item>Edit</a>
                      <button mat-menu-item (click)="removeContactMechanism(partyContactMechanism)"[disabled]="!!partyContactMechanism.ThroughDate">Remove</button>
                      <button  mat-menu-item (click)="activateContactMechanism(partyContactMechanism)"[disabled]="!partyContactMechanism.ThroughDate">Activate</button>
                      <button mat-menu-item (click)="deleteContactMechanism(partyContactMechanism.ContactMechanism)" [disabled]="!partyContactMechanism.ContactMechanism.CanExecuteDelete">Delete</button>
                  </mat-menu>
              </span>

              </mat-list-item>
              <mat-divider *ngIf="!last" mat-inset></mat-divider>
            </ng-template>

          </mat-list>
        </ng-template>
      </mat-card-content>

      <mat-divider></mat-divider>
      <mat-card-actions>
        <button mat-button [routerLink]="['/party/' + person.id + '/partycontactmechanism/webaddress']">+ Web</button>
        <button mat-button [routerLink]="['/party/' + person.id + '/partycontactmechanism/emailaddress']">+ Email</button>
        <button mat-button [routerLink]="['/party/' + person.id + '/partycontactmechanism/postaladdress']">+ Postal</button>
        <button mat-button [routerLink]="['/party/' + person.id + '/partycontactmechanism/telecommunicationsnumber']">+ Telecom</button>
      </mat-card-actions>
    </mat-card>

    <mat-card *ngIf="workEffortAssignments" tdMediaToggle="gt-xs" [mediaClasses]="['push']">
      <mat-card-title>Work Efforts</mat-card-title>

      <mat-divider></mat-divider>
      <mat-card-content>
        <ng-template tdLoading="workEffortAssignments">
          <mat-list class="will-load">
            <div class="mat-padding" *ngIf="workEffortAssignments.length === 0" layout="row" layout-align="center center">
              <h3>No work efforts to display.</h3>
            </div>

            <ng-template let-workEffortAssignment let-last="last" ngFor [ngForOf]="workEffortAssignments">
              <mat-list-item>
                <div mat-line class="mat-caption pointer" [routerLink]="['/worktask/' + workEffortAssignment.Assignment.id ]">
                  {{ workEffortAssignment.Assignment.Name }}, {{ workEffortAssignment.Assignment.WorkEffortStateState.Name }}
                </div>

                <p mat-line class="mat-caption">{{ workEffortAssignment.Assignment.Description }} </p>
                <p *ngIf="workEffortAssignment.Assignment.Priority" mat-line class="mat-caption">Priority {{ workEffortAssignment.Assignment.Priority.Name }} </p>

                <span hide-xs hide-sm hide-md flex-gt-xs="60" flex-xs="40" layout-gt-xs="row">
              <div class="mat-caption tc-grey-500" flex-gt-xs="50"> Sched. Start: {{ workEffortAssignment.Assignment.ScheduledStart | date}} </div>
              <div class="mat-caption tc-grey-500" flex-gt-xs="50"> Sched. Compl.: {{ workEffortAssignment.Assignment.ScheduledCompletion | date }} </div>
              <div class="mat-caption tc-grey-500" flex-gt-xs="50"> Act. Start: {{ workEffortAssignment.Assignment.ActualStart | date}} </div>
              <div class="mat-caption tc-grey-500" flex-gt-xs="50"> Act. Compl.: {{ workEffortAssignment.Assignment.ActualCompletion | date }} </div>
            </span>

                <span>
              <button mat-icon-button [mat-menu-trigger-for]="menu">
                <mat-icon>more_vert</mat-icon>
              </button>
              <mat-menu x-position="before" #menu="matMenu">
                <a [routerLink]="['/worktask/' + workEffortAssignment.Assignment.id]" mat-menu-item>Edit</a>
                <button  mat-menu-item (click)="delete(workEffortAssignment.Assignment)" [disabled]="!workEffortAssignment.Assignment.CanExecuteDelete">Delete</button>
              </mat-menu>
          </span>


              </mat-list-item>

              <mat-divider *ngIf="!last" mat-inset></mat-divider>

            </ng-template>
          </mat-list>
        </ng-template>
      </mat-card-content>

      <mat-divider></mat-divider>
      <mat-card-actions>
        <button mat-button [routerLink]="['/worktask']">+ Task</button>
      </mat-card-actions>
    </mat-card>

  </div>

</div>
`,
})
export class PersonOverviewComponent implements OnInit, AfterViewInit, OnDestroy {

  public m: MetaDomain;

  public communicationEvents: CommunicationEvent[];
  public workEffortAssignments: WorkEffortAssignment[];

  public title: string = "Person overview";
  public person: Person;
  public organisation: Organisation;

  public contactMechanismsCollection: string = "Current";
  public currentContactMechanisms: PartyContactMechanism[] = [];
  public inactiveContactMechanisms: PartyContactMechanism[] = [];
  public allContactMechanisms: PartyContactMechanism[] = [];

  private refresh$: BehaviorSubject<Date>;
  private subscription: Subscription;
  private scope: Scope;

  constructor(
    private workspaceService: WorkspaceService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private dialogService: TdDialogService,
    private snackBar: MatSnackBar,
    public media: TdMediaService,
    private changeDetectorRef: ChangeDetectorRef,
    private titleService: Title) {

    titleService.setTitle(this.title);

    this.scope = this.workspaceService.createScope()
    this.m = this.workspaceService.metaPopulation.metaDomain;
    this.refresh$ = new BehaviorSubject<Date>(undefined);
  }

  get contactMechanisms(): any {

    switch (this.contactMechanismsCollection) {
      case "Current":
        return this.currentContactMechanisms;
      case "Inactive":
        return this.inactiveContactMechanisms;
      case "All":
      default:
        return this.allContactMechanisms;
    }
  }

  public ngOnInit(): void {

    const route$: Observable<UrlSegment[]> = this.route.url;
    const combined$: Observable<[UrlSegment[], Date]> = Observable.combineLatest(route$, this.refresh$);

    this.subscription = combined$
      .switchMap(([urlSegments, date]: [UrlSegment[], Date]) => {

        const id: string = this.route.snapshot.paramMap.get("id");
        const m: MetaDomain = this.m;

        const fetch: Fetch[] = [
          new Fetch({
            id,
            include: [
              new TreeNode({ roleType: m.Party.Locale }),
              new TreeNode({ roleType: m.Person.PersonRoles }),
              new TreeNode({ roleType: m.Person.LastModifiedBy }),
              new TreeNode({
                nodes: [
                  new TreeNode({ roleType: m.PartyContactMechanism.ContactPurposes }),
                  new TreeNode({ roleType: m.PartyContactMechanism.ContactMechanism }),
                ],
                roleType: m.Party.PartyContactMechanisms,
              }),
              new TreeNode({
                nodes: [
                  new TreeNode({ roleType: m.PartyContactMechanism.ContactPurposes }),
                  new TreeNode({
                    nodes: [
                      new TreeNode({
                        nodes: [
                          new TreeNode({ roleType: m.PostalBoundary.Country }),
                        ],
                        roleType: m.PostalAddress.PostalBoundary,
                      }),
                    ],
                    roleType: m.PartyContactMechanism.ContactMechanism,
                  }),
                ],
                roleType: m.Party.PartyContactMechanisms,
              }),
              new TreeNode({
                nodes: [
                  new TreeNode({ roleType: m.PartyContactMechanism.ContactPurposes }),
                  new TreeNode({
                    nodes: [
                      new TreeNode({
                        nodes: [
                          new TreeNode({ roleType: m.PostalBoundary.Country }),
                        ],
                        roleType: m.PostalAddress.PostalBoundary,
                      }),
                    ],
                    roleType: m.PartyContactMechanism.ContactMechanism,
                  }),
                ],
                roleType: m.Party.CurrentPartyContactMechanisms,
              }),
              new TreeNode({
                nodes: [
                  new TreeNode({ roleType: m.PartyContactMechanism.ContactPurposes }),
                  new TreeNode({
                    nodes: [
                      new TreeNode({
                        nodes: [
                          new TreeNode({ roleType: m.PostalBoundary.Country }),
                        ],
                        roleType: m.PostalAddress.PostalBoundary,
                      }),
                    ],
                    roleType: m.PartyContactMechanism.ContactMechanism,
                  }),
                ],
                roleType: m.Party.InactivePartyContactMechanisms,
              }),
              new TreeNode({
                nodes: [
                  new TreeNode({
                    nodes: [
                      new TreeNode({ roleType: m.PostalBoundary.Country }),
                    ],
                    roleType: m.PostalAddress.PostalBoundary,
                  }),
                ],
                roleType: m.Person.GeneralCorrespondence,
              }),
            ],
            name: "person",
          }),
          new Fetch({
            id,
            include: [
              new TreeNode({ roleType: m.CommunicationEvent.CommunicationEventState }),
              new TreeNode({ roleType: m.CommunicationEvent.FromParties }),
              new TreeNode({ roleType: m.CommunicationEvent.ToParties }),
              new TreeNode({ roleType: m.CommunicationEvent.InvolvedParties }),
            ],
            name: "communicationEvents",
            path: new Path({ step: m.Party.CommunicationEventsWhereInvolvedParty }),
          }),
          new Fetch({
            id,
            include: [
              new TreeNode({
                nodes: [
                  new TreeNode({ roleType: m.WorkEffort.WorkEffortState }),
                  new TreeNode({ roleType: m.WorkEffort.Priority }),
                ],
                roleType: m.WorkEffortAssignment.Assignment,
              }),
            ],
            name: "workEffortAssignments",
            path: new Path({ step: m.Person.WorkEffortAssignmentsWhereProfessional }),
          }),
          new Fetch({
            id,
            include: [
              new TreeNode({ roleType: m.OrganisationContactRelationship.Organisation }),
            ],
            name: "organisationContactRelationships",
            path: new Path({ step: m.Person.OrganisationContactRelationshipsWhereContact }),
          }),
        ];

        const query: Query[] = [
          new Query(
            {
              name: "countries",
              objectType: m.Country,
            }),
          new Query(
            {
              name: "genders",
              objectType: m.GenderType,
            }),
          new Query(
            {
              name: "salutations",
              objectType: m.Salutation,
            }),
          new Query(
            {
              name: "organisationContactKinds",
              objectType: m.OrganisationContactKind,
            }),
          new Query(
            {
              name: "contactMechanismPurposes",
              objectType: m.ContactMechanismPurpose,
            }),
          new Query(
            {
              name: "internalOrganisation",
              objectType: m.InternalOrganisation,
            }),
        ];

        return this.scope
          .load("Pull", new PullRequest({ fetch, query }));
      })
      .subscribe((loaded: Loaded) => {
        this.scope.session.reset();

        this.person = loaded.objects.person as Person;
        const organisationContactRelationships: OrganisationContactRelationship[] = loaded.collections.organisationContactRelationships as OrganisationContactRelationship[];
        this.organisation = organisationContactRelationships.length > 0 ? organisationContactRelationships[0].Organisation as Organisation : undefined;
        this.communicationEvents = loaded.collections.communicationEvents as CommunicationEvent[];
        this.workEffortAssignments = loaded.collections.workEffortAssignments as WorkEffortAssignment[];

        this.currentContactMechanisms = this.person.CurrentPartyContactMechanisms as PartyContactMechanism[];
        this.inactiveContactMechanisms = this.person.InactivePartyContactMechanisms as PartyContactMechanism[];
        this.allContactMechanisms = this.currentContactMechanisms.concat(this.inactiveContactMechanisms);
      },
      (error: any) => {
        this.errorService.message(error);
        this.goBack();
      },
    );
  }

  public removeContactMechanism(partyContactMechanism: PartyContactMechanism): void {
    partyContactMechanism.ThroughDate = new Date();
    this.scope
      .save()
      .subscribe((saved: Saved) => {
        this.scope.session.reset();
        this.refresh();
      },
      (error: Error) => {
        this.errorService.dialog(error);
      });
  }

  public activateContactMechanism(partyContactMechanism: PartyContactMechanism): void {
    partyContactMechanism.ThroughDate = undefined;
    this.scope
      .save()
      .subscribe((saved: Saved) => {
        this.scope.session.reset();
        this.refresh();
      },
      (error: Error) => {
        this.errorService.dialog(error);
      });
  }

  public deleteContactMechanism(contactMechanism: ContactMechanism): void {
    this.dialogService
      .openConfirm({ message: "Are you sure you want to delete this?" })
      .afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          this.scope.invoke(contactMechanism.Delete)
            .subscribe((invoked: Invoked) => {
              this.snackBar.open("Successfully deleted.", "close", { duration: 5000 });
              this.refresh();
            },
            (error: Error) => {
              this.errorService.dialog(error);
            });
        }
      });
  }

  public cancelCommunication(communicationEvent: CommunicationEvent): void {
    this.dialogService
      .openConfirm({ message: "Are you sure you want to cancel this?" })
      .afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          this.scope.invoke(communicationEvent.Cancel)
            .subscribe((invoked: Invoked) => {
              this.snackBar.open("Successfully cancelled.", "close", { duration: 5000 });
              this.refresh();
            },
            (error: Error) => {
              this.errorService.dialog(error);
            });
        }
      });
  }

  public closeCommunication(communicationEvent: CommunicationEvent): void {
    this.dialogService
      .openConfirm({ message: "Are you sure you want to close this?" })
      .afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          this.scope.invoke(communicationEvent.Close)
            .subscribe((invoked: Invoked) => {
              this.snackBar.open("Successfully closed.", "close", { duration: 5000 });
              this.refresh();
            },
            (error: Error) => {
              this.errorService.dialog(error);
            });
        }
      });
  }

  public reopenCommunication(communicationEvent: CommunicationEvent): void {
    this.dialogService
      .openConfirm({ message: "Are you sure you want to reopen this?" })
      .afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          this.scope.invoke(communicationEvent.Reopen)
            .subscribe((invoked: Invoked) => {
              this.snackBar.open("Successfully reopened.", "close", { duration: 5000 });
              this.refresh();
            },
            (error: Error) => {
              this.errorService.dialog(error);
            });
        }
      });
  }

  public deleteCommunication(communicationEvent: CommunicationEvent): void {
    this.dialogService
      .openConfirm({ message: "Are you sure you want to delete this?" })
      .afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          this.scope.invoke(communicationEvent.Delete)
            .subscribe((invoked: Invoked) => {
              this.snackBar.open("Successfully deleted.", "close", { duration: 5000 });
              this.refresh();
            },
            (error: Error) => {
              this.errorService.dialog(error);
            });
        }
      });
  }

  public delete(workEffort: WorkEffort): void {
    this.dialogService
      .openConfirm({ message: "Are you sure you want to delete this work effort?" })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.scope.invoke(workEffort.Delete)
            .subscribe((invoked: Invoked) => {
              this.snackBar.open("Successfully deleted.", "close", { duration: 5000 });
              this.refresh();
            },
            (error: Error) => {
              this.errorService.dialog(error);
            });
        }
      });
  }

  public ngAfterViewInit(): void {
    this.media.broadcast();
    this.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public refresh(): void {
    this.refresh$.next(new Date());
  }

  public goBack(): void {
    window.history.back();
  }

  public checkType(obj: any): string {
    return obj.objectType.name;
  }
}
