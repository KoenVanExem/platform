import { Component, Self, HostBinding } from '@angular/core';
import { PanelService, NavigationService, RefreshService, Action, MetaService, ActionTarget, Invoked, ContextService, InternalOrganisationId, FetcherService, TestScope } from '../../../../../../angular';
import { RepeatingPurchaseInvoice, Organisation } from '../../../../../../domain';
import { Meta } from '../../../../../../meta';
import { DeleteService, TableRow, Table, EditService, MethodService } from '../../../../..';
import { Equals } from '../../../../../../framework';
import * as moment from 'moment';

import { MatSnackBar } from '@angular/material';

import { ObjectData, ObjectService } from '../../../../../../material/base/services/object';
import { repeat } from 'rxjs/operators';

interface Row extends TableRow {
  object: RepeatingPurchaseInvoice;
  frequency: string;
  dayOfWeek: string;
  previousExecutionDate: string;
  nextExecutionDate: string;
  finalExecutionDate: string;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'repeatingpurchaseinvoice-overview-panel',
  templateUrl: './repeatingpurchaseinvoice-overview-panel.component.html',
  providers: [ContextService, PanelService]
})
export class RepeatingPurchaseInvoiceOverviewPanelComponent extends TestScope {

  @HostBinding('class.expanded-panel') get expandedPanelClass() {
    return this.panel.isExpanded;
  }

  m: Meta;

  internalOrganisation: Organisation;
  objects: RepeatingPurchaseInvoice[] = [];
  table: Table<Row>;

  delete: Action;
  edit: Action;

  get createData(): ObjectData {
    return {
      associationId: this.panel.manager.id,
      associationObjectType: this.panel.manager.objectType,
    };
  }

  constructor(
    @Self() public allors: ContextService,
    @Self() public panel: PanelService,
    public objectService: ObjectService,
    public metaService: MetaService,
    public refreshService: RefreshService,
    public navigation: NavigationService,
    public methodService: MethodService,
    public editService: EditService,
    public deleteService: DeleteService,
    public snackBar: MatSnackBar,
    private fetcher: FetcherService,
    private internalOrganisationId: InternalOrganisationId,
  ) {
    super();

    this.m = this.metaService.m;

    panel.name = 'repeatinginvoice';
    panel.title = 'Repeating Invoices';
    panel.icon = 'business';
    panel.expandable = true;

    this.delete = deleteService.delete(panel.manager.context);
    this.edit = this.editService.edit();

    const sort = true;
    this.table = new Table({
      selection: true,
      columns: [
        { name: 'frequency', sort },
        { name: 'dayOfWeek', sort },
        { name: 'previousExecutionDate', sort },
        { name: 'nextExecutionDate', sort },
        { name: 'finalExecutionDate', sort },
      ],
      actions: [
        this.edit,
        this.delete,
      ],
      defaultAction: this.edit,
      autoSort: true,
      autoFilter: true,
    });

    const pullName = `${panel.name}_${this.m.RepeatingPurchaseInvoice.name}`;

    panel.onPull = (pulls) => {
      const { pull, x, m } = this.metaService;

      const id = this.panel.manager.id;

      pulls.push(
        this.fetcher.internalOrganisation,
        pull.Organisation({
          name: pullName,
          object: id,
          fetch: {
            RepeatingPurchaseInvoicesWhereSupplier: {
              include: {
                InternalOrganisation: x,
                Frequency: x,
                DayOfWeek: x
              }
            }
          }
        }),
      );
    };

    panel.onPulled = (loaded) => {

      this.internalOrganisation = loaded.objects.InternalOrganisation as Organisation;

      const repeatingInvoices = loaded.collections[pullName] as RepeatingPurchaseInvoice[];
      this.objects = repeatingInvoices.filter(v => v.InternalOrganisation === this.internalOrganisation)

      this.table.data = this.objects.map((v) => {
        return {
          object: v,
          frequency: v.Frequency.Name,
          dayOfWeek: v.DayOfWeek && v.DayOfWeek.Name,
          previousExecutionDate: v.PreviousExecutionDate && moment(v.PreviousExecutionDate).format('L'),
          nextExecutionDate: v.NextExecutionDate && moment(v.NextExecutionDate).format('L'),
          finalExecutionDate: v.FinalExecutionDate && moment(v.FinalExecutionDate).format('L'),
        } as Row;
      });
    };
  }
}
