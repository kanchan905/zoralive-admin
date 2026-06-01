import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../../core/services/notification.service';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../shared/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';
import { AgencyDialogComponent } from '../../components/agency-dialog/agency-dialog.component';
import { AGENCY_TABLE_COLUMNS } from '../../constants/agency-table.columns';
import { AgencyService } from '../../services/agency.service';

@Component({
  selector: 'app-agency-detail',
  imports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
  ],
  templateUrl: './agency-detail.component.html',
  styleUrl: './agency-detail.component.scss',
})
export class AgencyDetailComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly agencyService = inject(AgencyService);
  private readonly notify = inject(NotificationService);

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Agency' },
    { label: 'Agency Detail' },
  ];

  /** Columns stay on this page — other pages pass their own columns to app-data-table */
  readonly columns = AGENCY_TABLE_COLUMNS;

  readonly rows = signal<Record<string, unknown>[]>([]);
  readonly loading = signal(false);
  readonly searchQuery = signal('');
  readonly page = signal(1);
  readonly pageSize = signal(5);
  readonly total = signal(0);

  ngOnInit(): void {
    this.loadAgencies();
  }

  loadAgencies(): void {
    this.loading.set(true);

    this.agencyService
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
          this.notify.error('Failed to load agencies');
        },
      });
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.page.set(1);
    this.loadAgencies();
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.loadAgencies();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.page.set(1);
    this.loadAgencies();
  }

  onRowAction(_event: { action: string; row: Record<string, unknown> }): void {
    // TODO: edit / delete via API
  }

  onRowLink(_event: { columnKey: string; row: Record<string, unknown> }): void {
    // TODO: navigate or open detail
  }

  onToggleChange(_event: { columnKey: string; row: Record<string, unknown>; value: boolean }): void {
    // TODO: PATCH disable status via API
  }

  exportToExcel(): void {
    // export API when ready
  }

  openAgencyModal(): void {
    const ref = this.dialog.open(AgencyDialogComponent, {
      width: '560px',
      maxWidth: '95vw',
      panelClass: 'agency-dialog-panel',
      autoFocus: 'first-titled-element',
    });

    ref.afterClosed().subscribe((created) => {
      if (created) {
        this.loadAgencies();
      }
    });
  }
}
