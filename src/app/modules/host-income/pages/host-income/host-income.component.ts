import { Component, OnInit, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../layout/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../layout/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../layout/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../layout/components/data-table/data-table.component';
import { ToastService } from '../../../../core/services/toast.service';
import { BreadcrumbItem } from '../../../../core/models/breadcrumb.model';
import { HOST_INCOME_TABLE_COLUMNS } from '../../constants/host-income-table.columns';
import { HostIncomeService } from '../../services/host-income.service';

@Component({
  selector: 'app-host-income',
  imports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
  ],
  templateUrl: './host-income.component.html',
  styleUrl: './host-income.component.scss',
})
export class HostIncomeComponent implements OnInit {
  private readonly hostIncomeService = inject(HostIncomeService);
  private readonly toast = inject(ToastService);

  readonly columns = HOST_INCOME_TABLE_COLUMNS;

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Host', route: '/host/detail' },
    { label: 'Host Income' },
  ];

  readonly rows = signal<Record<string, unknown>[]>([]);
  readonly loading = signal(false);
  readonly searchQuery = signal('');
  readonly page = signal(1);
  readonly pageSize = signal(5);
  readonly total = signal(0);

  ngOnInit(): void {
    this.loadSettlements();
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.page.set(1);
    this.loadSettlements();
  }

  loadSettlements(): void {
    this.loading.set(true);

    this.hostIncomeService
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

  onPageChange(page: number): void {
    this.page.set(page);
    this.loadSettlements();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.page.set(1);
    this.loadSettlements();
  }

  onRowLink(event: { columnKey: string; row: Record<string, unknown> }): void {
    if (event.columnKey === 'hostInfoLabel') {
      // TODO: open host settlement detail modal / route
    }
  }
}
