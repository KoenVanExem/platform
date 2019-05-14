import { Component, Self, HostBinding } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { PanelService, MetaService, RefreshService, Action, NavigationService, TestScope, ContextService, FetcherService, ActionTarget } from '../../../../../../angular';
import { InvoiceItemType, PurchaseOrder, PurchaseOrderItem, PurchaseInvoice, PurchaseInvoiceItem, Organisation, OrderItemBilling } from '../../../../../../domain';
import { Meta } from '../../../../../../meta';
import { DeleteService, TableRow, Table, OverviewService, PrintService, SaveService, MethodService } from '../../../../..';
import { ObjectService, ObjectData } from '../../../../../base/services/object';

interface Row extends TableRow {
    object: PurchaseOrder;
    number: string;
    description: string;
    reference: string;
    totalExVat: string;
    state: string;
    shipmentState: string;
    paymentState: string;
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'purchaseorderinvoice-overview-panel',
    templateUrl: './purchaseorderinvoice-overview-panel.component.html',
    providers: [ContextService, PanelService]
})
export class PurchaseOrderInvoiceOverviewPanelComponent extends TestScope {
    internalOrganisation: Organisation;
    purchaseInvoice: PurchaseInvoice;

    @HostBinding('class.expanded-panel') get expandedPanelClass() {
        return this.panel.isExpanded;
    }

    m: Meta;

    objects: PurchaseOrder[];
    table: Table<Row>;
    partItem: InvoiceItemType;
    workItem: InvoiceItemType;
    orderItemBillings: OrderItemBilling[];

    delete: Action;
    edit: Action;
    invoice: Action;
    addToInvoice: Action;
    removeFromInvoice: Action;

    get createData(): ObjectData {
        return {
            associationId: this.panel.manager.id,
            associationObjectType: this.panel.manager.objectType,
        };
    }

    constructor(
        @Self() public allors: ContextService,
        @Self() public panel: PanelService,
        public metaService: MetaService,
        public objectService: ObjectService,
        public factoryService: ObjectService,
        public methodService: MethodService,
        public refreshService: RefreshService,
        public navigationService: NavigationService,
        public overviewService: OverviewService,
        public deleteService: DeleteService,
        public printService: PrintService,
        private saveService: SaveService,
        private snackBar: MatSnackBar,
        private fetcher: FetcherService,
    ) {
        super();

        this.m = this.metaService.m;

        this.panel.name = 'purchaseorder';
        this.panel.title = 'Purchase Orders';
        this.panel.icon = 'message';
        this.panel.expandable = true;

        this.delete = this.deleteService.delete(this.panel.manager.context);

        this.addToInvoice = {
            name: () => 'Add to invoice',
            description: () => '',
            disabled: (target: PurchaseOrder) => {
                return !target.CanExecuteInvoice;
            },
            execute: (target: PurchaseOrder) => {
                if (!Array.isArray(target)) {
                    this.addFromPurchaseOrder(target);
                }
            },
            result: null
        };

        this.removeFromInvoice = {
            name: () => 'Remove from invoice',
            description: () => '',
            disabled: (target: PurchaseOrder) => {
                return !this.purchaseInvoice.PurchaseOrders.includes(target);
            },
            execute: (target: PurchaseOrder) => {
                if (!Array.isArray(target)) {
                    this.removeFromPurchaseOrder(target);
                }
            },
            result: null
        };

        // this.invoice.result.subscribe((v) => {
        //   this.table.selection.clear();
        // });

        const sort = true;
        this.table = new Table({
            selection: true,
            columns: [
                { name: 'number', sort },
                { name: 'description', sort },
                { name: 'reference', sort },
                { name: 'totalExVat', sort },
                { name: 'state', sort },
                { name: 'shipmentState', sort },
                { name: 'paymentState', sort },
            ],
            actions: [
                this.overviewService.overview(),
                this.printService.print(),
                this.addToInvoice,
                this.removeFromInvoice
            ],
            defaultAction: this.overviewService.overview(),
            autoSort: true,
            autoFilter: true,
        });

        if (this.panel.manager.objectType === this.metaService.m.PurchaseInvoice) {
            this.table.actions.push(this.delete);
        }

        const pullName = `${this.panel.name}_${this.m.PurchaseOrder.name}`;
        const invoicePullName = `${this.panel.name}_${this.m.PurchaseInvoice.name}`;
        const orderItemBillingPullName = `${this.panel.name}_${this.m.OrderItemBilling.name}`;

        this.panel.onPull = (pulls) => {
            const { x, pull } = this.metaService;
            const { id } = this.panel.manager;

            pulls.push(
                this.fetcher.internalOrganisation,
                pull.InvoiceItemType(),
                pull.PurchaseInvoice({
                    name: pullName,
                    object: id,
                    fetch: {
                        BilledFrom: {
                            PurchaseOrdersWhereTakenViaSupplier: {
                                include: {
                                    PurchaseOrderState: x,
                                    PurchaseOrderShipmentState: x,
                                    PurchaseOrderPaymentState: x,
                                    ValidOrderItems: {
                                        PurchaseOrderItem_Part: x,
                                    },
                                    PrintDocument: {
                                        Media: x
                                    },
                                },
                            }
                        }
                    }
                }),
                // pull.PurchaseInvoice({
                //     name: orderItemBillingPullName,
                //     object: id,
                //     fetch: {
                //         PurchaseInvoiceItems: {
                //             OrderItemBillingsWhereInvoiceItem: {
                //                 include: {
                //                     InvoiceItem: x,
                //                     OrderItem: x
                //                 }
                //             }
                //         }
                //     }
                // }),
                pull.PurchaseInvoice({
                    name: invoicePullName,
                    object: id,
                    include: {
                        PurchaseOrders: x,
                        PurchaseInvoiceItems: {
                            Part: x,
                            InvoiceItemType: x,
                        }
                    }
                }),
            );
        };

        this.panel.onPulled = (loaded) => {
            this.internalOrganisation = loaded.objects.InternalOrganisation as Organisation;
            this.purchaseInvoice = loaded.objects[invoicePullName] as PurchaseInvoice;
            // this.orderItemBillings = loaded.collections[orderItemBillingPullName] as OrderItemBilling[];

            const invoiceItemTypes = loaded.collections.InvoiceItemTypes as InvoiceItemType[];
            this.partItem = invoiceItemTypes.find((v: InvoiceItemType) => v.UniqueId === 'ff2b943d57c943119c569ff37959653b');
            this.workItem = invoiceItemTypes.find((v: InvoiceItemType) => v.UniqueId === 'a4d2e6d0c6c146eca1cf3a64822e7a9e');

            const purchaseOrders = loaded.collections[pullName] as PurchaseOrder[];
            this.objects = purchaseOrders.filter(v => v.OrderedBy === this.internalOrganisation);
            this.objects.sort((a, b) => (a.OrderNumber > b.OrderNumber) ? 1 : ((b.OrderNumber > a.OrderNumber) ? -1 : 0));

            if (this.objects) {
                this.table.total = loaded.values[`${pullName}_total`] || this.objects.length;
                this.table.data = this.objects.map((v) => {
                    return {
                        object: v,
                        number: v.OrderNumber,
                        description: v.Description,
                        reference: v.CustomerReference,
                        totalExVat: v.TotalExVat.toString(),
                        state: v.PurchaseOrderState.Name,
                        shipmentState: v.PurchaseOrderShipmentState.Name,
                        paymentState: v.PurchaseOrderPaymentState.Name,
                    } as Row;
                });
            }
        };
    }

