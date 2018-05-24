import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/combineLatest';



import { ErrorService, Loaded, PdfService, Scope, WorkspaceService } from '../../../../../angular';
import { InternalOrganisation, ProductQuote, QuoteState } from '../../../../../domain';
import { And, ContainedIn, Equals, Like, Page, Predicate, PullRequest, Query, Sort, TreeNode } from '../../../../../framework';
import { MetaDomain } from '../../../../../meta';
import { StateService } from '../../../services/StateService';

interface SearchData {
  company: string;
  description: string;
  quoteNumber: string;
  state: string;
}

@Component({
  templateUrl: './productquotes-overview.component.html',
})
export class ProductQuotesOverviewComponent implements OnDestroy {

  public searchForm: FormGroup;

  public title = 'Quotes';
  public data: ProductQuote[];
  public filtered: ProductQuote[];
  public total: number;

  public internalOrganisations: InternalOrganisation[];
  public selectedInternalOrganisation: InternalOrganisation;

  public quoteStates: QuoteState[];
  public selectedQuoteState: QuoteState;
  public quoteState: QuoteState;

  private subscription: Subscription;
  private scope: Scope;

  private refresh$: BehaviorSubject<Date>;
  private page$: BehaviorSubject<number>;

  constructor(
    private workspaceService: WorkspaceService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private router: Router,
    
    
    private changeDetectorRef: ChangeDetectorRef,
    public pdfService: PdfService,
    private stateService: StateService) {

    this.scope = this.workspaceService.createScope();
    this.refresh$ = new BehaviorSubject<Date>(undefined);

    this.searchForm = this.formBuilder.group({
      company: [''],
      description: [''],
      quoteNumber: [''],
      state: [''],
    });

    this.page$ = new BehaviorSubject<number>(50);

    const search$ = this.searchForm.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .startWith({});

    const combined$ = Observable.combineLatest(search$, this.page$, this.refresh$, this.stateService.internalOrganisationId$)
      .scan(([previousData, previousTake, previousDate, previousInternalOrganisationId], [data, take, date, internalOrganisationId]) => {
        return [
          data,
          data !== previousData ? 50 : take,
          date,
          internalOrganisationId,
        ];
      }, [] as [SearchData, number, Date, InternalOrganisation]);

    const m: MetaDomain = this.workspaceService.metaPopulation.metaDomain;

    this.subscription = combined$
      .switchMap(([data, take, , internalOrganisationId]) => {

        const internalOrganisationsQuery: Query[] = [
          new Query(
            {
              name: 'quoteStates',
              objectType: m.QuoteState,
            }),
          new Query(
            {
              name: 'internalOrganisations',
              objectType: m.Organisation,
              predicate: new Equals({ roleType: m.Organisation.IsInternalOrganisation, value: true }),
            }),
        ];

        return this.scope
        .load('Pull', new PullRequest({ queries: internalOrganisationsQuery }))
        .switchMap((loaded: Loaded) => {
          this.quoteStates = loaded.collections.quoteStates as QuoteState[];
          this.quoteState = this.quoteStates.find((v: QuoteState) => v.Name === data.state);

          this.internalOrganisations = loaded.collections.internalOrganisations as InternalOrganisation[];

          const predicate: And = new And();
          const predicates: Predicate[] = predicate.predicates;

          predicates.push(new Equals({ roleType: m.ProductQuote.Issuer, value: internalOrganisationId }));

          if (data.quoteNumber) {
          const like: string = '%' + data.quoteNumber + '%';
          predicates.push(new Like({ roleType: m.ProductQuote.QuoteNumber, value: like }));
        }

          if (data.company) {
          const partyQuery: Query = new Query({
            objectType: m.Party, predicate: new Like({
              roleType: m.Party.PartyName, value: data.company.replace('*', '%') + '%',
            }),
          });

          const containedIn: ContainedIn = new ContainedIn({ roleType: m.ProductQuote.Receiver, query: partyQuery });
          predicates.push(containedIn);
        }

          if (data.description) {
          const like: string = data.description.replace('*', '%') + '%';
          predicates.push(new Like({ roleType: m.ProductQuote.Description, value: like }));
        }

          if (data.state) {
          predicates.push(new Equals({ roleType: m.ProductQuote.QuoteState, value: this.quoteState }));
        }

          const queries: Query[] = [new Query(
          {
            include: [
              new TreeNode({ roleType: m.ProductQuote.Receiver }),
              new TreeNode({ roleType: m.ProductQuote.QuoteState }),
            ],
            name: 'quotes',
            objectType: m.ProductQuote,
            page: new Page({ skip: 0, take }),
            predicate,
            sort: [new Sort({ roleType: m.ProductQuote.QuoteNumber, direction: 'Desc' })],
          })];

          return this.scope.load('Pull', new PullRequest({ queries }));
        });
      })
      .subscribe((loaded) => {
        this.data = loaded.collections.quotes as ProductQuote[];
        this.total = loaded.values.invoices_total;
      },
      (error: any) => {
        this.errorService.handle(error);
        this.goBack();
      });
  }

  public print(quote: ProductQuote) {
    this.pdfService.display(quote);
  }

  public goBack(): void {
    window.history.back();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onView(quote: ProductQuote): void {
    this.router.navigate(['/orders/productQuotes/' + quote.id]);
  }

  private more(): void {
    this.page$.next(this.data.length + 50);
  }
}