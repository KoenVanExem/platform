import { Component, OnDestroy, OnInit, Self, Optional, Inject } from '@angular/core';
import { Meta } from '@allors/meta/generated'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription, combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { ContextService, TestScope, MetaService, RefreshService, PanelManagerService } from '@allors/angular/core';
import { PullRequest } from '@allors/protocol/system';
import { ObjectData, SaveService } from '@allors/angular/material/core';
import {
  Organisation,
  Party,
  Person,
  CustomerShipment,
  Currency,
  PostalAddress,
  Facility,
  ShipmentMethod,
  Carrier,
  ShipmentPackage,
  OrganisationContactRelationship,
  PartyContactMechanism,
  ElectronicAddress,
  Enumeration,
} from '@allors/domain/generated';
import { Equals, Sort } from '@allors/data/system';
import { InternalOrganisationId, FiltersService, FetcherService } from '@allors/angular/base';
import { IObject, ISessionObject } from '@allors/domain/system';

@Component({
  templateUrl: './emailaddress-create.component.html',
  providers: [ContextService]
})
export class EmailAddressCreateComponent extends TestScope implements OnInit, OnDestroy {

  readonly m: Meta;

  contactMechanism: ElectronicAddress;
  contactMechanismTypes: Enumeration[];

  public title = 'Add Email Address';

  private subscription: Subscription;
  partyContactMechanism: PartyContactMechanism;
  party: Party;
  contactMechanismPurposes: Enumeration[];


  constructor(
    @Self() public allors: ContextService,
    @Inject(MAT_DIALOG_DATA) public data: ObjectData,
    public dialogRef: MatDialogRef<EmailAddressCreateComponent>,
    public metaService: MetaService,
    public refreshService: RefreshService,
    private saveService: SaveService,
    private internalOrganisationId: InternalOrganisationId) {

    super();

    this.m = this.metaService.m;
  }

  public ngOnInit(): void {

    const { m, pull } = this.metaService;

    this.subscription = combineLatest(this.refreshService.refresh$, this.internalOrganisationId.observable$)
      .pipe(
        switchMap(() => {

          const pulls = [
            pull.Party({
              object: this.data.associationId,
            }),
            pull.ContactMechanismPurpose({
              predicate: new Equals({ propertyType: m.ContactMechanismPurpose.IsActive, value: true }),
              sort: new Sort(this.m.ContactMechanismPurpose.Name)
            })
          ];

          return this.allors.context
            .load(new PullRequest({ pulls }));
        })
      )
      .subscribe((loaded) => {

        this.allors.context.reset();

        this.party = loaded.objects.Party as Party;
        this.contactMechanismPurposes = loaded.collections.ContactMechanismPurposes as Enumeration[];

        this.contactMechanism = this.allors.context.create('EmailAddress') as ElectronicAddress;

        this.partyContactMechanism = this.allors.context.create('PartyContactMechanism') as PartyContactMechanism;
        this.partyContactMechanism.UseAsDefault = true;
        this.partyContactMechanism.ContactMechanism = this.contactMechanism;

        this.party.AddPartyContactMechanism(this.partyContactMechanism);
      });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public save(): void {

    this.allors.context.save()
      .subscribe(() => {
        const data: IObject = {
          id: this.contactMechanism.id,
          objectType: this.contactMechanism.objectType,
        };

        this.dialogRef.close(data);
        this.refreshService.refresh();
      },
        this.saveService.errorHandler
      );
  }
}
