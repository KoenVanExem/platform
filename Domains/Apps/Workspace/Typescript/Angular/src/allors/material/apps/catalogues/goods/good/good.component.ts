import { Observable, Subject, Subscription } from 'rxjs/Rx';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { TdMediaService } from '@covalent/core';

import { Scope } from '../../../../../angular/base/Scope';
import { MetaDomain } from '../../../../../meta/index';
import { PullRequest, PushResponse, Fetch, Path, Query, Equals, Like, TreeNode, Sort, Page } from '../../../../../domain';
import { Good, ProductCategory, ProductType, Locale, Singleton } from '../../../../../domain';

import { AllorsService } from '../../../../../../app/allors.service';

@Component({
  templateUrl: './good.component.html',
})
export class GoodFormComponent implements OnInit, AfterViewInit, OnDestroy {

  private subscription: Subscription;
  private scope: Scope;

  flex: string = '1 1 30rem';
  m: MetaDomain;

  good: Good;

  singleton: Singleton;
  locales: Locale[];
  categories: ProductCategory[];
  productTypes: ProductType[];

  constructor(private allors: AllorsService,
    private route: ActivatedRoute,
    public snackBar: MdSnackBar,
    public media: TdMediaService) {
    this.scope = new Scope(allors.database, allors.workspace);
    this.m = this.allors.meta;
  }

  ngOnInit(): void {
    this.subscription = this.route.url
      .mergeMap((url: any) => {

        const id: string = this.route.snapshot.paramMap.get('id');
        const m: MetaDomain = this.m;

        const fetch: Fetch[] = [
          new Fetch({
            name: 'good',
            id: id,
            include: [
              new TreeNode({ roleType: m.Good.ProductType }),
              new TreeNode({ roleType: m.Good.PrimaryPhoto }),
              new TreeNode({ roleType: m.Product.LocalisedNames }),
              new TreeNode({ roleType: m.Product.LocalisedDescriptions }),
              new TreeNode({ roleType: m.Product.LocalisedComments }),
              new TreeNode({ roleType: m.Product.ProductCategories }),
              new TreeNode({
                roleType: m.Product.ProductCharacteristicValues,
                nodes: [
                  new TreeNode({ roleType: m.ProductCharacteristicValue.ProductCharacteristic }),
                ],
              }),
            ],
          }),
        ];

        const query: Query[] = [
          new Query(
            {
              name: 'singletons',
              objectType: this.m.Singleton,
              include: [
                new TreeNode({ roleType: m.Singleton.Locales }),
              ],
            }),
          new Query(
            {
              name: 'categories',
              objectType: this.m.ProductCategory,
            }),
          new Query(
            {
              name: 'productTypes',
              objectType: this.m.ProductType,
            }),
        ];

        this.scope.session.reset();

        return this.scope
          .load('Pull', new PullRequest({ fetch: fetch, query: query }));
      })
      .subscribe(() => {

        this.good = this.scope.objects.good as Good;
        if (!this.good) {
          this.good = this.scope.session.create('Good') as Good;
        }

        this.categories = this.scope.collections.categories as ProductCategory[];
        this.productTypes = this.scope.collections.productTypes as ProductType[];
        this.singleton = this.scope.collections.singletons[0] as Singleton;
        this.locales = this.singleton.Locales;
      },
      (error: any) => {
        this.snackBar.open(error, 'close', { duration: 5000 });
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

  save(): void {

    this.scope
      .save()
      .subscribe((pushResponse: PushResponse) => {
        this.goBack();
      },
      (e: any) => {
        this.snackBar.open(e.toString(), 'close', { duration: 5000 });
      });
  }

  goBack(): void {
    window.history.back();
  }
}
