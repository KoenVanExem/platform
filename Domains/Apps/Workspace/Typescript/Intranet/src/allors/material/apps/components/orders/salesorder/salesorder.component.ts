import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';

import { ErrorService, Field, Invoked, Loaded, Saved, Scope, WorkspaceService, DataService, x } from '../../../../../angular';
import { ContactMechanism, Currency, InternalOrganisation, Organisation, OrganisationContactRelationship, OrganisationRole, Party, PartyContactMechanism, Person, PostalAddress, ProductQuote, SalesOrder, Store, VatRate, VatRegime } from '../../../../../domain';
import { Equals, Fetch, PullRequest, Sort, TreeNode } from '../../../../../framework';
import { MetaDomain } from '../../../../../meta';
import { StateService } from '../../../services/StateService';
import { Fetcher } from '../../Fetcher';
import { AllorsMaterialDialogService } from '../../../../base/services/dialog';
import { switchMap } from 'rxjs/operators';

@Component({
  styles: [`
    .tabInlineComponent {
    border-bottom: 1px solid #CCCCCC;
    border-left: 1px solid #CCCCCC;
    border-right: 1px solid #CCCCCC;}
  `],
  templateUrl: './salesorder.component.html',
})
export class SalesOrderEditComponent implements OnInit, OnDestroy {

  public m: MetaDomain;

  public scope: Scope;
  public title: string;
  public subTitle: string;
  public order: SalesOrder;
  public quote: ProductQuote;
  public internalOrganisations: InternalOrganisation[];
  public currencies: Currency[];
  public billToContactMechanisms: ContactMechanism[];
  public billToEndCustomerContactMechanisms: ContactMechanism[];
  public shipToAddresses: ContactMechanism[];
  public shipToEndCustomerAddresses: ContactMechanism[];
  public vatRates: VatRate[];
  public vatRegimes: VatRegime[];
  public billToContacts: Person[];
  public billToEndCustomerContacts: Person[];
  public shipToContacts: Person[];
  public shipToEndCustomerContacts: Person[];
  public stores: Store[];

  public addShipToAddress = false;
  public addBillToContactPerson = false;
  public addBillToEndCustomerContactPerson = false;
  public addShipToContactPerson = false;
  public addShipToEndCustomerContactPerson = false;

  public addShipToContactMechanism: boolean;
  public addBillToContactMechanism: boolean;
  public addBillToEndCustomerContactMechanism: boolean;
  public addShipToEndCustomerAddress: boolean;

  private refresh$: BehaviorSubject<Date>;
  private subscription: Subscription;
  private previousShipToCustomer: Party;
  private previousShipToEndCustomer: Party;
  private previousBillToCustomer: Party;
  private previousBillToEndCustomer: Party;
  private fetcher: Fetcher;

  get showBillToOrganisations(): boolean {
    return !this.order.BillToCustomer || this.order.BillToCustomer.objectType.name === 'Organisation';
  }
  get showBillToPeople(): boolean {
    return !this.order.BillToCustomer || this.order.BillToCustomer.objectType.name === 'Person';
  }

  get showShipToOrganisations(): boolean {
    return !this.order.ShipToCustomer || this.order.ShipToCustomer.objectType.name === 'Organisation';
  }
  get showShipToPeople(): boolean {
    return !this.order.ShipToCustomer || this.order.ShipToCustomer.objectType.name === 'Person';
  }

  get showBillToEndCustomerOrganisations(): boolean {
    return !this.order.BillToEndCustomer || this.order.BillToEndCustomer.objectType.name === 'Organisation';
  }
  get showBillToEndCustomerPeople(): boolean {
    return !this.order.BillToEndCustomer || this.order.BillToEndCustomer.objectType.name === 'Person';
  }

  get showShipToEndCustomerOrganisations(): boolean {
    return !this.order.ShipToEndCustomer || this.order.ShipToEndCustomer.objectType.name === 'Organisation';
  }
  get showShipToEndCustomerPeople(): boolean {
    return !this.order.ShipToEndCustomer || this.order.ShipToEndCustomer.objectType.name === 'Person';
  }

