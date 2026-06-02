import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { VIP_PLAN_TABLE_COLUMNS } from '../../constants/vip-plan-table.columns';
import { VipPlanService } from '../../services/vip-plan.service';
import { VipPlanDialogComponent } from '../../components/vip-plan-dialog/vip-plan-dialog.component';

@Component({
  selector: 'app-vip-plan',
  imports: [BreadcrumbComponent, PageHeaderComponent, DataTableComponent],
  templateUrl: './vip-plan.component.html',
  styleUrl: './vip-plan.component.scss',
})
export class VipPlanComponent implements OnInit {
  private readonly vipPlanService = inject(VipPlanService);
  private readonly notify = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  readonly columns = VIP_PLAN_TABLE_COLUMNS;
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'VIP Plan' },
  ];

  readonly rows = signal<Record<string, unknown>[]>([]);
  readonly loading = signal(false);
  readonly page = signal(1);
  readonly pageSize = signal(5);
  readonly total = signal(0);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);

    this.vipPlanService
      .getList({
        page: this.page(),
        pageSize: this.pageSize(),
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
          this.notify.error('Failed to load VIP plans');
        },
      });
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
    const ref = this.dialog.open(VipPlanDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      panelClass: 'agency-dialog-panel',
      autoFocus: 'first-titled-element',
    });

    ref.afterClosed().subscribe((created) => {
      if (created) this.loadData();
    });
  }

  onRowToggle(_event: { columnKey: string; row: Record<string, unknown>; value: boolean }): void {
    // TODO: patch active API integration
  }

  onRowAction(_event: { action: string; row: Record<string, unknown> }): void {
    // TODO: edit/delete API integration
  }
}
