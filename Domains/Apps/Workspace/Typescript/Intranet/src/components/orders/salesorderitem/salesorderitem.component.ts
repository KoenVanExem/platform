import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router, UrlSegment } from "@angular/router";
import { TdDialogService, TdMediaService } from "@covalent/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs/Rx";

import { PostalAddress, MetaDomain, SalesOrder, SalesInvoice, Good, SalesInvoiceItem, Catalogue, Singleton, Locale, ProductCategory, CatScope, PartyContactMechanism, Enumeration, ContactMechanismType, TelecommunicationsNumber, WorkEffortAssignment, WorkEffortState, Priority, Person, WorkTask, WorkEffortPurpose, CommunicationEvent, Organisation, OrganisationContactRelationship, ContactMechanism, PersonRole, CustomerRelationship, Country, ProductCharacteristic, ProductQuote, RequestForQuote, Currency, Party, OrganisationRole, SalesOrderItem, QuoteItem, VatRate, VatRegime, InventoryItem, SerialisedInventoryItem, NonSerialisedInventoryItem, SalesInvoiceItemType, Product } from "@allors/workspace";
import { Scope, WorkspaceService, Saved, ErrorService, Loaded, Invoked, Filter } from "@allors/base-angular";
import { Fetch, TreeNode, Path, Query, PullRequest, And, Predicate, Like, ContainedIn, Page, Sort, Equals, Contains } from "@allors/framework";

@Component({
  templateUrl: "./salesorderitem.component.html",
})
export class SalesOrderItemEditComponent implements OnInit, AfterViewInit, OnDestroy {

  public m: MetaDomain;

  public title: string = "Edit Sales Order Item";
  public subTitle: string;
  public order: SalesOrder;
  public orderItem: SalesOrderItem;
  public quoteItem: QuoteItem;
  public goods: Good[];
  public vatRates: VatRate[];
  public vatRegimes: VatRegime[];
  public discount: number;
  public surcharge: number;
  public inventoryItems: InventoryItem[];
  public serialisedInventoryItem: SerialisedInventoryItem;
  public nonSerialisedInventoryItem: NonSerialisedInventoryItem;
  public salesInvoiceItemTypes: SalesInvoiceItemType[];
  public productItemType: SalesInvoiceItemType;

  public goodsFilter: Filter;

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
    this.goodsFilter = new Filter({scope: this.scope, objectType: this.m.Good, roleTypes: [this.m.Good.Name]});
  }

  public ngOnInit(): void {
    const route$: Observable<UrlSegment[]> = this.route.url;

    const combined$: Observable<[UrlSegment[], Date]> = Observable.combineLatest(route$, this.refresh$);

    this.subscription = combined$
      .switchMap(([urlSegments, date]: [UrlSegment[], Date]) => {

        const id: string = this.route.snapshot.paramMap.get("id");
        const itemId: string = this.route.snapshot.paramMap.get("itemId");
        const m: MetaDomain = this.m;

        const fetch: Fetch[] = [
          new Fetch({
            id,
            name: "salesOrder",
          }),
          new Fetch({
            id: itemId,
            include: [
              new TreeNode({ roleType: m.SalesOrderItem.SalesOrderItemState }),
              new TreeNode({ roleType: m.SalesOrderItem.QuoteItem }),
              new TreeNode({ roleType: m.SalesOrderItem.DiscountAdjustment }),
              new TreeNode({ roleType: m.SalesOrderItem.SurchargeAdjustment }),
              new TreeNode({ roleType: m.SalesOrderItem.DerivedVatRate }),
              new TreeNode({
                nodes: [new TreeNode({ roleType: m.VatRegime.VatRate })],
                roleType: m.SalesOrderItem.VatRegime,
              }),
            ],
            name: "orderItem",
          }),
        ];

        const query: Query[] = [
          new Query(
            {
              name: "goods",
              objectType: m.Good,
            }),
          new Query(
            {
              name: "vatRates",
              objectType: m.VatRate,
            }),
          new Query(
            {
              name: "vatRegimes",
              objectType: m.VatRegime,
            }),
          new Query(
            {
              name: "salesInvoiceItemTypes",
              objectType: m.SalesInvoiceItemType,
            }),
          ];

        return this.scope
          .load("Pull", new PullRequest({ fetch, query }));
      })
      .subscribe((loaded: Loaded) => {

        this.order = loaded.objects.salesOrder as SalesOrder;
        this.orderItem = loaded.objects.orderItem as SalesOrderItem;
        this.quoteItem = loaded.objects.quoteItem as QuoteItem;
        this.goods = loaded.collections.goods as Good[];
        this.vatRates = loaded.collections.vatRates as VatRate[];
        this.vatRegimes = loaded.collections.vatRegimes as VatRegime[];
        this.salesInvoiceItemTypes = loaded.collections.salesInvoiceItemTypes as SalesInvoiceItemType[];
        this.productItemType = this.salesInvoiceItemTypes.find((v: SalesInvoiceItemType) => v.UniqueId.toUpperCase() === "0D07F778-2735-44CB-8354-FB887ADA42AD");

        if (!this.orderItem) {
          this.title = "Add Order Item";
          this.orderItem = this.scope.session.create("SalesOrderItem") as SalesOrderItem;
          this.order.AddSalesOrderItem(this.orderItem);
        } else {
          if (this.orderItem.ItemType === this.productItemType) {
            this.goodSelected(this.orderItem.Product);
          }
          if (this.orderItem.DiscountAdjustment) {
            this.discount = this.orderItem.DiscountAdjustment.Amount;
          }
          if (this.orderItem.SurchargeAdjustment) {
            this.surcharge = this.orderItem.SurchargeAdjustment.Amount;
          }
        }
      },
      (error: Error) => {
        this.errorService.message(error);
        this.goBack();
      },
    );
  }

  public ngAfterViewInit(): void {
    this.media.broadcast();
    this.changeDetectorRef.detectChanges();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public goodSelected(product: Product): void {

    this.orderItem.ItemType = this.productItemType;

    const fetch: Fetch[] = [
      new Fetch({
        id: product.id,
        name: "inventoryItem",
        path: new Path({ step: this.m.Good.InventoryItemsWhereGood }),
      }),
    ];

    this.scope
        .load("Pull", new PullRequest({ fetch }))
        .subscribe((loaded: Loaded) => {
          this.inventoryItems = loaded.collections.inventoryItem as InventoryItem[];
          if (this.inventoryItems[0] instanceof SerialisedInventoryItem) {
            this.serialisedInventoryItem = this.inventoryItems[0] as SerialisedInventoryItem;
          }
          if (this.inventoryItems[0] instanceof NonSerialisedInventoryItem) {
            this.nonSerialisedInventoryItem = this.inventoryItems[0] as NonSerialisedInventoryItem;
          }
        },
        (error: Error) => {
          this.errorService.message(error);
          this.goBack();
        },
      );
  }

  public save(): void {

    // if (this.discount !== 0) {
    //   const discountAdjustment = this.scope.session.create("DiscountAdjustment") as DiscountAdjustment;
    //   discountAdjustment.Amount = this.discount;
    //   this.orderItem.DiscountAdjustment = discountAdjustment;
    // }

    // if (this.surcharge !== 0) {
    //   const surchargeAdjustment = this.scope.session.create("SurchargeAdjustment") as SurchargeAdjustment;
    //   surchargeAdjustment.Amount = this.surcharge;
    //   this.orderItem.SurchargeAdjustment = surchargeAdjustment;
    // }

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