  constructor(
    private workspaceService: WorkspaceService,
    private dataService: DataService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialogService: AllorsMaterialDialogService,
    public stateService: StateService) {

    this.scope = this.workspaceService.createScope();
    this.m = this.workspaceService.metaPopulation.metaDomain;

    this.refresh$ = new BehaviorSubject<Date>(undefined);
    this.fetcher = new Fetcher(this.stateService, this.dataService);
  }

  public ngOnInit(): void {

    const { m, pull } = this.dataService;

    this.subscription = combineLatest(this.route.url, this.refresh$, this.stateService.internalOrganisationId$)
      .pipe(
        switchMap(([urlSegments, date, internalOrganisationId]) => {

          const id: string = this.route.snapshot.paramMap.get('id');

          const pulls = [
            pull.VatRate(),
            pull.VatRegime(),
            pull.Currency({ sort: new Sort(m.CommunicationEventPurpose.Name) }),
            pull.Store({
              predicate: new Equals({ propertyType: m.Store.InternalOrganisation, value: internalOrganisationId }),
              include: { BillingProcess: x },
              sort: new Sort(m.Store.Name)
            }),
            pull.Organisation({
              predicate: new Equals({ propertyType: m.Organisation.IsInternalOrganisation, value: true }),
              sort: new Sort(m.Organisation.PartyName),
            })
          ];

          return this.scope
            .load('Pull', new PullRequest({ pulls }))
            .pipe(
              switchMap((loaded) => {
                this.scope.session.reset();
                this.vatRates = loaded.collections.VatRates as VatRate[];
                this.vatRegimes = loaded.collections.VatRegimes as VatRegime[];
                this.stores = loaded.collections.stores as Store[];
                this.currencies = loaded.collections.currencies as Currency[];
                this.internalOrganisations = loaded.collections.internalOrganisations as InternalOrganisation[];

                const pulls2 = [
                  this.fetcher.internalOrganisation,
                  pull.SalesOrder({
                    object: id,
                    include: {
                      ShipToCustomer: x,
                      ShipToAddress: x,
                      ShipToContactPerson: x,
                      SalesOrderState: x,
                      BillToContactMechanism: x,
                      BillToContactPerson: x,
                      BillToEndCustomerContactMechanism: x,
                      BillToEndCustomerContactPerson: x,
                      ShipToEndCustomer: x,
                      ShipToEndCustomerAddress: x,
                      ShipToEndCustomerContactPerson: x,
                      VatRegime: {
                        VatRate: x,
                      }
                    }
                  })
                ];

                return this.scope.load('Pull', new PullRequest({ pulls: pulls2 }));
              })
            );
        })
      )
      .subscribe((loaded) => {
        this.order = loaded.objects.salesOrder as SalesOrder;
        const internalOrganisation = loaded.objects.internalOrganisation as InternalOrganisation;

        if (!this.order) {
          this.order = this.scope.session.create('SalesOrder') as SalesOrder;
          this.order.TakenBy = internalOrganisation;

          if (this.stores.length === 1) {
            this.order.Store = this.stores[0];
          }

          this.title = 'Add Sales Order';
        } else {
          this.title = 'Sales Order ' + this.order.OrderNumber;
        }

        if (this.order.ShipToCustomer) {
          this.updateShipToCustomer(this.order.ShipToCustomer);
        }

        if (this.order.BillToCustomer) {
          this.updateBillToCustomer(this.order.BillToCustomer);
        }

        if (this.order.BillToEndCustomer) {
          this.updateBillToEndCustomer(this.order.BillToEndCustomer);
        }

        if (this.order.ShipToEndCustomer) {
          this.updateShipToEndCustomer(this.order.ShipToEndCustomer);
        }

        this.previousShipToCustomer = this.order.ShipToCustomer;
        this.previousShipToEndCustomer = this.order.ShipToEndCustomer;
        this.previousBillToCustomer = this.order.BillToCustomer;
        this.previousBillToEndCustomer = this.order.BillToEndCustomer;
      },
        (error: Error) => {
          this.errorService.handle(error);
          this.goBack();
        },
      );
  }

  public billToContactPersonCancelled(): void {
    this.addBillToContactPerson = false;
  }

  public billToContactPersonAdded(id: string): void {
    this.addBillToContactPerson = false;

    const contact: Person = this.scope.session.get(id) as Person;

    const organisationContactRelationship = this.scope.session.create('OrganisationContactRelationship') as OrganisationContactRelationship;
    organisationContactRelationship.Organisation = this.order.BillToCustomer as Organisation;
    organisationContactRelationship.Contact = contact;

    this.billToContacts.push(contact);
    this.order.BillToContactPerson = contact;
  }

