import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../shared/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { PURCHASE_PLAN_TABLE_COLUMNS } from '../../constants/purchase-plan-table.columns';
import { PurchasePlanService } from '../../services/purchase-plan.service';
import { PurchasePlanDialogComponent } from '../../components/purchase-plan-dialog/purchase-plan-dialog.component';

@Component({
  selector: 'app-purchase-plan',
  imports: [BreadcrumbComponent, PageHeaderComponent, SearchBoxComponent, DataTableComponent],
  templateUrl: './purchase-plan.component.html',
  styleUrl: './purchase-plan.component.scss',
})
export class PurchasePlanComponent implements OnInit {
  private readonly purchasePlanService = inject(PurchasePlanService);
  private readonly notify = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  readonly columns = PURCHASE_PLAN_TABLE_COLUMNS;
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Plan' },
  ];

  readonly rows = signal<Record<string, unknown>[]>([]);
  readonly loading = signal(false);
  readonly searchQuery = signal('');
  readonly page = signal(1);
  readonly pageSize = signal(5);
  readonly total = signal(0);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);

    this.purchasePlanService
      .getList({
        page: this.page(),
        pageSize: this.pageSize(),
        search: this.searchQuery(),
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (res) => {
          this.rows.set(res.data as unknown as Record<string, unknown>[]);
          this.total.set(res.total);
        },
        error: () => {
          this.rows.set([]);
          this.total.set(0);
          this.notify.error('Failed to load purchase plans');
        },
      });
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.page.set(1);
    this.loadData();
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.loadData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.page.set(1);
    this.loadData();
  }

  openNew(): void {
    const ref = this.dialog.open(PurchasePlanDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      panelClass: 'agency-dialog-panel',
      autoFocus: 'first-titled-element',
    });

    ref.afterClosed().subscribe((created) => {
      if (created) this.loadData();
    });
  }

  onRowAction(_event: { action: string; row: Record<string, unknown> }): void {
    // TODO: edit/delete API integration
  }
}
