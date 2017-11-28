import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TdMediaService } from "@covalent/core";
import { BehaviorSubject, Subscription } from "rxjs/Rx";

import { MetaDomain, SalesInvoice } from "@allors/workspace";
import { Scope, WorkspaceService, ErrorService, Loaded } from "@allors/base-angular";
import { Fetch, PullRequest } from "@allors/framework";

@Component({
  encapsulation: ViewEncapsulation.Native,
  template: `<div [innerHTML]="body"></div>`,
  styles: [`
invoice-box {
    max-width: 800px;
    min-width: 800px;
    margin: auto;
    padding: 50px 30px 30px 30px;
    font-size: 13px;
    font-weight: normal;
    line-height: 13px;
    font-family:"Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
    color: #555;
}

    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }

tr.ruler-top-normal td {
    border-top: 1px solid #000;
}

tr.ruler-bottom-normal td {
    border-bottom: 1px solid #000;
}

tr.ruler-top td {
    border-top: 2px solid #000;
}

tr.ruler-bottom td {
    border-bottom: 2px solid #000;
}

.invoice-box table td {
    padding-top: 2px;
    vertical-align: top;
}

    .invoice-box table td.amount {
        text-align: right;
    }

tr.top table tr td.title {
    font-size: 24px;
    font-weight: bold;
    vertical-align: middle;
    text-align: left;
    color: #000;
}

.invoice-box table tr.top table tr td.number {
    font-size: 20px;
    font-weight: bold;
    vertical-align: middle;
    text-align: right;
}

.invoice-box table tr.header td {
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 5px;
    font-weight: bold;
    vertical-align: middle;
    text-align: left;
}

.invoice-box table tr.item td {
    padding-top: 5px;
    padding-right: 5px;
}

.headerSpacer {
    height: 20px;
}

.logo {
    max-width: 200px;
    float: left;
}

.description {
    padding-top: 30px;
    padding-bottom: 15px;
    font-weight: bold;
}

.totals {
    float: right;
    width: 35%;
    position: relative;
    top: 100px;
}

.bold {
    font-weight: bold;
}

.footer {
    position: absolute;
    bottom: 10px;
}

    .footer p {
        margin: 3px;
        font-size: 8px;
        line-height: 10px;
        text-align: left;
        font-weight: normal;
    }

@media print {
  @page {
      size: auto; /* auto is the initial value */
      margin: 0; /* this affects the margin in the printer settings */
  }
}
`]
})

export class InvoicePrintComponent implements OnInit, AfterViewInit, OnDestroy {

  public m: MetaDomain;
  public invoice: SalesInvoice;
  public body: string;

  private subscription: Subscription;
  private scope: Scope;

  constructor(
    private workspaceService: WorkspaceService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    public media: TdMediaService, private changeDetectorRef: ChangeDetectorRef) {

    this.scope = this.workspaceService.createScope()
    this.m = this.workspaceService.metaPopulation.metaDomain;
  }

  public ngOnInit(): void {

    this.subscription = this.route.url
      .switchMap((url: any) => {

        const id: string = this.route.snapshot.paramMap.get("id");
        const m: MetaDomain = this.m;

        const fetch: Fetch[] = [
          new Fetch({
            id,
            name: "invoice",
          }),
        ];

        return this.scope
          .load("Pull", new PullRequest({ fetch }));
      })
      .subscribe((loaded: Loaded) => {
        this.invoice = loaded.objects.invoice as SalesInvoice;
        const printContent = this.invoice.PrintContent;

        const wrapper = document.createElement("div");
        wrapper.innerHTML = printContent;
        this.body = wrapper.querySelector("#dataContainer").innerHTML;
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

  public goBack(): void {
    window.history.back();
  }
}
