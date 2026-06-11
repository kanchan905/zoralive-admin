import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../layout/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../layout/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../layout/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../layout/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../core/models/breadcrumb.model';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { REPORT_USER_TABLE_COLUMNS } from '../../constants/report-user-table.columns';
import { ReportUserService } from '../../services/report-user.service';
import { AppSelectComponent } from '../../../../layout/components/select/select.component';

@Component({
  selector: 'app-report-user',
  imports: [
    FormsModule,
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
    AppSelectComponent,
  ],
  templateUrl: './report-user.component.html',
  styleUrl: './report-user.component.scss',
})
export class ReportUserComponent implements OnInit {
  private readonly reportUserService = inject(ReportUserService);
  private readonly toast = inject(ToastService);
  private readonly auth = inject(AuthService);

  readonly isAgencyView = this.auth.isAgency();

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
        agencyId: this.isAgencyView ? undefined : this.agencyFilter() || undefined,
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
