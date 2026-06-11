import { Component, OnInit, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../layout/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../layout/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../layout/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../layout/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../core/models/breadcrumb.model';
import { ToastService } from '../../../../core/services/toast.service';
import { USER_PENDING_COMPLAIN_TABLE_COLUMNS } from '../../constants/pending-complain-table.columns';
import { UserPendingComplainService } from '../../services/pending-complain.service';

@Component({
  selector: 'app-user-pending-complain',
  imports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
  ],
  templateUrl: './pending-complain.component.html',
  styleUrl: './pending-complain.component.scss',
})
export class UserPendingComplainComponent implements OnInit {
  private readonly pendingComplainService = inject(UserPendingComplainService);
  private readonly toast = inject(ToastService);

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'User' },
    { label: 'Pending Complain' },
  ];

  readonly columns = USER_PENDING_COMPLAIN_TABLE_COLUMNS;
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

    this.pendingComplainService
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

  onViewDetail(_event: { columnKey: string; row: Record<string, unknown> }): void {
    // TODO: open pending complaint detail page
  }
}
