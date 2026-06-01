import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../core/services/notification.service';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';
import { HOST_STATUS_OPTIONS, HOST_TABLE_COLUMNS } from '../../constants/host-table.columns';
import { HostService } from '../../services/host.service';

@Component({
  selector: 'app-host-detail',
  imports: [FormsModule, BreadcrumbComponent, PageHeaderComponent, DataTableComponent],
  templateUrl: './host-detail.component.html',
  styleUrl: './host-detail.component.scss',
})
export class HostDetailComponent implements OnInit {
  private readonly hostService = inject(HostService);
  private readonly notify = inject(NotificationService);

  readonly statusOptions = HOST_STATUS_OPTIONS;
  readonly columns = HOST_TABLE_COLUMNS;
  readonly pageSizeOptions = [10, 25, 50, 100];

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Host' },
    { label: 'Host Detail' },
  ];

  readonly rows = signal<Record<string, unknown>[]>([]);
  readonly loading = signal(false);
  readonly page = signal(1);
  readonly pageSize = signal(100);

  /** Draft filters (UI) */
  statusFilter = '';
  fromDate = '';
  toDate = '';

  /** Applied filters (API) */
  private readonly appliedStatus = signal('');
  private readonly appliedFromDate = signal('');
  private readonly appliedToDate = signal('');
  readonly total = signal(0);

  ngOnInit(): void {
    this.loadHosts();
  }

  applyFilters(): void {
    this.appliedStatus.set(this.statusFilter);
    this.appliedFromDate.set(this.fromDate);
    this.appliedToDate.set(this.toDate);
    this.page.set(1);
    this.loadHosts();
  }

  loadHosts(): void {
    this.loading.set(true);

    this.hostService
      .getList({
        page: this.page(),
        pageSize: this.pageSize(),
        status: this.appliedStatus() || undefined,
        fromDate: this.appliedFromDate() || undefined,
        toDate: this.appliedToDate() || undefined,
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
          this.notify.error('Failed to load hosts');
        },
      });
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.loadHosts();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.page.set(1);
    this.loadHosts();
  }

  onRowAction(_event: { action: string; row: Record<string, unknown> }): void {
    // TODO: host actions via API
  }

  exportToExcel(): void {
    // TODO: export API
  }
}
