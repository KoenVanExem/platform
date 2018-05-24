import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, UrlSegment } from '@angular/router';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ErrorService, Invoked, Loaded, MediaService, PdfService, Saved, Scope, WorkspaceService } from '../../../../../angular';
import { Good, RepeatingSalesInvoice, SalesInvoice, SalesInvoiceItem, SalesOrder, SalesTerm } from '../../../../../domain';
import { And, Equals, Fetch, Like, Path, Predicate, PullRequest, Query, TreeNode } from '../../../../../framework';
import { MetaDomain } from '../../../../../meta';

@Component({
  templateUrl: './invoice-overview.component.html',
})
export class InvoiceOverviewComponent implements OnInit, OnDestroy {

  public m: MetaDomain;
  public title = 'Sales Invoice Overview';
  public order: SalesOrder;
  public invoice: SalesInvoice;
  public repeatingInvoices: RepeatingSalesInvoice[];
  public repeatingInvoice: RepeatingSalesInvoice;
  public goods: Good[] = [];

  private subscription: Subscription;
  private scope: Scope;
  private refresh$: BehaviorSubject<Date>;

  constructor(
    private workspaceService: WorkspaceService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public mediaService: MediaService,
    public pdfService: PdfService,
    private changeDetectorRef: ChangeDetectorRef) {

    this.refresh$ = new BehaviorSubject<Date>(undefined);

    this.scope = this.workspaceService.createScope();
    this.m = this.workspaceService.metaPopulation.metaDomain;
  }

  public refresh(): void {
    this.refresh$.next(new Date());
  }

  public save(): void {

    this.scope
      .save()
      .subscribe((saved: Saved) => {
        this.snackBar.open('items saved', 'close', { duration: 1000 });
      },
      (error: Error) => {
        this.errorService.handle(error);
      });
  }

  public ngOnInit(): void {

    this.subscription = Observable.combineLatest(this.route.url, this.refresh$)
      .switchMap(([urlSegments, date]) => {

        const id: string = this.route.snapshot.paramMap.get('id');
        const m: MetaDomain = this.m;

        const fetches: Fetch[] = [
          new Fetch({
            id,
            include: [
              new TreeNode({
                nodes: [
                  new TreeNode({ roleType: m.SalesInvoiceItem.Product }),
                  new TreeNode({ roleType: m.SalesInvoiceItem.InvoiceItemType }),
                ],
                roleType: m.SalesInvoice.SalesInvoiceItems,
              }),
              new TreeNode({
                nodes: [
                  new TreeNode({ roleType: m.SalesTerm.TermType }),
                ],
                roleType: m.SalesInvoice.SalesTerms,
              }),
              new TreeNode({ roleType: m.SalesInvoice.BillToCustomer }),
              new TreeNode({ roleType: m.SalesInvoice.BillToContactPerson }),
              new TreeNode({ roleType: m.SalesInvoice.ShipToCustomer }),
              new TreeNode({ roleType: m.SalesInvoice.ShipToContactPerson }),
              new TreeNode({ roleType: m.SalesInvoice.ShipToEndCustomer }),
              new TreeNode({ roleType: m.SalesInvoice.ShipToEndCustomerContactPerson }),
              new TreeNode({ roleType: m.SalesInvoice.SalesInvoiceState }),
              new TreeNode({ roleType: m.SalesInvoice.CreatedBy }),
              new TreeNode({ roleType: m.SalesInvoice.LastModifiedBy }),
              new TreeNode({ roleType: m.SalesInvoice.SalesOrder }),
              new TreeNode({
                nodes: [
                  new TreeNode({
                    nodes: [
                      new TreeNode({ roleType: m.PostalBoundary.Country }),
                    ],
                    roleType: m.PostalAddress.PostalBoundary,
                  }),
                ],
                roleType: m.SalesInvoice.BillToContactMechanism,
              }),
              new TreeNode({
                nodes: [
                  new TreeNode({
                    nodes: [
                      new TreeNode({ roleType: m.PostalBoundary.Country }),
                    ],
                    roleType: m.PostalAddress.PostalBoundary,
                  }),
                ],
                roleType: m.SalesInvoice.ShipToAddress,
              }),
              new TreeNode({
                nodes: [
                  new TreeNode({
                    nodes: [
                      new TreeNode({ roleType: m.PostalBoundary.Country }),
                    ],
                    roleType: m.PostalAddress.PostalBoundary,
                  }),
                ],
                roleType: m.SalesInvoice.BillToEndCustomerContactMechanism,
              }),
              new TreeNode({
                nodes: [
                  new TreeNode({
                    nodes: [
                      new TreeNode({ roleType: m.PostalBoundary.Country }),
                    ],
                    roleType: m.PostalAddress.PostalBoundary,
                  }),
                ],
                roleType: m.SalesInvoice.ShipToEndCustomerAddress,
              }),
            ],
            name: 'invoice',
          }),
          new Fetch({
            id,
            name: 'order',
            path: new Path({ step: m.SalesInvoice.SalesOrder }),
          }),
        ];

        const predicate: And = new And();
        const predicates: Predicate[] = predicate.predicates;
        predicates.push(new Equals({ roleType: m.RepeatingSalesInvoice.Source, value: id }));

        const queries: Query[] = [
          new Query(
            {
              name: 'goods',
              objectType: m.Good,
            }),
          new Query(
            {
              name: 'repeatingInvoices',
              include: [
                new TreeNode({ roleType: this.m.RepeatingSalesInvoice.Frequency }),
                new TreeNode({ roleType: this.m.RepeatingSalesInvoice.DayOfWeek }),
              ],
              objectType: m.RepeatingSalesInvoice,
              predicate,
            }),
          ];

        return this.scope
          .load('Pull', new PullRequest({ fetches, queries }));
      })
      .subscribe((loaded) => {
        this.scope.session.reset();
        this.goods = loaded.collections.goods as Good[];
        this.order = loaded.objects.order as SalesOrder;
        this.invoice = loaded.objects.invoice as SalesInvoice;
        this.repeatingInvoices = loaded.collections.repeatingInvoices as RepeatingSalesInvoice[];
        if (this.repeatingInvoices.length > 0) {
          this.repeatingInvoice = this.repeatingInvoices[0];
        } else {
          this.repeatingInvoice = undefined;
        }
      },
      (error: any) => {
        this.errorService.handle(error);
        this.goBack();
      },
    );
  }

