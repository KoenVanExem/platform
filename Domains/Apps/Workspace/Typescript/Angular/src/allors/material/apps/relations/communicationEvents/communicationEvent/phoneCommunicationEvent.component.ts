import { Observable, Subject, Subscription } from 'rxjs/Rx';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { TdMediaService } from '@covalent/core';

import { MetaDomain } from '../../../../../meta/index';
import { PullRequest, PushResponse, Fetch, Path, Query, Equals, Like, TreeNode, Sort, Page } from '../../../../../domain';
import {
  Person, Party, PartyRelationship, CommunicationEvent, CommunicationEventPurpose, TelecommunicationsNumber,
  PersonRole, Locale, Enumeration, PhoneCommunication, Singleton, ContactMechanism, PartyContactMechanism, OrganisationContactRelationship, Organisation,
} from '../../../../../domain';
import { AllorsService, ErrorService, Scope, Loaded, Saved, Invoked, Filter } from '../../../../../angular';

@Component({
  templateUrl: './phoneCommunicationEvent.component.html',
})
export class PhoneCommunicationEventFormComponent implements OnInit, AfterViewInit, OnDestroy {

  private subscription: Subscription;
  private scope: Scope;

  addCaller: boolean = false;
  addReceiver: boolean = false;

  flex: string = '100%';
  flex2: string = `calc(50%-25px)`;

  m: MetaDomain;

  singleton: Singleton;
  communicationEvent: PhoneCommunication;
  employees: Person[];
  contacts: Party[] = [];
  party: Party;
  purposes: CommunicationEventPurpose[];
  partyRelationships: PartyRelationship[];
  caller: Person;
  receiver: Person;
  phonenumbers: ContactMechanism[] = [];

  constructor(
    private allors: AllorsService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private snackBar: MdSnackBar,
    public media: TdMediaService) {

    this.scope = new Scope(allors.database, allors.workspace);
    this.m = this.allors.meta;
  }

  personAdd(): void {
    this.addCaller = true;
  }

  ngOnInit(): void {
    this.subscription = this.route.url
      .switchMap((url: any) => {

        const partyId: string = this.route.snapshot.paramMap.get('partyId');
        const id: string = this.route.snapshot.paramMap.get('id');

        const m: MetaDomain = this.allors.meta;

        const fetch: Fetch[] = [
          new Fetch({
            name: 'party',
            id: partyId,
            include: [
              new TreeNode({ roleType: m.Party.CurrentContacts }),
              new TreeNode({
                roleType: m.Party.CurrentPartyContactMechanisms,
                nodes: [
                  new TreeNode({ roleType: m.PartyContactMechanism.ContactMechanism }),
                ],
              }),
            ],
          }),
          new Fetch({
            name: 'partyRelationships',
            id: partyId,
            path: new Path({ step: m.Party.CurrentPartyRelationships }),
            include: [
              new TreeNode({ roleType: m.PartyRelationship.CommunicationEvents }),
            ],
          }),
          new Fetch({
            name: 'communicationEvent',
            id: id,
            include: [
              new TreeNode({ roleType: m.CommunicationEvent.FromParties }),
              new TreeNode({ roleType: m.CommunicationEvent.ToParties }),
              new TreeNode({ roleType: m.CommunicationEvent.EventPurposes }),
              new TreeNode({ roleType: m.CommunicationEvent.CurrentObjectState }),
            ],
          }),
        ];

        const query: Query[] = [
          new Query(
            {
              name: 'singletons',
              objectType: this.m.Singleton,
              include: [
                new TreeNode({
                  roleType: m.Singleton.DefaultInternalOrganisation,
                  nodes: [
                    new TreeNode({
                      roleType: m.InternalOrganisation.Employees,
                    }),
                  ],
                }),
              ],
            }),
          new Query(
            {
              name: 'purposes',
              objectType: this.m.CommunicationEventPurpose,
            }),
        ];

        this.scope.session.reset();

        return this.scope
          .load('Pull', new PullRequest({ fetch: fetch, query: query }));
      })
      .subscribe((loaded: Loaded) => {

        this.partyRelationships = loaded.collections.partyRelationships as PartyRelationship[];
        this.communicationEvent = loaded.objects.communicationEvent as PhoneCommunication;

        if (!this.communicationEvent) {
          this.communicationEvent = this.scope.session.create('PhoneCommunication') as PhoneCommunication;
          this.partyRelationships.forEach((v: PartyRelationship) => v.AddCommunicationEvent(this.communicationEvent));
        }

        this.party = loaded.objects.party as Party;

        let contactMechanisms: ContactMechanism[] = this.party.CurrentPartyContactMechanisms.map((v: PartyContactMechanism) => v.ContactMechanism);
        for (let contactMechanism of contactMechanisms) {
          if (contactMechanism instanceof (TelecommunicationsNumber)) {
            this.phonenumbers.push(contactMechanism);
          }
        }

        this.singleton = loaded.collections.singletons[0] as Singleton;
        this.employees = this.singleton.DefaultInternalOrganisation.Employees;
        this.purposes = loaded.collections.purposes as CommunicationEventPurpose[];

        this.contacts.push(this.party);
        if (this.employees.length > 0) {
          this.contacts = this.contacts.concat(this.employees);
        }

        if (this.party.CurrentContacts.length > 0) {
          this.contacts = this.contacts.concat(this.party.CurrentContacts);
        }
      },
      (error: any) => {
        this.errorService.message(error);
        this.goBack();
      },
    );
  }

  ngAfterViewInit(): void {
    this.media.broadcast();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  callerCancelled(): void {
    this.addCaller = false;
  }

  callerAdded(id: string): void {
    this.addCaller = false;

    const caller: Person = this.scope.session.get(id) as Person;
    const relationShip: OrganisationContactRelationship = this.scope.session.create('OrganisationContactRelationship') as OrganisationContactRelationship;
    relationShip.Contact = caller;
    relationShip.Organisation = this.party as Organisation;

    this.communicationEvent.AddCaller(caller);
  }

  cancel(): void {
    this.scope.invoke(this.communicationEvent.Cancel)
      .subscribe((invoked: Invoked) => {
        this.snackBar.open('Successfully cancelled.', 'close', { duration: 5000 });
      },
      (error: Error) => {
        this.errorService.dialog(error);
      });
  }

  save(): void {

    this.scope
      .save()
      .subscribe((saved: Saved) => {
        this.goBack();
      },
      (error: Error) => {
        this.errorService.dialog(error);
      });
  }

  goBack(): void {
    window.history.back();
  }
}
