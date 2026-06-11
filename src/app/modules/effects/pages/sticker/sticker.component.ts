import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../layout/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../layout/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../layout/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../layout/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../core/models/breadcrumb.model';
import { ToastService } from '../../../../core/services/toast.service';
import { STICKER_TABLE_COLUMNS } from '../../constants/sticker-table.columns';
import { StickerService } from '../../services/sticker.service';
import { StickerDialogComponent } from '../../components/sticker-dialog/sticker-dialog.component';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';

@Component({
  selector: 'app-sticker',
  imports: [BreadcrumbComponent, PageHeaderComponent, SearchBoxComponent, DataTableComponent, AppButtonComponent],
  templateUrl: './sticker.component.html',
  styleUrl: './sticker.component.scss',
})
export class StickerComponent implements OnInit {
  private readonly stickerService = inject(StickerService);
  private readonly toast = inject(ToastService);
  private readonly dialog = inject(MatDialog);

  readonly columns = STICKER_TABLE_COLUMNS;
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Sticker' },
  ];

  readonly rows = signal<Record<string, unknown>[]>([]);
  readonly selectedIds = signal<Array<number | string>>([]);
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

    this.stickerService
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

  openNew(): void {
    const ref = this.dialog.open(StickerDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      panelClass: 'agency-dialog-panel',
      autoFocus: 'first-titled-element',
    });

    ref.afterClosed().subscribe((created) => {
      if (created) this.loadData();
    });
  }

  deleteSelected(): void {
    if (this.selectedIds().length === 0) {
      this.toast.info('Select at least one row to delete');
      return;
    }
    // TODO: API bulk delete
    this.toast.warning('Delete selected will be available when API is connected');
  }

  onRowAction(_event: { action: string; row: Record<string, unknown> }): void {
    // TODO: edit/delete via API
  }

  onRowSelect(event: { row: Record<string, unknown>; selected: boolean }): void {
    const rowId = event.row['id'];
    if (rowId === undefined || rowId === null) return;

    this.selectedIds.update((ids) =>
      event.selected
        ? ids.includes(rowId as number | string)
          ? ids
          : [...ids, rowId as number | string]
        : ids.filter((id) => id !== rowId)
    );
  }
}
