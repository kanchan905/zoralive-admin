import { Component, inject, OnInit, signal } from '@angular/core';
import { NotificationService } from '../../../../core/services/notification.service';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../shared/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';
import { ACCEPTED_REDEEM_TABLE_COLUMNS } from '../../constants/accepted-redeem-table.columns';
import { AcceptedRedeemService } from '../../services/accepted-redeem.service';

@Component({
  selector: 'app-accepted-redeem',
  imports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
  ],
  templateUrl: './accepted-redeem.component.html',
  styleUrl: './accepted-redeem.component.scss',
})
export class AcceptedRedeemComponent implements OnInit {
  private readonly acceptedRedeemService = inject(AcceptedRedeemService);
  private readonly notify = inject(NotificationService);

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Agency' },
    { label: 'Accepted Redeem' },
  ];

  readonly columns = ACCEPTED_REDEEM_TABLE_COLUMNS;

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

    this.acceptedRedeemService
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
          this.notify.error('Failed to load accepted redeem requests');
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
    // TODO: edit / delete via API
  }

  exportToExcel(): void {
    // TODO: export API
  }

  openFilter(): void {
    // TODO: filter panel / dialog
  }

  openAddRedeem(): void {
    // TODO: add redeem dialog
  }
}
