import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../shared/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { CATEGORY_TABLE_COLUMNS } from '../../constants/category-table.columns';
import { CategoryService } from '../../services/category.service';
import { CategoryDialogComponent } from '../../components/category-dialog/category-dialog.component';

@Component({
  selector: 'app-category',
  imports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly notify = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  readonly columns = CATEGORY_TABLE_COLUMNS;
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Category' },
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

    this.categoryService
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
          this.notify.error('Failed to load categories');
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
    const ref = this.dialog.open(CategoryDialogComponent, {
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
      this.notify.info('Select at least one row to delete');
      return;
    }
    // TODO: API bulk delete
    this.notify.warning('Delete selected will be available when API is connected');
  }

  onRowAction(_event: { action: string; row: Record<string, unknown> }): void {
    // TODO: edit/delete api
  }

  onRowToggle(_event: { columnKey: string; row: Record<string, unknown>; value: boolean }): void {
    // TODO: patch isTop api
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