    public addFromPurchaseOrder(panelPurchaseOrder: PurchaseOrder): void {
        const { context } = this.allors;

        const purchaseInvoice = context.get(this.purchaseInvoice.id) as PurchaseInvoice;
        const purchaseOrder = context.get(panelPurchaseOrder.id) as PurchaseOrder;

        purchaseInvoice.AddPurchaseOrder(purchaseOrder);

        purchaseOrder.ValidOrderItems.forEach((purchaseOrderItem: PurchaseOrderItem) => {
            if (purchaseOrderItem.CanInvoice) {
                const invoiceItem = context.create('PurchaseInvoiceItem') as PurchaseInvoiceItem;
                invoiceItem.AssignedUnitPrice = purchaseOrderItem.UnitPrice;
                invoiceItem.Part = purchaseOrderItem.Part;
                invoiceItem.Quantity = purchaseOrderItem.QuantityOrdered;
                invoiceItem.Description = purchaseOrderItem.Description;
                invoiceItem.InternalComment = purchaseOrderItem.InternalComment;
                invoiceItem.Message = purchaseOrderItem.Message;

                if (invoiceItem.Part) {
                    invoiceItem.InvoiceItemType = this.partItem;
                } else {
                    invoiceItem.InvoiceItemType = this.workItem;
                }

                purchaseInvoice.AddPurchaseInvoiceItem(invoiceItem);

                const orderItemBilling = context.create('OrderItemBilling') as OrderItemBilling;
                orderItemBilling.Quantity = purchaseOrderItem.QuantityOrdered;
                orderItemBilling.Amount = purchaseOrderItem.TotalBasePrice;
                orderItemBilling.OrderItem = purchaseOrderItem;
                orderItemBilling.InvoiceItem = invoiceItem;
            }
        });

        context
            .save()
            .subscribe(() => {
                this.snackBar.open('Successfully saved.', 'close', { duration: 5000 });
                this.refreshService.refresh();
            },
                this.saveService.errorHandler
            );
    }

    public removeFromPurchaseOrder(panelPurchaseOrder: PurchaseOrder): void {
        const { context } = this.allors;

        const purchaseInvoice = context.get(this.purchaseInvoice.id) as PurchaseInvoice;
        const purchaseOrder = context.get(panelPurchaseOrder.id) as PurchaseOrder;

        purchaseInvoice.RemovePurchaseOrder(purchaseOrder);

        purchaseOrder.ValidOrderItems.forEach((purchaseOrderItem: PurchaseOrderItem) => {
            const orderItemBilling = this.orderItemBillings.find(v => v.OrderItem === purchaseOrderItem);
            if (orderItemBilling) {
               const dummy = orderItemBilling.InvoiceItem.Delete;
            }
        });

        context
            .save()
            .subscribe(() => {
                this.snackBar.open('Successfully saved.', 'close', { duration: 5000 });
                this.refreshService.refresh();
            },
                this.saveService.errorHandler
            );
    }

    public addFromPurchaseOrders(purchaseOrders: PurchaseOrder[]): void {

        purchaseOrders.forEach(element => {
            this.addFromPurchaseOrder(element);
        });
    }
}