  public billToEndCustomerContactPersonCancelled(): void {
    this.addBillToEndCustomerContactPerson = false;
  }

  public billToEndCustomerContactPersonAdded(id: string): void {
    this.addBillToEndCustomerContactPerson = false;

    const contact: Person = this.scope.session.get(id) as Person;

    const organisationContactRelationship = this.scope.session.create('OrganisationContactRelationship') as OrganisationContactRelationship;
    organisationContactRelationship.Organisation = this.order.BillToEndCustomer as Organisation;
    organisationContactRelationship.Contact = contact;

    this.billToEndCustomerContacts.push(contact);
    this.order.BillToEndCustomerContactPerson = contact;
  }

  public shipToContactPersonCancelled(): void {
    this.addShipToContactPerson = false;
  }

  public shipToContactPersonAdded(id: string): void {
    this.addShipToContactPerson = false;

    const contact: Person = this.scope.session.get(id) as Person;

    const organisationContactRelationship = this.scope.session.create('OrganisationContactRelationship') as OrganisationContactRelationship;
    organisationContactRelationship.Organisation = this.order.ShipToCustomer as Organisation;
    organisationContactRelationship.Contact = contact;

    this.shipToContacts.push(contact);
    this.order.ShipToContactPerson = contact;
  }

  public shipToEndCustomerContactPersonCancelled(): void {
    this.addShipToEndCustomerContactPerson = false;
  }

  public shipToEndCustomerContactPersonAdded(id: string): void {
    this.addShipToEndCustomerContactPerson = false;

    const contact: Person = this.scope.session.get(id) as Person;

    const organisationContactRelationship = this.scope.session.create('OrganisationContactRelationship') as OrganisationContactRelationship;
    organisationContactRelationship.Organisation = this.order.ShipToEndCustomer as Organisation;
    organisationContactRelationship.Contact = contact;

    this.shipToEndCustomerContacts.push(contact);
    this.order.ShipToEndCustomerContactPerson = contact;
  }

  public billToContactMechanismCancelled() {
    this.addBillToContactMechanism = false;
  }

  public billToContactMechanismAdded(partyContactMechanism: PartyContactMechanism): void {
    this.addBillToContactMechanism = false;

    this.billToContactMechanisms.push(partyContactMechanism.ContactMechanism);
    this.order.BillToCustomer.AddPartyContactMechanism(partyContactMechanism);
    this.order.BillToContactMechanism = partyContactMechanism.ContactMechanism;
  }

  public billToEndCustomerContactMechanismCancelled() {
    this.addBillToEndCustomerContactMechanism = false;
  }

  public billToEndCustomerContactMechanismAdded(partyContactMechanism: PartyContactMechanism): void {
    this.addBillToEndCustomerContactMechanism = false;

    this.billToEndCustomerContactMechanisms.push(partyContactMechanism.ContactMechanism);
    this.order.BillToEndCustomer.AddPartyContactMechanism(partyContactMechanism);
    this.order.BillToEndCustomerContactMechanism = partyContactMechanism.ContactMechanism;
  }

  public shipToAddressCancelled(): void {
    this.addShipToAddress = false;
  }

  public shipToAddressAdded(partyContactMechanism: PartyContactMechanism): void {
    this.addShipToAddress = false;

    this.shipToAddresses.push(partyContactMechanism.ContactMechanism);
    this.order.ShipToCustomer.AddPartyContactMechanism(partyContactMechanism);
    this.order.ShipToAddress = partyContactMechanism.ContactMechanism as PostalAddress;
  }

  public shipToEndCustomerAddressCancelled() {
    this.addShipToEndCustomerAddress = false;
  }

  public shipToEndCustomerAddressAdded(partyContactMechanism: PartyContactMechanism): void {
    this.addShipToEndCustomerAddress = false;

    this.shipToEndCustomerAddresses.push(partyContactMechanism.ContactMechanism);
    this.order.ShipToEndCustomer.AddPartyContactMechanism(partyContactMechanism);
    this.order.ShipToEndCustomerAddress = partyContactMechanism.ContactMechanism as PostalAddress;
  }

