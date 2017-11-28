import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute, UrlSegment } from "@angular/router";
import { TdMediaService } from "@covalent/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs/Rx";

import { MetaDomain, SalesOrder, SalesInvoice, Good, SalesInvoiceItem, Catalogue, Singleton, Locale, ProductCategory, CatScope } from "@allors/workspace";
import { Scope, WorkspaceService, Saved, ErrorService, Loaded, Invoked } from "@allors/base-angular";
import { Fetch, TreeNode, Path, Query, PullRequest, And, Predicate, Like, ContainedIn, Page, Sort } from "@allors/framework";

@Component({
  template: `
<td-layout-card-over [cardTitle]="title" [cardSubtitle]="subTitle">
  <form #form="ngForm" *ngIf="catalogue" (submit)="save()">

    <div body *ngIf="catalogue" layout-gt-md="row">
      <div flex-gt-xs="60">
        <div class="pad">
          <a-mat-media-upload [object]="catalogue" [roleType]="m.Catalogue.CatalogueImage" accept="image/*" (selected)="imageSelected($event)"></a-mat-media-upload>
          <a-mat-select [object]="catalogue" [roleType]="m.Catalogue.CatScope" [options]="catScopes" display="Name" label="Scope"></a-mat-select>
          <a-mat-localised-text [object]="catalogue" [roleType]="m.Catalogue.LocalisedNames" [locales]="locales" label="Name"></a-mat-localised-text>
          <a-mat-localised-text [object]="catalogue" [roleType]="m.Catalogue.LocalisedDescriptions" [locales]="locales" label="Description"></a-mat-localised-text>
          <a-mat-select [object]="catalogue" [roleType]="m.Catalogue.ProductCategories" [options]="categories" display="Name"></a-mat-select>
        </div>

        <mat-divider></mat-divider>

        <mat-card-actions>
          <button mat-button color="primary" type="submit" [disabled]="!form.form.valid">SAVE</button>
          <button mat-button (click)="goBack()" type="button">CANCEL</button>
        </mat-card-actions>
      </div>

      <div *ngIf="catalogue.CatalogueImage" flex-gt-xs="40">
        <mat-card class="image-card">
          <mat-card-header>
            <mat-card-title>{{catalogue.Name}}</mat-card-title>
            <mat-card-subtitle>{{catalogue.CatalogueImage.FileName}}</mat-card-subtitle>
          </mat-card-header>
          <img mat-card-image src="http://localhost:5000/Media/Download/{{catalogue.CatalogueImage.UniqueId}}?revision={{catalogue.CatalogueImage.Revision}}">
        </mat-card>
      </div>
    </div>

  </form>
</td-layout-card-over>
`,
})
export class CatalogueComponent implements OnInit, AfterViewInit, OnDestroy {

  public m: MetaDomain;

  public catalogue: Catalogue;
  public title: string;
  public subTitle: string;

  public singleton: Singleton;
  public locales: Locale[];
  public categories: ProductCategory[];
  public catScopes: CatScope[];

  private subscription: Subscription;
  private scope: Scope;
  private refresh$: BehaviorSubject<Date>;

  constructor(
    private workspaceService: WorkspaceService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public media: TdMediaService,
    private changeDetectorRef: ChangeDetectorRef) {

    this.scope = this.workspaceService.createScope();
    this.m = this.workspaceService.metaPopulation.metaDomain;
    this.refresh$ = new BehaviorSubject<Date>(undefined);
  }

  public ngOnInit(): void {

    const route$: Observable<UrlSegment[]> = this.route.url;
    const combined$: Observable<[UrlSegment[], Date]> = Observable.combineLatest(route$, this.refresh$);

    this.subscription = combined$
      .switchMap(([urlSegments, date]: [UrlSegment[], Date]) => {

        const id: string = this.route.snapshot.paramMap.get("id");
        const m: MetaDomain = this.m;

        const fetch: Fetch[] = [
          new Fetch({
            id,
            include: [
              new TreeNode({
                nodes: [new TreeNode({ roleType: m.LocalisedText.Locale })],
                roleType: m.Catalogue.LocalisedNames,
               }),
              new TreeNode({
                nodes: [new TreeNode({ roleType: m.LocalisedText.Locale })],
                roleType: m.Catalogue.LocalisedDescriptions,
               }),
            ],
            name: "catalogue",
          }),
        ];

        const query: Query[] = [
          new Query(
            {
              include: [
                new TreeNode({ roleType: m.Singleton.Locales }),
              ],
              name: "singletons",
              objectType: this.m.Singleton,
            }),
          new Query(
            {
              name: "categories",
              objectType: this.m.ProductCategory,
            }),
          new Query(
            {
              name: "catScopes",
              objectType: this.m.CatScope,
            }),
        ];

        return this.scope
          .load("Pull", new PullRequest({ fetch, query }));
      })
      .subscribe((loaded: Loaded) => {

        this.catalogue = loaded.objects.catalogue as Catalogue;
        if (!this.catalogue) {
          this.catalogue = this.scope.session.create("Catalogue") as Catalogue;
        }

        this.title = this.catalogue.Name;

        this.singleton = loaded.collections.singletons[0] as Singleton;
        this.categories = loaded.collections.categories as ProductCategory[];
        this.catScopes = loaded.collections.catScopes as CatScope[];
        this.locales = this.singleton.Locales;
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

  public imageSelected(id: string): void {
    this.update();
    this.snackBar.open("Catalogue succesfully saved.", "close", { duration: 5000 });
  }

  public save(): void {

    this.scope
      .save()
      .subscribe((saved: Saved) => {
        this.goBack();
      },
      (error: Error) => {
        this.errorService.dialog(error);
      });
  }

  public update(): void {

    this.scope
      .save()
      .subscribe((saved: Saved) => {
        this.refresh();
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
