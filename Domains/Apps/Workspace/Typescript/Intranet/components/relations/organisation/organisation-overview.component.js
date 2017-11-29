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
const material_1 = require("@angular/material");
const router_1 = require("@angular/router");
const core_2 = require("@covalent/core");
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/combineLatest");
const workspace_1 = require("@allors/workspace");
const base_angular_1 = require("@allors/base-angular");
const framework_1 = require("@allors/framework");
let OrganisationOverviewComponent = class OrganisationOverviewComponent {
    constructor(workspaceService, errorService, route, dialogService, snackBar, media, changeDetectorRef) {
        this.workspaceService = workspaceService;
        this.errorService = errorService;
        this.route = route;
        this.dialogService = dialogService;
        this.snackBar = snackBar;
        this.media = media;
        this.changeDetectorRef = changeDetectorRef;
        this.title = "Organisation overview";
        this.contactsCollection = "Current";
        this.currentContactRelationships = [];
        this.inactiveContactRelationships = [];
        this.allContactRelationships = [];
        this.contactMechanismsCollection = "Current";
        this.currentContactMechanisms = [];
        this.inactiveContactMechanisms = [];
        this.allContactMechanisms = [];
        this.scope = this.workspaceService.createScope();
        this.m = this.workspaceService.metaPopulation.metaDomain;
        this.refresh$ = new BehaviorSubject_1.BehaviorSubject(undefined);
    }
    get contactRelationships() {
        switch (this.contactsCollection) {
            case "Current":
                return this.currentContactRelationships;
            case "Inactive":
                return this.inactiveContactRelationships;
            case "All":
            default:
                return this.allContactRelationships;
        }
    }
    get contactMechanisms() {
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
    ngOnInit() {
        const route$ = this.route.url;
        const combined$ = Observable_1.Observable.combineLatest(route$, this.refresh$);
        this.subscription = combined$
            .switchMap(([urlSegments, date]) => {
            const id = this.route.snapshot.paramMap.get("id");
            const m = this.m;
            const organisationContactRelationshipTreeNodes = [
                new framework_1.TreeNode({ roleType: m.OrganisationContactRelationship.ContactKinds }),
                new framework_1.TreeNode({
                    nodes: [
                        new framework_1.TreeNode({
                            nodes: [
                                new framework_1.TreeNode({
                                    nodes: [
                                        new framework_1.TreeNode({ roleType: m.ContactMechanism.ContactMechanismType }),
                                    ],
                                    roleType: m.PartyContactMechanism.ContactMechanism,
                                }),
                            ],
                            roleType: m.Person.PartyContactMechanisms,
                        }),
                    ],
                    roleType: m.OrganisationContactRelationship.Contact,
                }),
            ];
            const partyContactMechanismTreeNodes = [
                new framework_1.TreeNode({ roleType: m.PartyContactMechanism.ContactPurposes }),
                new framework_1.TreeNode({
                    nodes: [
                        new framework_1.TreeNode({ roleType: m.ContactMechanism.ContactMechanismType }),
                        new framework_1.TreeNode({
                            nodes: [
                                new framework_1.TreeNode({ roleType: m.PostalBoundary.Country }),
                            ],
                            roleType: m.PostalAddress.PostalBoundary,
                        }),
                    ],
                    roleType: m.PartyContactMechanism.ContactMechanism,
                }),
            ];
            const fetch = [
                new framework_1.Fetch({
                    id,
                    include: [
                        new framework_1.TreeNode({ roleType: m.Party.Locale }),
                        new framework_1.TreeNode({ roleType: m.Organisation.IndustryClassifications }),
                        new framework_1.TreeNode({ roleType: m.Organisation.OrganisationRoles }),
                        new framework_1.TreeNode({ roleType: m.Organisation.OrganisationClassifications }),
                        new framework_1.TreeNode({ roleType: m.Organisation.LastModifiedBy }),
                        new framework_1.TreeNode({
                            nodes: [
                                new framework_1.TreeNode({
                                    nodes: partyContactMechanismTreeNodes,
                                    roleType: m.Person.PartyContactMechanisms,
                                }),
                            ],
                            roleType: m.Party.CurrentContacts,
                        }),
                        new framework_1.TreeNode({
                            nodes: organisationContactRelationshipTreeNodes,
                            roleType: m.Party.CurrentOrganisationContactRelationships,
                        }),
                        new framework_1.TreeNode({
                            nodes: organisationContactRelationshipTreeNodes,
                            roleType: m.Party.InactiveOrganisationContactRelationships,
                        }),
                        new framework_1.TreeNode({
                            nodes: partyContactMechanismTreeNodes,
                            roleType: m.Party.PartyContactMechanisms,
                        }),
                        new framework_1.TreeNode({
                            nodes: partyContactMechanismTreeNodes,
                            roleType: m.Party.CurrentPartyContactMechanisms,
                        }),
                        new framework_1.TreeNode({
                            nodes: partyContactMechanismTreeNodes,
                            roleType: m.Party.InactivePartyContactMechanisms,
                        }),
                        new framework_1.TreeNode({
                            nodes: [
                                new framework_1.TreeNode({
                                    nodes: [
                                        new framework_1.TreeNode({ roleType: m.PostalBoundary.Country }),
                                    ],
                                    roleType: m.PostalAddress.PostalBoundary,
                                }),
                            ],
                            roleType: m.Organisation.GeneralCorrespondence,
                        }),
                    ],
                    name: "organisation",
                }),
                new framework_1.Fetch({
                    id,
                    include: [
                        new framework_1.TreeNode({ roleType: m.CommunicationEvent.CommunicationEventState }),
                        new framework_1.TreeNode({ roleType: m.CommunicationEvent.FromParties }),
                        new framework_1.TreeNode({ roleType: m.CommunicationEvent.ToParties }),
                    ],
                    name: "communicationEvents",
                    path: new framework_1.Path({ step: m.Party.CommunicationEventsWhereInvolvedParty }),
                }),
            ];
            const query = [
                new framework_1.Query({
                    name: "countries",
                    objectType: m.Country,
                }),
                new framework_1.Query({
                    name: "genders",
                    objectType: m.GenderType,
                }),
                new framework_1.Query({
                    name: "salutations",
                    objectType: m.Salutation,
                }),
                new framework_1.Query({
                    name: "organisationContactKinds",
                    objectType: m.OrganisationContactKind,
                }),
                new framework_1.Query({
                    name: "contactMechanismPurposes",
                    objectType: m.ContactMechanismPurpose,
                }),
                new framework_1.Query({
                    name: "internalOrganisation",
                    objectType: m.InternalOrganisation,
                }),
            ];
            return this.scope
                .load("Pull", new framework_1.PullRequest({ fetch, query }));
        })
            .subscribe((loaded) => {
            this.scope.session.reset();
            this.organisation = loaded.objects.organisation;
            this.communicationEvents = loaded.collections.communicationEvents;
            this.currentContactRelationships = this.organisation.CurrentOrganisationContactRelationships;
            this.inactiveContactRelationships = this.organisation.InactiveOrganisationContactRelationships;
            this.allContactRelationships = this.currentContactRelationships.concat(this.inactiveContactRelationships);
            this.currentContactMechanisms = this.organisation.CurrentPartyContactMechanisms;
            this.inactiveContactMechanisms = this.organisation.InactivePartyContactMechanisms;
            this.allContactMechanisms = this.currentContactMechanisms.concat(this.inactiveContactMechanisms);
        }, (error) => {
            this.errorService.message(error);
            this.goBack();
        });
    }
    ngAfterViewInit() {
        this.media.broadcast();
        this.changeDetectorRef.detectChanges();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    removeContact(organisationContactRelationship) {
        organisationContactRelationship.ThroughDate = new Date();
        this.scope
            .save()
            .subscribe((saved) => {
            this.scope.session.reset();
            this.refresh();
        }, (error) => {
            this.errorService.dialog(error);
        });
    }
    activateContact(organisationContactRelationship) {
        organisationContactRelationship.ThroughDate = undefined;
        this.scope
            .save()
            .subscribe((saved) => {
            this.scope.session.reset();
            this.refresh();
        }, (error) => {
            this.errorService.dialog(error);
        });
    }
    deleteContact(person) {
        this.dialogService
            .openConfirm({ message: "Are you sure you want to delete this?" })
            .afterClosed().subscribe((confirm) => {
            if (confirm) {
                this.scope.invoke(person.Delete)
                    .subscribe((invoked) => {
                    this.snackBar.open("Successfully deleted.", "close", { duration: 5000 });
                    this.refresh();
                }, (error) => {
                    this.errorService.dialog(error);
                });
            }
        });
    }
    removeContactMechanism(partyContactMechanism) {
        partyContactMechanism.ThroughDate = new Date();
        this.scope
            .save()
            .subscribe((saved) => {
            this.scope.session.reset();
            this.refresh();
        }, (error) => {
            this.errorService.dialog(error);
        });
    }
    activateContactMechanism(partyContactMechanism) {
        partyContactMechanism.ThroughDate = undefined;
        this.scope
            .save()
            .subscribe((saved) => {
            this.scope.session.reset();
            this.refresh();
        }, (error) => {
            this.errorService.dialog(error);
        });
    }
    deleteContactMechanism(contactMechanism) {
        this.dialogService
            .openConfirm({ message: "Are you sure you want to delete this?" })
            .afterClosed().subscribe((confirm) => {
            if (confirm) {
                this.scope.invoke(contactMechanism.Delete)
                    .subscribe((invoked) => {
                    this.snackBar.open("Successfully deleted.", "close", { duration: 5000 });
                    this.refresh();
                }, (error) => {
                    this.errorService.dialog(error);
                });
            }
        });
    }
    cancelCommunication(communicationEvent) {
        this.dialogService
            .openConfirm({ message: "Are you sure you want to cancel this?" })
            .afterClosed().subscribe((confirm) => {
            if (confirm) {
                this.scope.invoke(communicationEvent.Cancel)
                    .subscribe((invoked) => {
                    this.snackBar.open("Successfully cancelled.", "close", { duration: 5000 });
                    this.refresh();
                }, (error) => {
                    this.errorService.dialog(error);
                });
            }
        });
    }
    closeCommunication(communicationEvent) {
        this.dialogService
            .openConfirm({ message: "Are you sure you want to close this?" })
            .afterClosed().subscribe((confirm) => {
            if (confirm) {
                this.scope.invoke(communicationEvent.Close)
                    .subscribe((invoked) => {
                    this.snackBar.open("Successfully closed.", "close", { duration: 5000 });
                    this.refresh();
                }, (error) => {
                    this.errorService.dialog(error);
                });
            }
        });
    }
    reopenCommunication(communicationEvent) {
        this.dialogService
            .openConfirm({ message: "Are you sure you want to reopen this?" })
            .afterClosed().subscribe((confirm) => {
            if (confirm) {
                this.scope.invoke(communicationEvent.Reopen)
                    .subscribe((invoked) => {
                    this.snackBar.open("Successfully reopened.", "close", { duration: 5000 });
                    this.refresh();
                }, (error) => {
                    this.errorService.dialog(error);
                });
            }
        });
    }
    deleteCommunication(communicationEvent) {
        this.dialogService
            .openConfirm({ message: "Are you sure you want to delete this?" })
            .afterClosed().subscribe((confirm) => {
            if (confirm) {
                this.scope.invoke(communicationEvent.Delete)
                    .subscribe((invoked) => {
                    this.snackBar.open("Successfully deleted.", "close", { duration: 5000 });
                    this.refresh();
                }, (error) => {
                    this.errorService.dialog(error);
                });
            }
        });
    }
    goBack() {
        window.history.back();
    }
    refresh() {
        this.refresh$.next(new Date());
    }
    isPhone(contactMechanism) {
        if (contactMechanism instanceof workspace_1.TelecommunicationsNumber) {
            const phoneCommunication = contactMechanism;
            return phoneCommunication.ContactMechanismType && phoneCommunication.ContactMechanismType.Name === "Phone";
        }
    }
    checkType(obj) {
        return obj.objectType.name;
    }
};
OrganisationOverviewComponent = __decorate([
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

<div body *ngIf="organisation" layout-gt-md="row">
  <div flex-gt-xs="50">

    <mat-card tdMediaToggle="gt-xs" [mediaClasses]="['push']">
      <mat-card-title>Organisation</mat-card-title>
      <mat-divider></mat-divider>

      <mat-card-content>
        <a-mat-static [object]="organisation" [roleType]="m.Organisation.OrganisationRoles" display="Name"></a-mat-static>
        <a-mat-static [object]="organisation" [roleType]="m.Organisation.Name"></a-mat-static>
        <a-mat-static *ngIf="organisation.OrganisationClassifications.length > 0" [object]="organisation" [roleType]="m.Organisation.OrganisationClassifications"
          display="Name" label="Classification"></a-mat-static>
        <a-mat-static *ngIf="organisation.IndustryClassifications.length > 0" [object]="organisation" [roleType]="m.Organisation.IndustryClassifications"
          display="Name" label="Industry"></a-mat-static>
        <a-mat-static *ngIf="organisation.Comment " [object]="organisation" [roleType]="m.Organisation.Comment"></a-mat-static>
        <a-mat-static [object]="organisation" [roleType]="m.Organisation.Locale" display="Name"></a-mat-static>
        <p class="mat-caption tc-grey-500"> last modified: {{ organisation.LastModifiedDate | date}} by {{ organisation.LastModifiedBy.displayName}}</p>
      </mat-card-content>

      <mat-divider></mat-divider>
      <mat-card-actions>
        <button mat-button [routerLink]="[ '/organisation/' + organisation.id]">Edit</button>
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
                <div *ngIf="this.checkType(communicationEvent) === 'FaceToFaceCommunication'" mat-line class="mat-caption pointer" [routerLink]="['/relations/party/' + organisation.id + '/communicationevent/' + communicationEvent.id ]">
                  Meeting, {{ communicationEvent.CommunicationEventState.Name }}</div>

                <div *ngIf="this.checkType(communicationEvent) === 'PhoneCommunication'" mat-line class="mat-caption pointer" [routerLink]="['/relations/party/' + organisation.id + '/communicationevent/' + communicationEvent.id ]">
                  Phone call, {{ communicationEvent.CommunicationEventState.Name }}</div>

                <div *ngIf="this.checkType(communicationEvent) === 'EmailCommunication'" mat-line class="mat-caption pointer" [routerLink]="['/relations/party/' + organisation.id + '/communicationevent/' + communicationEvent.id ]">
                  Email, {{ communicationEvent.CommunicationEventState.Name }}</div>

                <div *ngIf="this.checkType(communicationEvent) === 'LetterCorrespondence'" mat-line class="mat-caption pointer" [routerLink]="['/relations/party/' + organisation.id + '/communicationevent/' + communicationEvent.id ]">
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
                        <button mat-menu-item [routerLink]="['/relations/party/' + organisation.id + '/communicationevent/' + communicationEvent.id ]">Details</button>
                        <button *ngIf="this.checkType(communicationEvent) === 'EmailCommunication'" mat-menu-item [routerLink]="['/relations/party/' + organisation.id + '/communicationevent/emailcommunication/' + communicationEvent.id ]">Edit</button>
                        <button *ngIf="this.checkType(communicationEvent) === 'FaceToFaceCommunication'" mat-menu-item [routerLink]="['/relations/party/' + organisation.id + '/communicationevent/facetofacecommunication/' + communicationEvent.id ]">Edit</button>
                        <button *ngIf="this.checkType(communicationEvent) === 'LetterCorrespondence'" mat-menu-item [routerLink]="['/relations/party/' + organisation.id + '/communicationevent/lettercorrespondence/' + communicationEvent.id ]">Edit</button>
                        <button *ngIf="this.checkType(communicationEvent) === 'PhoneCommunication'" mat-menu-item [routerLink]="['/relations/party/' + organisation.id + '/communicationevent/emailcommunication/' + communicationEvent.id ]">Edit</button>
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
        <button mat-button [routerLink]="['/party/' + organisation.id +'/communicationevent/facetofacecommunication']">+ Meeting</button>
        <button mat-button [routerLink]="['/party/' + organisation.id +'/communicationevent/phonecommunication']">+ Phone</button>
        <button mat-button [routerLink]="['/party/' + organisation.id +'/communicationevent/emailcommunication']">+ Email</button>
        <button mat-button [routerLink]="['/party/' + organisation.id +'/communicationevent/lettercorrespondence']">+ Letter</button>
      </mat-card-actions>
    </mat-card>

  </div>

  <div flex-gt-xs="50">
    <mat-card tdMediaToggle="gt-xs" [mediaClasses]="['push']">
      <mat-card-title>Contact persons</mat-card-title>
      <mat-card-subtitle>
        <mat-radio-group [(ngModel)]="contactsCollection">
          <mat-radio-button value="Current">Current</mat-radio-button>
          <mat-radio-button value="Inactive">Inactive</mat-radio-button>
          <mat-radio-button value="All">All</mat-radio-button>
        </mat-radio-group>
      </mat-card-subtitle>
      <mat-divider></mat-divider>
      <mat-card-content>

        <ng-template tdLoading="contactRelationships">
          <mat-list class="will-load">
            <div class="mat-padding" *ngIf="contactRelationships.length === 0" layout="row" layout-align="center center">
              <h3>No contact persons to display.</h3>
            </div>
            <ng-template let-contactRelationship let-last="last" ngFor [ngForOf]="contactRelationships">
              <mat-list-item>
                <div class="pointer" [routerLink]="['/relations/person/' + contactRelationship.Contact.id]" mat-line>{{contactRelationship.Contact.FirstName}} {{contactRelationship.Contact.MiddleName}} {{contactRelationship.Contact.LastName}}</div>
                <div *ngIf="contactRelationship.Contact.Function" mat-line class="mat-caption">{{contactRelationship.Contact.Function}}</div>
                <div mat-line *ngFor="let partyContactMechanism of contactRelationship.Contact.PartyContactMechanisms">
                  <p *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'EmailAddress'  && partyContactMechanism.UseAsDefault"
                    mat-line class="mat-caption">
                    {{ partyContactMechanism.ContactMechanism?.ElectronicAddressString}}
                  </p>
                  <p *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'WebAddress'  && partyContactMechanism.UseAsDefault"
                    mat-line class="mat-caption">
                    {{ partyContactMechanism.ContactMechanism?.ElectronicAddressString}}
                  </p>
                  <p *ngIf="this.isPhone(partyContactMechanism.ContactMechanism)" mat-line class="mat-caption">
                    {{ partyContactMechanism.ContactMechanism?.CountryCode}} {{ partyContactMechanism.ContactMechanism?.AreaCode}} {{ partyContactMechanism.ContactMechanism?.ContactNumber}}
                  </p>
                  <p *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'PostalAddress'  && partyContactMechanism.UseAsDefault"
                    mat-line class="mat-caption">
                    {{ partyContactMechanism.ContactMechanism?.Address1}} {{ partyContactMechanism.ContactMechanism?.PostalBoundary?.PostalCode}}
                    {{ partyContactMechanism.ContactMechanism?.PostalBoundary?.Locality}} {{ partyContactMechanism.ContactMechanism?.PostalBoundary?.Country?.Name}}
                  </p>
                </div>

                <p mat-line hide-gt-md class="mat-caption"> last modified: {{ contactRelationship.Contact.LastModifiedDate | timeAgo }} </p>

                <span flex></span>

                <span hide-xs hide-sm hide-md flex-gt-xs="60" flex-xs="40" layout-gt-xs="row">
                  <div class="mat-caption tc-grey-500" flex-gt-xs="50"> created: {{ contactRelationship.Contact.CreationDate | date }} </div>
                  <div class="mat-caption tc-grey-500" flex-gt-xs="50"> modified: {{ contactRelationship.Contact.LastModifiedDate | timeAgo }} </div>
              </span>
                <span>
                  <button mat-icon-button [mat-menu-trigger-for]="menu">
                    <mat-icon>more_vert</mat-icon>
                  </button>
                  <mat-menu x-position="before" #menu="matMenu">
                      <a [routerLink]="['/organisation/' + organisation.id + '/contact/' + contactRelationship.id ]" mat-menu-item>Edit</a>
                      <button mat-menu-item (click)="activateContact(contactRelationship)" [disabled]="!contactRelationship.ThroughDate">Activate</button>
                      <button mat-menu-item (click)="removeContact(contactRelationship)" [disabled]="!!contactRelationship.ThroughDate">Deactivate</button>
                      <button mat-menu-item (click)="deleteContact(contactRelationship.Contact)" [disabled]="!contactRelationship.Contact.CanExecuteDelete">Delete</button>
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
        <button mat-button [routerLink]="['/organisation/'+ organisation.id +'/contact']">Add new</button>
      </mat-card-actions>
    </mat-card>

    <mat-card tdMediaToggle="gt-xs" [mediaClasses]="['push']">
      <mat-card-title>Contact info</mat-card-title>
      <mat-card-subtitle>
        <mat-radio-group [(ngModel)]="contactMechanismsCollection">
          <mat-radio-button value="Current">Current</mat-radio-button>
          <mat-radio-button value="Inactive">Inactive</mat-radio-button>
          <mat-radio-button value="All">All</mat-radio-button>
        </mat-radio-group>
      </mat-card-subtitle>
      <mat-divider></mat-divider>
      <mat-card-content>

        <ng-template tdLoading="contactMechanisms">
          <mat-list class="will-load">
            <div class="mat-padding" *ngIf="contactMechanisms.length === 0" layout="row" layout-align="center center">
              <h3>No info to display.</h3>
            </div>
            <ng-template let-partyContactMechanism let-last="last" ngFor [ngForOf]="contactMechanisms">
              <mat-list-item>

                <h3 mat-line> {{partyContactMechanism.ContactPurpose?.Name}}</h3>
                <h3 mat-line> {{partyContactMechanism.Contact}}</h3>
                <div mat-line class="pointer" *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'EmailAddress'" [routerLink]="['/party/' + organisation.id + '/partycontactmechanism/emailaddress/' + partyContactMechanism.id]">
                  {{ partyContactMechanism.ContactMechanism.ElectronicAddressString}}
                </div>
                <div mat-line class="pointer" *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'WebAddress'" [routerLink]="['/party/' + organisation.id + '/partycontactmechanism/webaddress/' + partyContactMechanism.id]">
                  {{ partyContactMechanism.ContactMechanism.ElectronicAddressString}}
                </div>
                <div mat-line class="pointer" *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'TelecommunicationsNumber'"
                  [routerLink]="['/party/' + organisation.id + '/partycontactmechanism/telecommunicationsnumber/' + partyContactMechanism.id]">
                  {{ partyContactMechanism.ContactMechanism.CountryCode}} {{ partyContactMechanism.ContactMechanism.AreaCode}} {{ partyContactMechanism.ContactMechanism.ContactNumber}}
                </div>
                <div mat-line class="pointer" *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'PostalAddress'" [routerLink]="['/party/' + organisation.id + '/partycontactmechanism/postaladdress/' + partyContactMechanism.id]">
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
                          [routerLink]="['/party/' + organisation.id + '/partycontactmechanism/emailaddress/' + partyContactMechanism.id]" mat-menu-item>Edit</a>
                      <a *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'WebAddress'"
                          [routerLink]="['/party/' + organisation.id + '/partycontactmechanism/webaddress/' + partyContactMechanism.id]" mat-menu-item>Edit</a>
                      <a *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'TelecommunicationsNumber'"
                          [routerLink]="['/party/' + organisation.id + '/partycontactmechanism/telecommunicationsnumber/' + partyContactMechanism.id]" mat-menu-item>Edit</a>
                      <a *ngIf="this.checkType(partyContactMechanism.ContactMechanism) === 'PostalAddress'"
                          [routerLink]="['/party/' + organisation.id + '/partycontactmechanism/postaladdress/' + partyContactMechanism.id]" mat-menu-item>Edit</a>
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
        <button mat-button [routerLink]="['/party/' + organisation.id + '/partycontactmechanism/webaddress']">+ Web</button>
        <button mat-button [routerLink]="['/party/' + organisation.id + '/partycontactmechanism/emailaddress']">+ Email</button>
        <button mat-button [routerLink]="['/party/' + organisation.id + '/partycontactmechanism/postaladdress']">+ Postal</button>
        <button mat-button [routerLink]="['/party/' + organisation.id + '/partycontactmechanism/telecommunicationsnumber']">+ Telecom</button>
      </mat-card-actions>
    </mat-card>

  </div>
</div>
`,
    }),
    __metadata("design:paramtypes", [base_angular_1.WorkspaceService,
        base_angular_1.ErrorService,
        router_1.ActivatedRoute,
        core_2.TdDialogService,
        material_1.MatSnackBar,
        core_2.TdMediaService, core_1.ChangeDetectorRef])
], OrganisationOverviewComponent);
exports.OrganisationOverviewComponent = OrganisationOverviewComponent;