  public approve(): void {
    const submitFn: () => void = () => {
      this.scope.invoke(this.order.Approve)
        .subscribe((invoked: Invoked) => {
          this.refresh();
          this.snackBar.open('Successfully approved.', 'close', { duration: 5000 });
        },
          (error: Error) => {
            this.errorService.handle(error);
          });
    };

    if (this.scope.session.hasChanges) {
      this.dialogService
        .confirm({ message: 'Save changes?' })
        .subscribe((confirm: boolean) => {
          if (confirm) {
            this.scope
              .save()
              .subscribe((saved: Saved) => {
                this.scope.session.reset();
                submitFn();
              },
                (error: Error) => {
                  this.errorService.handle(error);
                });
          } else {
            submitFn();
          }
        });
    } else {
      submitFn();
    }
  }

  public cancel(): void {
    const cancelFn: () => void = () => {
      this.scope.invoke(this.order.Reject)
        .subscribe((invoked: Invoked) => {
          this.refresh();
          this.snackBar.open('Successfully cancelled.', 'close', { duration: 5000 });
        },
          (error: Error) => {
            this.errorService.handle(error);
          });
    };

    if (this.scope.session.hasChanges) {
      this.dialogService
        .confirm({ message: 'Save changes?' })
        .subscribe((confirm: boolean) => {
          if (confirm) {
            this.scope
              .save()
              .subscribe((saved: Saved) => {
                this.scope.session.reset();
                cancelFn();
              },
                (error: Error) => {
                  this.errorService.handle(error);
                });
          } else {
            cancelFn();
          }
        });
    } else {
      cancelFn();
    }
  }

  public reject(): void {
    const rejectFn: () => void = () => {
      this.scope.invoke(this.order.Reject)
        .subscribe((invoked: Invoked) => {
          this.refresh();
          this.snackBar.open('Successfully rejected.', 'close', { duration: 5000 });
        },
          (error: Error) => {
            this.errorService.handle(error);
          });
    };

    if (this.scope.session.hasChanges) {
      this.dialogService
        .confirm({ message: 'Save changes?' })
        .subscribe((confirm: boolean) => {
          if (confirm) {
            this.scope
              .save()
              .subscribe((saved: Saved) => {
                this.scope.session.reset();
                rejectFn();
              },
                (error: Error) => {
                  this.errorService.handle(error);
                });
          } else {
            rejectFn();
          }
        });
    } else {
      rejectFn();
    }
  }

  public hold(): void {
    const holdFn: () => void = () => {
      this.scope.invoke(this.order.Hold)
        .subscribe((invoked: Invoked) => {
          this.refresh();
          this.snackBar.open('Successfully put on hold.', 'close', { duration: 5000 });
        },
          (error: Error) => {
            this.errorService.handle(error);
          });
    };

    if (this.scope.session.hasChanges) {
      this.dialogService
        .confirm({ message: 'Save changes?' })
        .subscribe((confirm: boolean) => {
          if (confirm) {
            this.scope
              .save()
              .subscribe((saved: Saved) => {
                this.scope.session.reset();
                holdFn();
              },
                (error: Error) => {
                  this.errorService.handle(error);
                });
          } else {
            holdFn();
          }
        });
    } else {
      holdFn();
    }
  }

  public continue(): void {
    const continueFn: () => void = () => {
      this.scope.invoke(this.order.Continue)
        .subscribe((invoked: Invoked) => {
          this.refresh();
          this.snackBar.open('Successfully removed from hold.', 'close', { duration: 5000 });
        },
          (error: Error) => {
            this.errorService.handle(error);
          });
    };

    if (this.scope.session.hasChanges) {
      this.dialogService
        .confirm({ message: 'Save changes?' })
        .subscribe((confirm: boolean) => {
          if (confirm) {
            this.scope
              .save()
              .subscribe((saved: Saved) => {
                this.scope.session.reset();
                continueFn();
              },
                (error: Error) => {
                  this.errorService.handle(error);
                });
          } else {
            continueFn();
          }
        });
    } else {
      continueFn();
    }
  }