  public print() {
    this.pdfService.display(this.invoice);
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public goBack(): void {
    window.history.back();
  }

  public send(): void {
    this.scope.invoke(this.invoice.Send)
      .subscribe((invoked: Invoked) => {
        this.refresh();
        this.snackBar.open('Successfully sent.', 'close', { duration: 5000 });
      },
      (error: Error) => {
        this.errorService.handle(error);
      });
  }

  public cancel(): void {
    this.scope.invoke(this.invoice.CancelInvoice)
      .subscribe((invoked: Invoked) => {
        this.refresh();
        this.snackBar.open('Successfully cancelled.', 'close', { duration: 5000 });
      },
      (error: Error) => {
        this.errorService.handle(error);
      });
  }

  public writeOff(): void {
    this.scope.invoke(this.invoice.WriteOff)
      .subscribe((invoked: Invoked) => {
        this.refresh();
        this.snackBar.open('Successfully written off.', 'close', { duration: 5000 });
      },
      (error: Error) => {
        this.errorService.handle(error);
      });
  }

  public copy(): void {
    this.scope.invoke(this.invoice.Copy)
      .subscribe((invoked: Invoked) => {
        this.refresh();
        this.snackBar.open('Successfully copied.', 'close', { duration: 5000 });
      },
      (error: Error) => {
        this.errorService.handle(error);
      });
  }

  public deleteInvoiceItem(invoiceItem: SalesInvoiceItem): void {
    // TODO:
    /*  this.dialogService
      .openConfirm({ message: 'Are you sure you want to delete this item?' })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.scope.invoke(invoiceItem.Delete)
            .subscribe((invoked: Invoked) => {
              this.snackBar.open('Successfully deleted.', 'close', { duration: 5000 });
              this.refresh();
            },
            (error: Error) => {
              this.errorService.handle(error);
            });
        }
      }); */
  }

  public deleteSalesTerm(salesTerm: SalesTerm): void {
    // TODO:
   /*  this.dialogService
      .openConfirm({ message: 'Are you sure you want to delete this order term?' })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.scope.invoke(salesTerm.Delete)
            .subscribe((invoked: Invoked) => {
              this.snackBar.open('Successfully deleted.', 'close', { duration: 5000 });
              this.refresh();
            },
            (error: Error) => {
              this.errorService.handle(error);
            });
        }
      }); */
  }
}