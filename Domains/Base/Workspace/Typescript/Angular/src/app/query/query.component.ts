import { Observable, Subject, Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PullRequest, Query, Equals, Like, TreeNode, Sort, Page } from '../../allors/domain';
import { Scope, Loaded } from '../../allors/angular';
import { AllorsService } from '../allors.service';

import { Organisation, Person } from '../../allors/domain';

@Component({
  templateUrl: './query.component.html'
})
export class QueryComponent implements OnInit, OnDestroy {

  organisations: Organisation[];

  organisationCount: number;
  skip = 5;
  take = 5;

  private scope: Scope;
  private subscription: Subscription;

  constructor(private title: Title, private allors: AllorsService) {
    this.scope = new Scope(allors.database, allors.workspace);
  }

  ngOnInit() {
    this.title.setTitle('Query');
    this.query();
  }

  query() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    const m = this.allors.meta;

    const query = new Query(
      {
        name: 'organisations',
        objectType: m.Organisation,
        predicate: new Like(
          {
            roleType: m.Organisation.Name,
            value: 'Org%'
          }),
        include: [new TreeNode(
          {
            roleType: m.Organisation.Owner,
          })],
        sort: [new Sort(
          {
            roleType: m.Organisation.Name,
            direction: 'Asc'
          })],
        page: new Page({
          skip: this.skip || 0,
          take: this.take || 10
        })
      });

    this.scope.session.reset();
    this.subscription = this.scope
      .load('Pull', new PullRequest({
        query: [query],
      }))
      .subscribe((loaded: Loaded) => {
        this.organisations = loaded.collections.organisations as Organisation[];
        this.organisationCount = loaded.values.organisations_count;
      },
      (error) => {
        alert(error);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
