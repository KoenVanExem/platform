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
const Rx_1 = require("rxjs/Rx");
const workspace_1 = require("@allors/workspace");
const base_angular_1 = require("@allors/base-angular");
const framework_1 = require("@allors/framework");
let InvoiceComponent = class InvoiceComponent {
    constructor(workspaceService, errorService, router, route, snackBar, dialogService, media, changeDetectorRef) {
        this.workspaceService = workspaceService;
        this.errorService = errorService;
        this.router = router;
        this.route = route;
        this.snackBar = snackBar;
        this.dialogService = dialogService;
        this.media = media;
        this.changeDetectorRef = changeDetectorRef;
        this.addEmailAddress = false;
        this.addPostalAddress = false;
        this.addTeleCommunicationsNumber = false;
        this.addWebAddress = false;
        this.addPerson = false;
        this.scope = this.workspaceService.createScope();
        this.m = this.workspaceService.metaPopulation.metaDomain;
        this.refresh$ = new Rx_1.BehaviorSubject(undefined);
        this.peopleFilter = new base_angular_1.Filter({ scope: this.scope, objectType: this.m.Person, roleTypes: [this.m.Person.FirstName, this.m.Person.LastName] });
        this.organisationsFilter = new base_angular_1.Filter({ scope: this.scope, objectType: this.m.Organisation, roleTypes: [this.m.Organisation.Name] });
        this.currenciesFilter = new base_angular_1.Filter({ scope: this.scope, objectType: this.m.Currency, roleTypes: [this.m.Currency.Name] });
    }
    get showOrganisations() {
        return !this.invoice.BillToCustomer || this.invoice.BillToCustomer instanceof (workspace_1.Organisation);
    }
    get showPeople() {
        return !this.invoice.BillToCustomer || this.invoice.BillToCustomer instanceof (workspace_1.Person);
    }
    ngOnInit() {
        const route$ = this.route.url;
        const combined$ = Rx_1.Observable.combineLatest(route$, this.refresh$);
        this.subscription = combined$
            .switchMap(([urlSegments, date]) => {
            const id = this.route.snapshot.paramMap.get("id");
            const m = this.m;
            const rolesQuery = [
                new framework_1.Query({
                    name: "organisationRoles",
                    objectType: m.OrganisationRole,
                }),
                new framework_1.Query({
                    name: "personRoles",
                    objectType: m.PersonRole,
                }),
                new framework_1.Query({
                    name: "currencies",
                    objectType: this.m.Currency,
                }),
                new framework_1.Query({
                    name: "vatRates",
                    objectType: m.VatRate,
                }),
                new framework_1.Query({
                    name: "vatRegimes",
                    objectType: m.VatRegime,
                }),
            ];
            return this.scope
                .load("Pull", new framework_1.PullRequest({ query: rolesQuery }))
                .switchMap((loaded) => {
                this.scope.session.reset();
                this.currencies = loaded.collections.currencies;
                this.vatRates = loaded.collections.vatRates;
                this.vatRegimes = loaded.collections.vatRegimes;
                const organisationRoles = loaded.collections.organisationRoles;
                const oCustomerRole = organisationRoles.find((v) => v.Name === "Customer");
                const personRoles = loaded.collections.organisationRoles;
                const pCustomerRole = organisationRoles.find((v) => v.Name === "Customer");
                const query = [
                    new framework_1.Query({
                        name: "organisations",
                        objectType: this.m.Organisation,
                        predicate: new framework_1.Contains({ roleType: m.Organisation.OrganisationRoles, object: oCustomerRole }),
                    }),
                    new framework_1.Query({
                        name: "persons",
                        objectType: this.m.Person,
                        predicate: new framework_1.Contains({ roleType: m.Person.PersonRoles, object: pCustomerRole }),
                    }),
                ];
                const fetch = [
                    new framework_1.Fetch({
                        id,
                        include: [
                            new framework_1.TreeNode({ roleType: m.SalesInvoice.BillToCustomer }),
                            new framework_1.TreeNode({ roleType: m.SalesInvoice.BillToContactMechanism }),
                            new framework_1.TreeNode({ roleType: m.SalesInvoice.SalesInvoiceState }),
                            new framework_1.TreeNode({ roleType: m.SalesInvoice.SalesOrder }),
                        ],
                        name: "salesInvoice",
                    }),
                    new framework_1.Fetch({
                        id,
                        name: "order",
                        path: new framework_1.Path({ step: m.SalesInvoice.SalesOrder }),
                    }),
                ];
                return this.scope.load("Pull", new framework_1.PullRequest({ fetch, query }));
            });
        })
            .subscribe((loaded) => {
            this.invoice = loaded.objects.salesInvoice;
            this.order = loaded.objects.order;
            if (!this.invoice) {
                this.invoice = this.scope.session.create("SalesInvoice");
            }
            if (this.invoice.BillToCustomer) {
                this.receiverSelected(this.invoice.BillToCustomer);
            }
            this.previousBillToCustomer = this.invoice.BillToCustomer;
            this.organisations = loaded.collections.organisations;
            this.people = loaded.collections.parties;
            this.title = "Sales Invoice for: " + this.invoice.BillToCustomer.PartyName;
        }, (error) => {
            this.errorService.message(error);
            this.goBack();
        });
    }
    personCancelled() {
        this.addPerson = false;
    }
    personAdded(id) {
        this.addPerson = false;
        const contact = this.scope.session.get(id);
        const organisationContactRelationship = this.scope.session.create("OrganisationContactRelationship");
        organisationContactRelationship.Organisation = this.invoice.BillToCustomer;
        organisationContactRelationship.Contact = contact;
        this.contacts.push(contact);
    }
    webAddressCancelled() {
        this.addWebAddress = false;
    }
    webAddressAdded(id) {
        this.addWebAddress = false;
        const partyContactMechanism = this.scope.session.get(id);
        this.contactMechanisms.push(partyContactMechanism.ContactMechanism);
        this.invoice.BillToCustomer.AddPartyContactMechanism(partyContactMechanism);
    }
    emailAddressCancelled() {
        this.addEmailAddress = false;
    }
    emailAddressAdded(id) {
        this.addEmailAddress = false;
        const partyContactMechanism = this.scope.session.get(id);
        this.contactMechanisms.push(partyContactMechanism.ContactMechanism);
        this.invoice.BillToCustomer.AddPartyContactMechanism(partyContactMechanism);
    }
    postalAddressCancelled() {
        this.addPostalAddress = false;
    }
    postalAddressAdded(id) {
        this.addPostalAddress = false;
        const partyContactMechanism = this.scope.session.get(id);
        this.contactMechanisms.push(partyContactMechanism.ContactMechanism);
        this.invoice.BillToCustomer.AddPartyContactMechanism(partyContactMechanism);
    }
    teleCommunicationsNumberCancelled() {
        this.addTeleCommunicationsNumber = false;
    }
    teleCommunicationsNumberAdded(id) {
        this.addTeleCommunicationsNumber = false;
        const partyContactMechanism = this.scope.session.get(id);
        this.contactMechanisms.push(partyContactMechanism.ContactMechanism);
        this.invoice.BillToCustomer.AddPartyContactMechanism(partyContactMechanism);
    }
    send() {
        const sendFn = () => {
            this.scope.invoke(this.invoice.Send)
                .subscribe((invoked) => {
                this.refresh();
                this.snackBar.open("Successfully send.", "close", { duration: 5000 });
            }, (error) => {
                this.errorService.dialog(error);
            });
        };
        if (this.scope.session.hasChanges) {
            this.dialogService
                .openConfirm({ message: "Save changes?" })
                .afterClosed().subscribe((confirm) => {
                if (confirm) {
                    this.scope
                        .save()
                        .subscribe((saved) => {
                        this.scope.session.reset();
                        sendFn();
                    }, (error) => {
                        this.errorService.dialog(error);
                    });
                }
                else {
                    sendFn();
                }
            });
        }
        else {
            sendFn();
        }
    }
    cancel() {
        const cancelFn = () => {
            this.scope.invoke(this.invoice.CancelInvoice)
                .subscribe((invoked) => {
                this.refresh();
                this.snackBar.open("Successfully cancelled.", "close", { duration: 5000 });
            }, (error) => {
                this.errorService.dialog(error);
            });
        };
        if (this.scope.session.hasChanges) {
            this.dialogService
                .openConfirm({ message: "Save changes?" })
                .afterClosed().subscribe((confirm) => {
                if (confirm) {
                    this.scope
                        .save()
                        .subscribe((saved) => {
                        this.scope.session.reset();
                        cancelFn();
                    }, (error) => {
                        this.errorService.dialog(error);
                    });
                }
                else {
                    cancelFn();
                }
            });
        }
        else {
            cancelFn();
        }
    }
    writeOff() {
        const writeOffFn = () => {
            this.scope.invoke(this.invoice.WriteOff)
                .subscribe((invoked) => {
                this.refresh();
                this.snackBar.open("Successfully written off.", "close", { duration: 5000 });
            }, (error) => {
                this.errorService.dialog(error);
            });
        };
        if (this.scope.session.hasChanges) {
            this.dialogService
                .openConfirm({ message: "Save changes?" })
                .afterClosed().subscribe((confirm) => {
                if (confirm) {
                    this.scope
                        .save()
                        .subscribe((saved) => {
                        this.scope.session.reset();
                        writeOffFn();
                    }, (error) => {
                        this.errorService.dialog(error);
                    });
                }
                else {
                    writeOffFn();
                }
            });
        }
        else {
            writeOffFn();
        }
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
    save() {
        this.scope
            .save()
            .subscribe((saved) => {
            this.router.navigate(["/ar/invoice/" + this.invoice.id]);
        }, (error) => {
            this.errorService.dialog(error);
        });
    }
    receiverSelected(party) {
        const fetch = [
            new framework_1.Fetch({
                id: party.id,
                include: [
                    new framework_1.TreeNode({
                        nodes: [
                            new framework_1.TreeNode({
                                nodes: [
                                    new framework_1.TreeNode({ roleType: this.m.PostalBoundary.Country }),
                                ],
                                roleType: this.m.PostalAddress.PostalBoundary,
                            }),
                        ],
                        roleType: this.m.PartyContactMechanism.ContactMechanism,
                    }),
                ],
                name: "partyContactMechanisms",
                path: new framework_1.Path({ step: this.m.Party.CurrentPartyContactMechanisms }),
            }),
            new framework_1.Fetch({
                id: party.id,
                name: "currentContacts",
                path: new framework_1.Path({ step: this.m.Party.CurrentContacts }),
            }),
        ];
        this.scope
            .load("Pull", new framework_1.PullRequest({ fetch }))
            .subscribe((loaded) => {
            if (this.invoice.BillToCustomer !== this.previousBillToCustomer) {
                this.invoice.ShipToAddress = null;
                this.invoice.ContactPerson = null;
                this.previousBillToCustomer = this.invoice.BillToCustomer;
            }
            const partyContactMechanisms = loaded.collections.partyContactMechanisms;
            this.contactMechanisms = partyContactMechanisms.map((v) => v.ContactMechanism);
            this.contacts = loaded.collections.currentContacts;
        }, (error) => {
            this.errorService.message(error);
            this.goBack();
        });
    }
    refresh() {
        this.refresh$.next(new Date());
    }
    goBack() {
        window.history.back();
    }
};
InvoiceComponent = __decorate([
    core_1.Component({
        template: `
<td-layout-card-over [cardTitle]="title" [cardSubtitle]="subTitle">
  <form #form="ngForm" *ngIf="invoice" (submit)="save()">

    <div class="pad">
      <div *ngIf="invoice.SalesInvoiceState">
        <a-mat-static [object]="invoice" [roleType]="m.SalesInvoice.SalesInvoiceState" display="Name" label="Status"></a-mat-static>
        <button *ngIf="invoice.CanExecuteSend" mat-button type="button" (click)="send()">Send</button>
        <button *ngIf="invoice.CanExecuteSend" mat-button type="button" (click)="cancel()">Cancel</button>
        <button *ngIf="invoice.CanExecuteWriteOff" mat-button type="button" (click)="writeOff()">Write off</button>
      </div>

      <a-mat-static *ngIf="invoice.SalesOrder" [object]="invoice" [roleType]="m.SalesInvoice.SalesOrder"></a-mat-static>
      <a-mat-autocomplete *ngIf="showOrganisations" [object]="invoice" [roleType]="m.SalesInvoice.BillToCustomer" [filter]="organisationsFilter.create()"
        display="Name" (onSelect)="receiverSelected($event)" label="Bill to organisation"></a-mat-autocomplete>
      <a-mat-autocomplete *ngIf="showPeople" [object]="invoice" [roleType]="m.SalesInvoice.BillToCustomer" [filter]="peopleFilter.create()"
        display="displayName" (onSelect)="receiverSelected($event)" label="Bill to person"></a-mat-autocomplete>

      <a-mat-select *ngIf="showOrganisations && !showPeople" [object]="invoice" [roleType]="m.SalesInvoice.ContactPerson" [options]="contacts" display="displayName"></a-mat-select>
      <button *ngIf="showOrganisations && !showPeople" type="button" mat-icon-button (click)="addPerson = true"><mat-icon>add</mat-icon></button>
      <div *ngIf="showOrganisations && addPerson" style="background: lightblue" class="pad">
        <person-inline (cancelled)="personCancelled($event)" (saved)="personAdded($event)">
        </person-inline>
      </div>

      <a-mat-select [object]="invoice" [roleType]="m.SalesInvoice.BillToContactMechanism" [options]="contactMechanisms" display="displayName"></a-mat-select>
      <button *ngIf="invoice.BillToCustomer" type="button" mat-button (click)="addWebAddress = true">+Web</button>
      <button *ngIf="invoice.BillToCustomer" type="button" mat-button (click)="addEmailAddress = true">+Email</button>
      <button *ngIf="invoice.BillToCustomer" type="button" mat-button (click)="addPostalAddress = true">+Postal</button>
      <button *ngIf="invoice.BillToCustomer" type="button" mat-button (click)="addTeleCommunicationsNumber = true">+Telecom</button>

      <div *ngIf="addWebAddress && invoice.BillToCustomer" style="background: lightblue" class="pad">
        <party-contactmechanism-webaddress [scope]="scope" (cancelled)="webAddressCancelled($event)" (saved)="webAddressAdded($event)">
        </party-contactmechanism-webaddress>
      </div>
      <div *ngIf="addEmailAddress && invoice.BillToCustomer" style="background: lightblue" class="pad">
        <party-contactmechanism-emailAddress [scope]="scope" (cancelled)="emailAddressCancelled($event)" (saved)="emailAddressAdded($event)">
        </party-contactmechanism-emailAddress>
      </div>
      <div *ngIf="addPostalAddress && invoice.BillToCustomer" style="background: lightblue" class="pad">
        <party-contactmechanism-postaladdress [scope]="scope" (cancelled)="postalAddressCancelled($event)" (saved)="postalAddressAdded($event)">
        </party-contactmechanism-postaladdress>
      </div>
      <div *ngIf="addTeleCommunicationsNumber && invoice.BillToCustomer" style="background: lightblue" class="pad">
        <party-contactmechanism-telecommunicationsnumber [scope]="scope" (cancelled)="teleCommunicationsNumberCancelled($event)" (saved)="teleCommunicationsNumberAdded($event)">
        </party-contactmechanism-telecommunicationsnumber>
      </div>

      <a-mat-input [object]="invoice" [roleType]="m.SalesInvoice.Description"></a-mat-input>
      <a-mat-select [object]="invoice" [roleType]="m.SalesInvoice.VatRegime" [options]="vatRegimes" display="Name"></a-mat-select>
      <a-mat-static *ngIf="invoice.VatRegime" [object]="invoice.VatRegime" [roleType]="m.VatRegime.VatRate" display="Rate"></a-mat-static>

      <a-mat-static *ngIf="order?.Comment" [object]="order" [roleType]="m.SalesOrder.Comment"></a-mat-static>
      <a-mat-textarea [object]="invoice" [roleType]="m.SalesInvoice.Comment"></a-mat-textarea>
      <a-mat-static *ngIf="order?.InternalComment" [object]="order" [roleType]="m.SalesOrder.InternalComment"></a-mat-static>
      <a-mat-textarea [object]="invoice" [roleType]="m.SalesInvoice.InternalComment"></a-mat-textarea>
      <br/>
      <a-mat-textarea [object]="invoice" [roleType]="m.SalesInvoice.Message"></a-mat-textarea>
    </div>

    <mat-divider></mat-divider>

    <mat-card-actions>
      <button mat-button color="primary" type="submit" [disabled]="!form.form.valid">SAVE</button>
      <button mat-button (click)="goBack()" type="button">CANCEL</button>
    </mat-card-actions>

  </form>
</td-layout-card-over>
`,
    }),
    __metadata("design:paramtypes", [base_angular_1.WorkspaceService,
        base_angular_1.ErrorService,
        router_1.Router,
        router_1.ActivatedRoute,
        material_1.MatSnackBar,
        core_2.TdDialogService,
        core_2.TdMediaService, core_1.ChangeDetectorRef])
], InvoiceComponent);
exports.InvoiceComponent = InvoiceComponent;
