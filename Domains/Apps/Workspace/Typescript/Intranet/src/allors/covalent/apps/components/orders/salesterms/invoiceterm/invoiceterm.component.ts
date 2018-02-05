import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router, UrlSegment } from "@angular/router";
import { TdDialogService, TdMediaService } from "@covalent/core";

import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import "rxjs/add/observable/combineLatest";

import { ErrorService, Field, Filter, Loaded, Saved, Scope, WorkspaceService } from "../../../../../../angular";
import { InvoiceTermType, SalesOrder, SalesTerm } from "../../../../../../domain";
import { Fetch, Path, PullRequest, Query, Sort, TreeNode } from "../../../../../../framework";
import { MetaDomain } from "../../../../../../meta";

@Component({
  templateUrl: "./invoiceterm.component.html",
})
export class InvoiceTermEditComponent implements OnInit, OnDestroy {

  public m: MetaDomain;

  public title: string = "Edit Sales Order Invoice Term";
  public subTitle: string;
  public order: SalesOrder;
  public salesTerm: SalesTerm;
  public invoiceTermTypes: InvoiceTermType[];

  private refresh$: BehaviorSubject<Date>;
  private subscription: Subscription;
  private scope: Scope;

  constructor(
    private workspaceService: WorkspaceService,
    private errorService: ErrorService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialogService: TdDialogService,
    public media: TdMediaService, private changeDetectorRef: ChangeDetectorRef) {

    this.m = this.workspaceService.metaPopulation.metaDomain;
    this.scope = this.workspaceService.createScope();
    this.refresh$ = new BehaviorSubject<Date>(undefined);
  }

  public ngOnInit(): void {

    this.subscription = Observable.combineLatest(this.route.url, this.refresh$)
      .switchMap(([urlSegments, date]) => {

        const id: string = this.route.snapshot.paramMap.get("id");
        const termId: string = this.route.snapshot.paramMap.get("termId");
        const m: MetaDomain = this.m;

        const fetch: Fetch[] = [
          new Fetch({
            id,
            name: "salesOrder",
          }),
          new Fetch({
            id: termId,
            include: [
              new TreeNode({ roleType: m.SalesTerm.TermType }),
            ],
            name: "salesTerm",
          }),
        ];

        const query: Query[] = [
          new Query({
            name: "invoiceTermTypes",
            objectType: m.InvoiceTermType,
          }),
        ];

        return this.scope
          .load("Pull", new PullRequest({ fetch, query }));
      })
      .subscribe((loaded) => {

        this.order = loaded.objects.salesOrder as SalesOrder;
        this.salesTerm = loaded.objects.salesTerm as SalesTerm;
        this.invoiceTermTypes = loaded.collections.invoiceTermTypes as InvoiceTermType[];

        if (!this.salesTerm) {
          this.title = "Add Order Invoice Term";
          this.salesTerm = this.scope.session.create("InvoiceTerm") as SalesTerm;
          this.order.AddSalesTerm(this.salesTerm);
        }
      },
      (error: Error) => {
        this.errorService.message(error);
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
        this.router.navigate(["/orders/salesOrder/" + this.order.id]);
      },
      (error: Error) => {
        this.errorService.dialog(error);
      });
  }

  public refresh(): void {
    this.refresh$.next(new Date());
  }

  public goBack(): void {
    window.history.back();
  }
}
