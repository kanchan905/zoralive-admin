import { Component, OnInit, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../layout/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../layout/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../layout/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../layout/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../core/models/breadcrumb.model';
import { ToastService } from '../../../../core/services/toast.service';
import { HOST_REQUEST_TABLE_COLUMNS } from '../../constants/host-request-table.columns';
import { HostRequestService } from '../../services/host-request.service';

@Component({
  selector: 'app-host-request',
  imports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
  ],
  templateUrl: './host-request.component.html',
  styleUrl: './host-request.component.scss',
})
export class HostRequestComponent implements OnInit {
  private readonly hostRequestService = inject(HostRequestService);
  private readonly toast = inject(ToastService);

  readonly columns = HOST_REQUEST_TABLE_COLUMNS;
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Request' },
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

    this.hostRequestService
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

  onRowAction(_event: { action: string; row: Record<string, unknown> }): void {
    // TODO: add accept/decline/edit actions
  }

  onToggleChange(_event: { columnKey: string; row: Record<string, unknown>; value: boolean }): void {
    // TODO: PATCH request state via API
  }
}