  public confirm(): void {
    const confirmFn: () => void = () => {
      this.scope.invoke(this.order.Confirm)
        .subscribe((invoked: Invoked) => {
          this.refresh();
          this.snackBar.open('Successfully confirmed.', 'close', { duration: 5000 });
        },
          (error: Error) => {
            this.errorService.handle(error);
          });
    };

    if (this.scope.session.hasChanges) {
      this.dialogService
        .confirm({ message: 'Save changes?' })
        .subscribe((confirm: boolean) => {
          if (confirm) {
            this.scope
              .save()
              .subscribe((saved: Saved) => {
                this.scope.session.reset();
                confirmFn();
              },
                (error: Error) => {
                  this.errorService.handle(error);
                });
          } else {
            confirmFn();
          }
        });
    } else {
      confirmFn();
    }
  }

  public finish(): void {
    const finishFn: () => void = () => {
      this.scope.invoke(this.order.Continue)
        .subscribe((invoked: Invoked) => {
          this.refresh();
          this.snackBar.open('Successfully finished.', 'close', { duration: 5000 });
        },
          (error: Error) => {
            this.errorService.handle(error);
          });
    };

    if (this.scope.session.hasChanges) {
      this.dialogService
        .confirm({ message: 'Save changes?' })
        .subscribe((confirm: boolean) => {
          if (confirm) {
            this.scope
              .save()
              .subscribe((saved: Saved) => {
                this.scope.session.reset();
                finishFn();
              },
                (error: Error) => {
                  this.errorService.handle(error);
                });
          } else {
            finishFn();
          }
        });
    } else {
      finishFn();
    }
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public save(): void {

    this.scope
      .save()
      .subscribe((saved: Saved) => {
        this.router.navigate(['/orders/salesOrder/' + this.order.id]);
      },
        (error: Error) => {
          this.errorService.handle(error);
        });
  }

  public shipToCustomerSelected(party: Party) {
    if (party) {
      this.updateShipToCustomer(party);
    }
  }

  public billToCustomerSelected(party: Party) {
    this.updateBillToCustomer(party);
  }

  public billToEndCustomerSelected(party: Party) {
    this.updateBillToEndCustomer(party);
  }

  public shipToEndCustomerSelected(party: Party) {
    this.updateShipToEndCustomer(party);
  }

  public refresh(): void {
    this.refresh$.next(new Date());
  }

  public goBack(): void {
    window.history.back();
  }

  private updateShipToCustomer(party: Party): void {

    const { m, pull } = this.dataService;

    const pulls = [
      pull.Party(
        {
          object: party,
          fetch: {
            CurrentPartyContactMechanisms: {
              include: {
                ContactMechanism: {
                  PostalAddress_PostalBoundary: {
                    Country: x
                  }
                }
              }
            }
          }
        }
      ),
      pull.Party({
        object: party,
        fetch: {
          CurrentContacts: x,
        }
      }),
    ];

    this.scope
      .load('Pull', new PullRequest({ pulls }))
      .subscribe((loaded) => {

        if (this.order.ShipToCustomer !== this.previousShipToCustomer) {
          this.order.ShipToAddress = null;
          this.order.ShipToContactPerson = null;
          this.previousShipToCustomer = this.order.ShipToCustomer;
        }

        if (this.order.ShipToCustomer !== null && this.order.BillToCustomer === null) {
          this.order.BillToCustomer = this.order.ShipToCustomer;
          this.updateBillToCustomer(this.order.ShipToCustomer);
        }

        const partyContactMechanisms: PartyContactMechanism[] = loaded.collections.partyContactMechanisms as PartyContactMechanism[];
        this.shipToAddresses = partyContactMechanisms.filter((v: PartyContactMechanism) => v.ContactMechanism.objectType.name === 'PostalAddress').map((v: PartyContactMechanism) => v.ContactMechanism);
        this.shipToContacts = loaded.collections.currentContacts as Person[];
      },
        (error: Error) => {
          this.errorService.handle(error);
          this.goBack();
        },
      );
  }

  private updateBillToCustomer(party: Party) {

    const { m, pull } = this.dataService;

    const pulls = [
      pull.Party(
        {
          object: party,
          fetch: {
            CurrentPartyContactMechanisms: {
              include: {
                ContactMechanism: {
                  PostalAddress_PostalBoundary: {
                    Country: x,
                  }
                }
              }
            }
          }
        }
      ),
      pull.Party(
        {
          object: party,
          fetch: {
            CurrentContacts: x,
          }
        }
      )
    ];

    this.scope
      .load('Pull', new PullRequest({ pulls }))
      .subscribe((loaded) => {

        if (this.order.BillToCustomer !== this.previousBillToCustomer) {
          this.order.BillToContactMechanism = null;
          this.order.BillToContactPerson = null;
          this.previousBillToCustomer = this.order.BillToCustomer;
        }

        if (this.order.BillToCustomer !== null && this.order.ShipToCustomer === null) {
          this.order.ShipToCustomer = this.order.BillToCustomer;
          this.updateShipToCustomer(this.order.ShipToCustomer);
        }

        const partyContactMechanisms: PartyContactMechanism[] = loaded.collections.partyContactMechanisms as PartyContactMechanism[];
        this.billToContactMechanisms = partyContactMechanisms.map((v: PartyContactMechanism) => v.ContactMechanism);
        this.billToContacts = loaded.collections.currentContacts as Person[];
      },
        (error: Error) => {
          this.errorService.handle(error);
          this.goBack();
        },
      );
  }

  private updateBillToEndCustomer(party: Party) {

    const { m, pull } = this.dataService;

    const pulls = [
      pull.Party(
        {
          object: party,
          fetch: {
            CurrentPartyContactMechanisms: {
              include: {
                ContactMechanism: {
                  PostalAddress_PostalBoundary: {
                    Country: x,
                  }
                }
              }
            }
          }
        }
      ),
      pull.Party(
        {
          object: party,
          fetch: {
            CurrentContacts: x
          }
        }
      )
    ];

    this.scope
      .load('Pull', new PullRequest({ pulls }))
      .subscribe((loaded) => {

        if (this.order.BillToEndCustomer !== this.previousBillToEndCustomer) {
          this.order.BillToEndCustomerContactMechanism = null;
          this.order.BillToEndCustomerContactPerson = null;
          this.previousBillToEndCustomer = this.order.BillToEndCustomer;
        }

        if (this.order.BillToEndCustomer !== null && this.order.ShipToEndCustomer === null) {
          this.order.ShipToEndCustomer = this.order.BillToEndCustomer;
          this.updateShipToEndCustomer(this.order.ShipToEndCustomer);
        }

        const partyContactMechanisms: PartyContactMechanism[] = loaded.collections.partyContactMechanisms as PartyContactMechanism[];
        this.billToEndCustomerContactMechanisms = partyContactMechanisms.map((v: PartyContactMechanism) => v.ContactMechanism);
        this.billToEndCustomerContacts = loaded.collections.currentContacts as Person[];
      },
        (error: Error) => {
          this.errorService.handle(error);
          this.goBack();
        },
      );
  }

  private updateShipToEndCustomer(party: Party) {

    const { m, pull } = this.dataService;

    const pulls = [
      pull.Party(
        {
          object: party,
          fetch: {
            CurrentPartyContactMechanisms: {
              include: {
                ContactMechanism: {
                  PostalAddress_PostalBoundary: {
                    Country: x,
                  }
                }
              }
            }
          }
        }
      ),
      pull.Party({
        object: party,
        fetch: {
          CurrentContacts: x,
        }
      })
    ];

    this.scope
      .load('Pull', new PullRequest({ pulls }))
      .subscribe((loaded) => {

        if (this.order.ShipToEndCustomer !== this.previousShipToEndCustomer) {
          this.order.ShipToEndCustomerAddress = null;
          this.order.ShipToEndCustomerContactPerson = null;
          this.previousShipToEndCustomer = this.order.ShipToEndCustomer;
        }

        if (this.order.ShipToEndCustomer !== null && this.order.BillToEndCustomer === null) {
          this.order.BillToEndCustomer = this.order.ShipToEndCustomer;
          this.updateBillToEndCustomer(this.order.BillToEndCustomer);
        }

        const partyContactMechanisms: PartyContactMechanism[] = loaded.collections.partyContactMechanisms as PartyContactMechanism[];
        this.shipToEndCustomerAddresses = partyContactMechanisms.filter((v: PartyContactMechanism) => v.ContactMechanism.objectType.name === 'PostalAddress').map((v: PartyContactMechanism) => v.ContactMechanism);
        this.shipToEndCustomerContacts = loaded.collections.currentContacts as Person[];
      },
        (error: Error) => {
          this.errorService.handle(error);
          this.goBack();
        },
      );
  }
}
