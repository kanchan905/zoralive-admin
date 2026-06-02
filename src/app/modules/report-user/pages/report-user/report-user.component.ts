import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../shared/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { REPORT_USER_TABLE_COLUMNS } from '../../constants/report-user-table.columns';
import { ReportUserService } from '../../services/report-user.service';

@Component({
  selector: 'app-report-user',
  imports: [
    FormsModule,
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
  ],
  templateUrl: './report-user.component.html',
  styleUrl: './report-user.component.scss',
})
export class ReportUserComponent implements OnInit {
  private readonly reportUserService = inject(ReportUserService);
  private readonly notify = inject(NotificationService);

  readonly columns = REPORT_USER_TABLE_COLUMNS;
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Report' },
  ];

  readonly agencyOptions = [
    { value: '', label: 'All Agency' },
    { value: '1', label: 'Agency 1' },
    { value: '2', label: 'Agency 2' },
  ];

  readonly rows = signal<Record<string, unknown>[]>([]);
  readonly loading = signal(false);
  readonly searchQuery = signal('');
  readonly agencyFilter = signal('');
  readonly page = signal(1);
  readonly pageSize = signal(5);
  readonly total = signal(0);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);

    this.reportUserService
      .getList({
        page: this.page(),
        pageSize: this.pageSize(),
        search: this.searchQuery(),
        agencyId: this.agencyFilter(),
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
          this.notify.error('Failed to load user reports');
        },
      });
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.page.set(1);
    this.loadData();
  }

  onAgencyChange(value: string): void {
    this.agencyFilter.set(value);
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

  onRowToggle(_event: { columnKey: string; row: Record<string, unknown>; value: boolean }): void {
    // TODO: patch block API integration
  }

  onRowAction(_event: { action: string; row: Record<string, unknown> }): void {
    // TODO: view detail / delete API integration
  }
}
