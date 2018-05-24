import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { ErrorService, Loaded, Saved, Scope, WorkspaceService } from '../../../../../../../angular';
import { EmailAddress, Enumeration, Party, PartyContactMechanism } from '../../../../../../../domain';
import { Fetch, PullRequest, Query, Sort, TreeNode } from '../../../../../../../framework';
import { MetaDomain } from '../../../../../../../meta';

@Component({
  templateUrl: './party-contactmechanism-emailaddress.html',
})
export class PartyContactMechanismEmailAddressAddComponent implements OnInit, OnDestroy {

  public title = 'Email Address';
  public subTitle = 'add email address';

  public m: MetaDomain;

  public party: Party;
  public partyContactMechanism: PartyContactMechanism;
  public contactMechanism: EmailAddress;
  public contactMechanismPurposes: Enumeration[];

  private subscription: Subscription;
  private scope: Scope;

  constructor(
    private workspaceService: WorkspaceService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef) {

    this.scope = this.workspaceService.createScope();
    this.m = this.workspaceService.metaPopulation.metaDomain;
  }

  public ngOnInit(): void {
    this.subscription = this.route.url
      .switchMap((url: any) => {

        const id: string = this.route.snapshot.paramMap.get('id');
        const m: MetaDomain = this.m;

        const fetches: Fetch[] = [
          new Fetch({
            name: 'party',
            id,
            include: [
              new TreeNode({
                roleType: m.Party.PartyContactMechanisms,
                nodes: [
                  new TreeNode({ roleType: m.PartyContactMechanism.ContactPurposes }),
                  new TreeNode({ roleType: m.PartyContactMechanism.ContactMechanism }),
                ],
              }),
            ],
          }),
        ];

        const queries: Query[] = [
          new Query(
            {
              name: 'contactMechanismPurposes',
              objectType: this.m.ContactMechanismPurpose,
            }),
        ];

        return this.scope
          .load('Pull', new PullRequest({ fetches, queries }));
      })
      .subscribe((loaded) => {

        this.party = loaded.objects.party as Party;

        if (!this.contactMechanism) {
          this.contactMechanism = this.scope.session.create('EmailAddress') as EmailAddress;
        }

        this.partyContactMechanism = this.scope.session.create('PartyContactMechanism') as PartyContactMechanism;
        this.partyContactMechanism.ContactMechanism = this.contactMechanism;
        this.partyContactMechanism.UseAsDefault = true;

        this.party.AddPartyContactMechanism(this.partyContactMechanism);

        this.contactMechanismPurposes = loaded.collections.contactMechanismPurposes as Enumeration[];
      },
      (error: any) => {
        this.errorService.handle(error);
        this.goBack();
      },
    );
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
        this.goBack();
      },
      (error: Error) => {
        this.errorService.handle(error);
      });
  }

  public goBack(): void {
    window.history.back();
  }
}