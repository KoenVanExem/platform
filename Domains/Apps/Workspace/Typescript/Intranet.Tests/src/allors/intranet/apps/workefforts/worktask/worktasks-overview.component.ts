import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subscription } from "rxjs/Rx";

import { TdDialogService, TdMediaService } from "@covalent/core";

import { AllorsService, ErrorService, Invoked, Loaded, Scope } from "@allors";
import { And, ContainedIn, Equals, Like, Page, Predicate, PullRequest, Query, TreeNode } from "@allors";
import { Person, Priority, Singleton, WorkEffortAssignment, WorkEffortState, WorkTask } from "@allors";
import { MetaDomain } from "@allors";

interface SearchData {
  name: string;
  description: string;
  state: string;
  priority: string;
  assignee: string;
}

@Component({
  templateUrl: "./worktasks-overview.component.html",
})
export class WorkTasksOverviewComponent implements AfterViewInit, OnDestroy {

  public total: number;

  public title: string = "Work Tasks";

  public searchForm: FormGroup;

  public data: WorkEffortAssignment[];

  public workEffortStates: WorkEffortState[];
  public selectedWorkEffortState: WorkEffortState;
  public workEffortState: WorkEffortState;

  public priorities: Priority[];
  public selectedPriority: Priority;
  public priority: Priority;

  public assignees: Person[];
  public selectedAssignee: Person;
  public assignee: Person;

  private refresh$: BehaviorSubject<Date>;
  private subscription: Subscription;
  private scope: Scope;

  private page$: BehaviorSubject<number>;

  constructor(
    private allors: AllorsService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogService: TdDialogService,
    private snackBarService: MatSnackBar,
    public media: TdMediaService,
    private changeDetectorRef: ChangeDetectorRef) {

    titleService.setTitle(this.title);
    this.scope = new Scope(allors.database, allors.workspace);
    this.refresh$ = new BehaviorSubject<Date>(undefined);

    this.searchForm = this.formBuilder.group({
      assignee: [""],
      description: [""],
      name: [""],
      priority: [""],
      state: [""],
    });

    this.page$ = new BehaviorSubject<number>(50);

    const search$: Observable<SearchData> = this.searchForm.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .startWith({});

    const combined$: Observable<any> = Observable
    .combineLatest(search$, this.page$, this.refresh$)
    .scan(([previousData, previousTake, previousDate]: [SearchData, number, Date], [data, take, date]: [SearchData, number, Date]): [SearchData, number, Date] => {
      return [
        data,
        data !== previousData ? 50 : take,
        date,
      ];
    }, [] as [SearchData, number, Date]);

    this.subscription = combined$
      .switchMap(([data, take]: [SearchData, number]) => {
        const m: MetaDomain = this.allors.meta;

        const objectStatesQuery: Query[] = [
          new Query(
            {
              name: "workEffortStates",
              objectType: m.WorkEffortState,
            }),
          new Query(
            {
              name: "priorities",
              objectType: m.Priority,
            }),
          new Query(
            {
              include: [
                new TreeNode({
                  nodes: [
                    new TreeNode({ roleType: m.InternalOrganisation.ActiveEmployees }),
                  ],
                  roleType: m.Singleton.InternalOrganisation,
                }),
              ],
              name: "singletons",
              objectType: m.Singleton,
            }),
        ];

        return this.scope
          .load("Pull", new PullRequest({ query: objectStatesQuery }))
          .switchMap((loaded: Loaded) => {
            this.workEffortStates = loaded.collections.workEffortStates as WorkEffortState[];
            this.workEffortState = this.workEffortStates.find((v: WorkEffortState) => v.Name === data.state);

            this.priorities = loaded.collections.priorities as Priority[];
            this.priority = this.priorities.find((v: Priority) => v.Name === data.priority);

            const singleton: Singleton = loaded.collections.singletons[0] as Singleton;
            this.assignees = singleton.InternalOrganisation.ActiveEmployees;
            this.assignee = this.assignees.find((v: Person) => v.displayName === data.assignee);

            const predicate: And = new And();
            const predicates: Predicate[] = predicate.predicates;

            if (data.name) {
              const like: string = "%" + data.name + "%";
              predicates.push(new Like({ roleType: m.WorkTask.Name, value: like }));
            }

            if (data.description) {
              const like: string = "%" + data.description + "%";
              predicates.push(new Like({ roleType: m.WorkTask.Description, value: like }));
            }

            if (data.state) {
              predicates.push(new Equals({ roleType: m.WorkTask.WorkEffortState, value: this.workEffortState }));
            }

            if (data.priority) {
              predicates.push(new Equals({ roleType: m.WorkTask.Priority, value: this.priority }));
            }

            const workTasksquery: Query = new Query(
              {
                name: "worktasks",
                objectType: m.WorkTask,
                predicate,
              });

            const assignmentPredicate: And = new And();
            const assignmentPredicates: Predicate[] = assignmentPredicate.predicates;
            assignmentPredicates.push(new ContainedIn({ roleType: m.WorkEffortAssignment.Assignment, query: workTasksquery }));

            if (data.assignee) {
              assignmentPredicates.push(new Equals({ roleType: m.WorkEffortAssignment.Professional, value: this.assignee }));
            }

            const assignmentsQuery: Query[] = [
              new Query(
                {
                  include: [
                    new TreeNode({ roleType: m.WorkEffortAssignment.Professional }),
                    new TreeNode({
                      nodes: [
                        new TreeNode({ roleType: m.WorkEffort.WorkEffortState }),
                        new TreeNode({ roleType: m.WorkEffort.Priority }),
                      ],
                      roleType: m.WorkEffortAssignment.Assignment,
                    }),
                  ],
                  name: "workEffortAssignments",
                  objectType: m.WorkEffortAssignment,
                  page: new Page({ skip: 0, take }),
                  predicate: assignmentPredicate,
                }),
            ];

            return this.scope
              .load("Pull", new PullRequest({ query: assignmentsQuery }));
          });
      })
      .subscribe((loaded: Loaded) => {

        this.scope.session.reset();

        this.data = loaded.collections.workEffortAssignments as WorkEffortAssignment[];
        this.total = loaded.values.workEffortAssignments_total;
      },
      (error: any) => {
        this.errorService.message(error);
        this.goBack();
      });
  }

  public more(): void {
    this.page$.next(this.data.length + 50);
  }

  public goBack(): void {
    window.history.back();
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

  public refresh(): void {
    this.refresh$.next(new Date());
  }

  public delete(worktask: WorkTask): void {
    this.dialogService
      .openConfirm({ message: "Are you sure you want to delete this work task?" })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.scope.invoke(worktask.Delete)
            .subscribe((invoked: Invoked) => {
              this.snackBar.open("Successfully deleted.", "close", { duration: 5000 });
              this.refresh();
            },
            (error: Error) => {
              this.errorService.dialog(error);
            });
        }
      });
  }

  public onView(person: Person): void {
    this.router.navigate(["/relations/person/" + person.id]);
  }
}