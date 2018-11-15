import { Component, OnDestroy, OnInit, Self } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';

import { ErrorService, Invoked, Saved, Scope, x, Allors, NavigationService, NavigationActivatedRoute } from '../../../../../../angular';
import { CommunicationEventPurpose, ContactMechanism, InternalOrganisation, LetterCorrespondence, Organisation, OrganisationContactRelationship, Party, PartyContactMechanism, Person, PostalAddress } from '../../../../../../domain';
import { PullRequest, Sort, Equals } from '../../../../../../framework';
import { MetaDomain } from '../../../../../../meta';
import { StateService } from '../../../../services/state';
import { AllorsMaterialDialogService } from '../../../../../base/services/dialog';
import { switchMap, map } from 'rxjs/operators';

@Component({
  templateUrl: './lettercorrespondence-edit.component.html',
  providers: [Allors]
})
export class EditLetterCorrespondenceComponent
  implements OnInit, OnDestroy {
  public scope: Scope;
  public title = 'Letter Correspondence';

  public addSender = false;
  public addReceiver = false;
  public addAddress = false;

  public m: MetaDomain;

  public party: Party;
  public person: Person;
  public organisation: Organisation;
  public purposes: CommunicationEventPurpose[];
  public contacts: Party[] = [];

  public postalAddresses: ContactMechanism[] = [];

  public communicationEvent: LetterCorrespondence;

  private refresh$: BehaviorSubject<Date>;
  private subscription: Subscription;

  constructor(
    @Self() private allors: Allors,
    public navigation: NavigationService,
    private errorService: ErrorService,
    private dialogService: AllorsMaterialDialogService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private stateService: StateService
  ) {
    this.m = this.allors.m;
    this.refresh$ = new BehaviorSubject<Date>(undefined);
  }

  get PartyIsOrganisation(): boolean {
    return this.party.objectType.name === 'Organisation';
  }

  public ngOnInit(): void {

    const { m, pull, scope } = this.allors;

    this.subscription = combineLatest(this.route.url, this.refresh$, this.stateService.internalOrganisationId$)
      .pipe(
        switchMap(([urlSegments, date, internalOrganisationId]) => {
          const navRoute = new NavigationActivatedRoute(this.route);
          const id = navRoute.param();
          const personId = navRoute.queryParam(m.Person);
          const organisationId = navRoute.queryParam(m.Organisation);

          let pulls = [
            pull.Organisation({
              object: internalOrganisationId,
              name: 'InternalOrganisation',
              include: {
                ActiveEmployees: {
                  CurrentPartyContactMechanisms: {
                    ContactMechanism: {
                      PostalAddress_PostalBoundary: {
                        Country: x,
                      }
                    },
                  }
                }
              }
            }),
            pull.CommunicationEventPurpose({
              predicate: new Equals({ propertyType: m.CommunicationEventPurpose.IsActive, value: true }),
              sort: new Sort(m.CommunicationEventPurpose.Name)
            }),
          ];

          const add = !id;

          if (add) {
            if (!!organisationId) {
              pulls = [
                ...pulls,
                pull.Organisation({
                  object: organisationId,
                  include: {
                    CurrentContacts: x,
                    CurrentPartyContactMechanisms: {
                      ContactMechanism: {
                        PostalAddress_PostalBoundary: {
                          Country: x,
                        }
                      },
                    }
                  }
                }
                )
              ];
            }

            if (!!personId) {
              pulls = [
                ...pulls,
                pull.Person({
                  object: personId,
                }),
                pull.Person({
                  object: personId,
                  fetch: {
                    OrganisationContactRelationshipsWhereContact: {
                      Organisation: {
                        include: {
                          CurrentContacts: x,
                          CurrentPartyContactMechanisms: {
                            ContactMechanism: {
                              PostalAddress_PostalBoundary: {
                                Country: x,
                              }
                            },
                          }
                        }
                      }
                    }
                  }
                })
              ];
            }

          } else {
            pulls = [
              ...pulls,
              pull.LetterCorrespondence({
                object: id,
                include: {
                  Originators: x,
                  Receivers: x,
                  PostalAddresses: {
                    PostalBoundary: {
                      Country: x,
                    }
                  }
                }
              }),
            ];
          }

          return scope
            .load('Pull', new PullRequest({ pulls }))
            .pipe(
              map((loaded) => ({ loaded, add }))
            );
        })
      )
      .subscribe(({ loaded, add }) => {
        scope.session.reset();

        this.purposes = loaded.collections.CommunicationEventPurposes as CommunicationEventPurpose[];
        const internalOrganisation = loaded.objects.InternalOrganisation as InternalOrganisation;
        this.postalAddresses = internalOrganisation.ActiveEmployees
          .map((v) => v.CurrentPartyContactMechanisms
            .filter((w) => w && w.ContactMechanism.objectType === m.EmailAddress._objectType)
            .map((w) => w.ContactMechanism as PostalAddress))
          .reduce((acc, v) => acc.concat(v), []);

        if (add) {
          this.person = loaded.objects.Person as Person;
          this.organisation = loaded.objects.Organisation as Organisation;
          if (!this.organisation && loaded.collections.Organisations && loaded.collections.Organisations.length > 0) {
            // TODO: check active
            this.organisation = loaded.collections.Organisations[0] as Organisation;
          }

          this.party = this.organisation || this.person;

          this.contacts = this.contacts.concat(internalOrganisation.ActiveEmployees);
          this.contacts = this.contacts.concat(this.organisation.CurrentContacts);
          if (!!this.person) {
            this.contacts.push(this.person);
          }

          this.communicationEvent = scope.session.create('LetterCorrespondence') as LetterCorrespondence;
          this.communicationEvent.IncomingLetter = true;

        } else {
          this.communicationEvent = loaded.objects.LetterCorrespondence as LetterCorrespondence;
        }

        if (!this.communicationEvent) {
          this.communicationEvent = scope.session.create('LetterCorrespondence') as LetterCorrespondence;
          this.communicationEvent.IncomingLetter = true;
        }
      },
        (error: any) => {
          this.errorService.handle(error);
          this.goBack();
        }
      );
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public senderCancelled(): void {
    this.addSender = false;
  }

  public receiverCancelled(): void {
    this.addReceiver = false;
  }

  public addressCancelled(): void {
    this.addAddress = false;
  }

  public senderAdded(id: string): void {
    const { scope } = this.allors;

    this.addSender = false;

    const sender: Person = scope.session.get(id) as Person;
    const relationShip: OrganisationContactRelationship = scope.session.create('OrganisationContactRelationship') as OrganisationContactRelationship;
    relationShip.Contact = sender;
    relationShip.Organisation = this.organisation;

    this.communicationEvent.AddOriginator(sender);
  }

  public receiverAdded(id: string): void {
    const { scope } = this.allors;

    this.addReceiver = false;

    const receiver: Person = scope.session.get(id) as Person;
    const relationShip: OrganisationContactRelationship = scope.session.create('OrganisationContactRelationship') as OrganisationContactRelationship;
    relationShip.Contact = receiver;
    relationShip.Organisation = this.organisation;

    this.communicationEvent.AddReceiver(receiver);
  }

  public addressAdded(partyContactMechanism: PartyContactMechanism): void {
    this.addAddress = false;

    this.party.AddPartyContactMechanism(partyContactMechanism);

    const postalAddress = partyContactMechanism.ContactMechanism as PostalAddress;
    this.postalAddresses.push(postalAddress);
    this.communicationEvent.AddPostalAddress(postalAddress);
  }

  public cancel(): void {
    const { scope } = this.allors;

    const cancelFn: () => void = () => {
      scope.invoke(this.communicationEvent.Cancel).subscribe(
        (invoked: Invoked) => {
          this.refresh();
          this.snackBar.open('Successfully cancelled.', 'close', {
            duration: 5000
          });
        },
        (error: Error) => {
          this.errorService.handle(error);
        }
      );
    };

    if (scope.session.hasChanges) {
      this.dialogService
        .confirm({ message: 'Save changes?' })
        .subscribe((confirm: boolean) => {
          if (confirm) {
            scope.save().subscribe(
              (saved: Saved) => {
                scope.session.reset();
                cancelFn();
              },
              (error: Error) => {
                this.errorService.handle(error);
              }
            );
          } else {
            cancelFn();
          }
        });
    } else {
      cancelFn();
    }
  }

  public close(): void {
    const { scope } = this.allors;

    const cancelFn: () => void = () => {
      scope.invoke(this.communicationEvent.Close).subscribe(
        (invoked: Invoked) => {
          this.refresh();
          this.snackBar.open('Successfully closed.', 'close', {
            duration: 5000
          });
        },
        (error: Error) => {
          this.errorService.handle(error);
        }
      );
    };

    if (scope.session.hasChanges) {
      this.dialogService
        .confirm({ message: 'Save changes?' })
        .subscribe((confirm: boolean) => {
          if (confirm) {
            scope.save().subscribe(
              (saved: Saved) => {
                scope.session.reset();
                cancelFn();
              },
              (error: Error) => {
                this.errorService.handle(error);
              }
            );
          } else {
            cancelFn();
          }
        });
    } else {
      cancelFn();
    }
  }

  public reopen(): void {
    const { scope } = this.allors;

    const cancelFn: () => void = () => {
      scope.invoke(this.communicationEvent.Reopen).subscribe(
        (invoked: Invoked) => {
          this.refresh();
          this.snackBar.open('Successfully reopened.', 'close', {
            duration: 5000
          });
        },
        (error: Error) => {
          this.errorService.handle(error);
        }
      );
    };

    if (scope.session.hasChanges) {
      this.dialogService
        .confirm({ message: 'Save changes?' })
        .subscribe((confirm: boolean) => {
          if (confirm) {
            scope.save().subscribe(
              (saved: Saved) => {
                scope.session.reset();
                cancelFn();
              },
              (error: Error) => {
                this.errorService.handle(error);
              }
            );
          } else {
            cancelFn();
          }
        });
    } else {
      cancelFn();
    }
  }

  public save(): void {
    const { scope } = this.allors;

    scope.save().subscribe(
      (saved: Saved) => {
        this.goBack();
      },
      (error: Error) => {
        this.errorService.handle(error);
      }
    );
  }

  public refresh(): void {
    this.refresh$.next(new Date());
  }

  public goBack(): void {
    window.history.back();
  }
}
