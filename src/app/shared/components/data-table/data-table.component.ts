import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableColumn } from '../../models/table-column.model';
import {
  TableRowActionEvent,
  TableRowLinkEvent,
  TableRowSelectEvent,
  TableRowToggleEvent,
} from '../../models/table-events.model';

/**
 * Presentational table — no API calls, no static rows.
 * Parent page passes [columns], [rows], [total] from its service.
 */
@Component({
  selector: 'app-data-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent {
  readonly columns = input<TableColumn[]>([]);
  readonly rows = input<Record<string, unknown>[]>([]);
  readonly loading = input(false);
  readonly rowTrackKey = input('id');
  readonly selectedRowIds = input<unknown[]>([]);

  readonly emptyTitle = input('No data found');
  readonly emptyMessage = input('');
  readonly emptyActionLabel = input('');
  readonly emptyImage = input('assets/no-data.svg');
  readonly emptyDisplay = input<'illustration' | 'text'>('illustration');

  readonly page = input(1);
  readonly pageSize = input(5);
  readonly total = input(0);
  readonly pageSizeOptions = input<number[]>([5, 10, 25, 50]);
  readonly showPagination = input(true);
  readonly stickyHeader = input(false);
  readonly zebraRows = input(false);

  readonly pageChange = output<number>();
  readonly pageSizeChange = output<number>();
  readonly emptyAction = output<void>();
  readonly rowAction = output<TableRowActionEvent>();
  readonly rowLinkClick = output<TableRowLinkEvent>();
  readonly rowToggleChange = output<TableRowToggleEvent>();
  readonly rowSelectChange = output<TableRowSelectEvent>();

  readonly isEmpty = computed(() => !this.loading() && this.rows().length === 0);
  readonly rangeStart = computed(() => {
    if (this.total() === 0) return 0;
    return (this.page() - 1) * this.pageSize() + 1;
  });
  readonly rangeEnd = computed(() => {
    if (this.total() === 0) return 0;
    return Math.min(this.page() * this.pageSize(), this.total());
  });
  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.total() / this.pageSize()) || 1)
  );

  trackRow(index: number, row: Record<string, unknown>): unknown {
    return row[this.rowTrackKey()] ?? index;
  }

  getCellValue(row: Record<string, unknown>, key: string): unknown {
    return row[key];
  }

  statusVariant(value: unknown): string {
    const raw = String(value ?? '')
      .trim()
      .toLowerCase();
    if (raw === 'online' || raw === 'live' || raw === 'offline') {
      return raw;
    }
    return 'default';
  }

  statusLabel(value: unknown): string {
    const raw = String(value ?? '').trim();
    return raw || '—';
  }

  onPageSizeChange(value: string): void {
    this.pageSizeChange.emit(Number(value));
  }

  goToPage(page: number): void {
    const clamped = Math.min(Math.max(1, page), this.totalPages());
    if (clamped !== this.page()) {
      this.pageChange.emit(clamped);
    }
  }

  onEmptyAction(): void {
    this.emptyAction.emit();
  }

  onRowAction(action: 'edit' | 'delete', row: Record<string, unknown>): void {
    this.rowAction.emit({ action, row });
  }

  onRowLink(columnKey: string, row: Record<string, unknown>): void {
    this.rowLinkClick.emit({ columnKey, row });
  }

  onToggle(columnKey: string, row: Record<string, unknown>, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.rowToggleChange.emit({ columnKey, row, value: checked });
  }

  isRowSelected(row: Record<string, unknown>): boolean {
    const rowId = row[this.rowTrackKey()];
    return rowId !== undefined && this.selectedRowIds().includes(rowId);
  }

  onRowSelect(row: Record<string, unknown>, event: Event): void {
    const selected = (event.target as HTMLInputElement).checked;
    this.rowSelectChange.emit({ row, selected });
  }

  hasSelectableRows(): boolean {
    return this.rows().some((row) => this.getRowId(row) !== undefined && this.getRowId(row) !== null);
  }

  areAllRowsSelected(): boolean {
    const selectableIds = this.rows()
      .map((row) => this.getRowId(row))
      .filter((id): id is unknown => id !== undefined && id !== null);
    if (selectableIds.length === 0) return false;
    return selectableIds.every((id) => this.selectedRowIds().includes(id));
  }

  isSomeRowsSelected(): boolean {
    const selectableIds = this.rows()
      .map((row) => this.getRowId(row))
      .filter((id): id is unknown => id !== undefined && id !== null);
    if (selectableIds.length === 0) return false;
    const selectedCount = selectableIds.filter((id) => this.selectedRowIds().includes(id)).length;
    return selectedCount > 0 && selectedCount < selectableIds.length;
  }

  onSelectAllRows(event: Event): void {
    const selected = (event.target as HTMLInputElement).checked;
    this.rows().forEach((row) => {
      const rowId = this.getRowId(row);
      if (rowId === undefined || rowId === null) return;
      this.rowSelectChange.emit({ row, selected });
    });
  }

  private getRowId(row: Record<string, unknown>): unknown {
    return row[this.rowTrackKey()];
  }
}
