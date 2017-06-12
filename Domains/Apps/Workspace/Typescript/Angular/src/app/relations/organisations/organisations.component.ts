import { Observable, Subject, Subscription } from 'rxjs/Rx';
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MdSnackBar } from '@angular/material';

import { PullRequest, Query, Equals, Like, TreeNode, Sort, Page } from '../../../allors/domain';
import { Scope } from '../../../allors/angular/base/Scope';
import { AllorsService } from '../../allors.service';

import { Organisation } from '../../../allors/domain';

import { TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';

@Component({
  templateUrl: './organisations.component.html',
})
export class OrganisationsComponent implements AfterViewInit, OnDestroy {

  private subscription: Subscription;
  private scope: Scope;

  data: Organisation[];

  constructor(private titleService: Title,
    private router: Router,
    private loadingService: TdLoadingService,
    private dialogService: TdDialogService,
    private snackBarService: MdSnackBar,
    public media: TdMediaService,
    private allors: AllorsService) {
    this.scope = new Scope(allors.database, allors.workspace);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  ngAfterViewInit(): void {
    this.media.broadcast();
    this.titleService.setTitle('Organisations');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  search(criteria: string) {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    const m = this.allors.meta;

    const query: Query[] = [new Query(
      {
        name: 'organisations',
        objectType: m.Organisation,
        include: [
          new TreeNode({
            roleType: m.Organisation.GeneralCorrespondence,
            nodes: [
              new TreeNode({
                roleType: m.PostalAddress.PostalBoundary,
                nodes: [
                  new TreeNode({roleType: m.PostalBoundary.Country}),
                ],
              }),
            ],
          }),
        ],
      })];

    this.scope.session.reset();

    this.subscription = this.scope
      .load('Pull', new PullRequest({ query: query }))
      .subscribe(() => {
        this.data = this.scope.collections.organisations as Organisation[];
      },
      (error: any) => {
        console.log(error);
        this.goBack();
      });
  }

  delete(organisation: Organisation): void {
    this.dialogService
      .openConfirm({ message: 'Are you sure you want to delete this organisation?' })
      .afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          // TODO: Logical, physical or workflow delete
        }
      });
  }

  onView(organisation: Organisation): void {
    this.router.navigate(['/relations/organisations/' + organisation.id + '/overview']);
  }
}
