import { Component, inject, OnInit, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../layout/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../layout/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../layout/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../layout/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../core/models/breadcrumb.model';
import { REVENUE_TABLE_COLUMNS } from '../../constants/revenue-table.columns';
import { RevenueService } from '../../services/revenue.service';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';

@Component({
  selector: 'app-revenue',
  imports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
    AppButtonComponent,
  ],
  templateUrl: './revenue.component.html',
})
export class RevenueComponent implements OnInit {
  private readonly revenueService = inject(RevenueService);

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Agency' },
    { label: 'Revenue' },
  ];

  readonly columns = REVENUE_TABLE_COLUMNS;

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

    this.revenueService
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
    // TODO: view revenue detail via API
  }

  exportToExcel(): void {
    // TODO: export API
  }

  openFilter(): void {
    // TODO: filter panel / dialog
  }
}
