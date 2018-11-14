import { Component, OnDestroy, OnInit, Self } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';

import { ErrorService, Invoked, MediaService, PdfService, Saved, Scope, WorkspaceService, x, Allors } from '../../../../../angular';
import { WorkTask } from '../../../../../domain';
import { PullRequest } from '../../../../../framework';
import { MetaDomain } from '../../../../../meta';
import { AllorsMaterialDialogService } from '../../../../base/services/dialog';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './worktask-overview.component.html',
  providers: [Allors]
})
export class WorkTaskOverviewComponent implements OnInit, OnDestroy {

  public m: MetaDomain;

  public title = 'Task Overview';
  public task: WorkTask;

  private refresh$: BehaviorSubject<Date>;
  private subscription: Subscription;

  constructor(
    @Self() private allors: Allors,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public mediaService: MediaService,
    public pdfService: PdfService,
    private dialogService: AllorsMaterialDialogService) {

    this.m = this.allors.m;
    this.refresh$ = new BehaviorSubject<Date>(undefined);
  }

  public ngOnInit(): void {

    const { m, pull, scope } = this.allors;

    this.subscription = combineLatest(this.route.url, this.refresh$)
      .pipe(
        switchMap(([urlSegments, date]) => {

          const id: string = this.route.snapshot.paramMap.get('id');

          const pulls = [
            pull.WorkTask({
              object: id,
              include: {
                WorkEffortState: x,
                Customer: x,
                FullfillContactMechanism: x,
                ContactPerson: x,
                CreatedBy: x,
              }
            })
          ];

          return scope
            .load('Pull', new PullRequest({ pulls }));
        })
      )
      .subscribe((loaded) => {
        scope.session.reset();
        this.task = loaded.objects.task as WorkTask;
      }, this.errorService.handler);
  }

  public cancel(): void {
    const { scope } = this.allors;

    scope.invoke(this.task.Cancel)
      .subscribe((invoked: Invoked) => {
        this.refresh();
        this.snackBar.open('Successfully cancelled.', 'close', { duration: 5000 });
      },
        (error: Error) => {
          this.errorService.handle(error);
        });
  }

  public print() {
    this.pdfService.display(this.task);
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public refresh(): void {
    this.refresh$.next(new Date());
  }

  public goBack(): void {
    window.history.back();
  }

  public checkType(obj: any): string {
    return obj.objectType.name;
  }
}
