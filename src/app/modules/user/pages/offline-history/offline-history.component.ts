import { Component, OnInit, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../layout/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../layout/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../layout/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../layout/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../core/models/breadcrumb.model';
import { ToastService } from '../../../../core/services/toast.service';
import { OFFLINE_HISTORY_TABLE_COLUMNS } from '../../constants/offline-history-table.columns';
import { OfflineHistoryService } from '../../services/offline-history.service';

@Component({
  selector: 'app-offline-history',
  imports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
  ],
  templateUrl: './offline-history.component.html',
  styleUrl: './offline-history.component.scss',
})
export class OfflineHistoryComponent implements OnInit {
  private readonly offlineHistoryService = inject(OfflineHistoryService);
  private readonly toast = inject(ToastService);

  readonly columns = OFFLINE_HISTORY_TABLE_COLUMNS;

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'User' },
    { label: 'Offline Recharge History' },
  ];

  readonly rows = signal<Record<string, unknown>[]>([]);
  readonly loading = signal(false);
  readonly searchQuery = signal('');
  readonly page = signal(1);
  readonly pageSize = signal(5);
  readonly total = signal(0);

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.loading.set(true);

    this.offlineHistoryService
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
    this.loadHistory();
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.loadHistory();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.page.set(1);
    this.loadHistory();
  }
}
