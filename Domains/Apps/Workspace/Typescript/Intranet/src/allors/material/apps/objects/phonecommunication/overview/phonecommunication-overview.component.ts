import { Component, OnDestroy, OnInit, Self, Injector } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ErrorService, NavigationService, NavigationActivatedRoute, PanelManagerService, RefreshService, MetaService, ContextService } from '../../../../../angular';
import { PhoneCommunication } from '../../../../../domain';
import { PullRequest, Pull } from '../../../../../framework';
import { StateService } from '../../../services/state';

@Component({
  templateUrl: './phonecommunication-overview.component.html',
  providers: [PanelManagerService, ContextService]
})
export class PhoneCommunicationOverviewComponent implements OnInit, OnDestroy {

  title = 'Phone Communication';

  phoneCommunication: PhoneCommunication;

  subscription: Subscription;

  constructor(
    @Self() public panelManager: PanelManagerService,
    public metaService: MetaService,
    public refreshService: RefreshService,
    public navigation: NavigationService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private stateService: StateService,
    public injector: Injector,
    titleService: Title,
  ) {

    titleService.setTitle(this.title);
  }

  public ngOnInit(): void {

    this.subscription = combineLatest(this.route.url, this.route.queryParams, this.refreshService.refresh$, this.stateService.internalOrganisationId$)
      .pipe(
        switchMap(([urlSegments, queryParams, date, internalOrganisationId]) => {

          const { m, pull } = this.metaService;

          const navRoute = new NavigationActivatedRoute(this.route);
          this.panelManager.objectType = m.PhoneCommunication.objectType;
          this.panelManager.id = navRoute.id();
          this.panelManager.maximized = navRoute.panel();

          const pulls = [
            pull.PhoneCommunication({
              object: this.panelManager.id,
            })
          ];

          this.panelManager.onPull(pulls);

          return this.panelManager.context
            .load('Pull', new PullRequest({ pulls }));
        })
      )
      .subscribe((loaded) => {

        this.panelManager.context.session.reset();
        this.panelManager.onPulled(loaded);

        this.phoneCommunication = loaded.objects.PhoneCommunication as PhoneCommunication;
      }, this.errorService.handler);
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
