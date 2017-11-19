import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy , OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { TdMediaService } from "@covalent/core";
import { Subscription } from "rxjs/Rx";

import { AllorsService, ErrorService, Loaded, Saved, Scope } from "@allors";
import { Fetch, Path, PullRequest, Query, TreeNode } from "@allors";
import { CustomerRelationship, Enumeration, Locale, Person, PersonRole } from "@allors";
import { MetaDomain } from "@allors";

@Component({
  templateUrl: "./person.component.html",
})
export class PersonComponent implements OnInit, AfterViewInit, OnDestroy {

  public title: string = "Person";
  public subTitle: string;

  public m: MetaDomain;

  public person: Person;

  public locales: Locale[];
  public genders: Enumeration[];
  public salutations: Enumeration[];
  public roles: PersonRole[];
  public customerRelationships: CustomerRelationship[];

  private subscription: Subscription;
  private scope: Scope;
  private customerRole: PersonRole;

  constructor(
    private allors: AllorsService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    public media: TdMediaService,
    private titleService: Title,
    private changeDetectorRef: ChangeDetectorRef) {

    this.scope = new Scope(allors.database, allors.workspace);
    this.m = this.allors.meta;
    this.titleService.setTitle(this.title);
  }

  public ngOnInit(): void {
    this.subscription = this.route.url
      .switchMap((url: any) => {

        const id: string = this.route.snapshot.paramMap.get("id");

        const m: MetaDomain = this.allors.meta;

        const fetch: Fetch[] = [
          new Fetch({
            id,
            include: [
              new TreeNode({ roleType: m.Person.Picture }),
            ],
            name: "person",
          }),
          new Fetch({
            name: "customerRelationships",
            id,
            path: new Path({ step: this.m.Organisation.CustomerRelationshipsWhereCustomer }),
          }),
        ];

        const query: Query[] = [
          new Query(
            {
              name: "locales",
              objectType: this.m.Locale,
            }),
          new Query(
            {
              name: "genders",
              objectType: this.m.GenderType,
            }),
          new Query(
            {
              name: "salutations",
              objectType: this.m.Salutation,
            }),
          new Query(
            {
              name: "roles",
              objectType: this.m.PersonRole,
            }),
        ];

        this.scope.session.reset();

        return this.scope
          .load("Pull", new PullRequest({ fetch, query }));
      })
      .subscribe((loaded: Loaded) => {

        this.subTitle = "edit person";
        this.person = loaded.objects.person as Person;
        this.customerRelationships = loaded.collections.customerRelationships as CustomerRelationship[];

        if (!this.person) {
          this.subTitle = "add a new person";
          this.person = this.scope.session.create("Person") as Person;
        }

        this.locales = loaded.collections.locales as Locale[];
        this.genders = loaded.collections.genders as Enumeration[];
        this.salutations = loaded.collections.salutations as Enumeration[];
        this.roles = loaded.collections.roles as PersonRole[];
        this.customerRole = this.roles.find((v: PersonRole) => v.UniqueId.toUpperCase() === "B29444EF-0950-4D6F-AB3E-9C6DC44C050F");
      },
      (error: any) => {
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

  public save(): void {

    if (this.person.PersonRoles.includes(this.customerRole) && this.customerRelationships === undefined) {
      const customerRelationship = this.scope.session.create("CustomerRelationship") as CustomerRelationship;
      customerRelationship.Customer = this.person;
    }

    this.scope
      .save()
      .subscribe((saved: Saved) => {
        this.goBack();
      },
      (error: Error) => {
        this.errorService.dialog(error);
      });
  }

  public goBack(): void {
    window.history.back();
  }
}
