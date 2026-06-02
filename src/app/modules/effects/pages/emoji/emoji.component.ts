import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../shared/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { EMOJI_TABLE_COLUMNS } from '../../constants/emoji-table.columns';
import { EmojiService } from '../../services/emoji.service';
import { EmojiDialogComponent } from '../../components/emoji-dialog/emoji-dialog.component';

@Component({
  selector: 'app-emoji',
  imports: [BreadcrumbComponent, PageHeaderComponent, SearchBoxComponent, DataTableComponent],
  templateUrl: './emoji.component.html',
  styleUrl: './emoji.component.scss',
})
export class EmojiComponent implements OnInit {
  private readonly emojiService = inject(EmojiService);
  private readonly notify = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  readonly columns = EMOJI_TABLE_COLUMNS;
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Emoji' },
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

    this.emojiService
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
          this.notify.error('Failed to load emojis');
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
    const ref = this.dialog.open(EmojiDialogComponent, {
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
