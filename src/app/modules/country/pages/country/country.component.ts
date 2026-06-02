import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../shared/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { COUNTRY_TABLE_COLUMNS } from '../../constants/country-table.columns';
import { CountryService } from '../../services/country.service';
import { CountryDialogComponent } from '../../components/country-dialog/country-dialog.component';

@Component({
  selector: 'app-country',
  imports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
  ],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss',
})
export class CountryComponent implements OnInit {
  private readonly countryService = inject(CountryService);
  private readonly notify = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  readonly columns = COUNTRY_TABLE_COLUMNS;
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Country' },
  ];

  readonly rows = signal<Record<string, unknown>[]>([]);
  readonly selectedCountryIds = signal<Array<number | string>>([]);
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

    this.countryService
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
          this.notify.error('Failed to load countries');
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

  openNewCountry(): void {
    const ref = this.dialog.open(CountryDialogComponent, {
      width: '380px',
      maxWidth: '95vw',
      panelClass: 'agency-dialog-panel',
      autoFocus: 'first-titled-element',
    });

    ref.afterClosed().subscribe((created) => {
      if (created) {
        this.loadData();
      }
    });
  }

  deleteAll(): void {
    if (this.selectedCountryIds().length === 0) {
      this.notify.info('Select at least one row to delete');
      return;
    }

    // TODO: call delete-many API with selected ids
    this.notify.warning('Bulk delete will be available when the API is connected');
  }

  onRowAction(_event: { action: string; row: Record<string, unknown> }): void {
    // TODO: edit / delete via API
  }

  onRowSelect(event: { row: Record<string, unknown>; selected: boolean }): void {
    const rowId = event.row['id'];
    if (rowId === undefined || rowId === null) return;

    this.selectedCountryIds.update((ids) => {
      if (event.selected) {
        return ids.includes(rowId as number | string) ? ids : [...ids, rowId as number | string];
      }
      return ids.filter((id) => id !== rowId);
    });
  }
}
