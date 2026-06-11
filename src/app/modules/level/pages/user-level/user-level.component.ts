import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../layout/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../layout/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../layout/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../layout/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../core/models/breadcrumb.model';
import { ToastService } from '../../../../core/services/toast.service';
import { USER_LEVEL_TABLE_COLUMNS } from '../../constants/user-level-table.columns';
import { UserLevelService } from '../../services/user-level.service';
import { UserLevelDialogComponent } from '../../components/user-level-dialog/user-level-dialog.component';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';

@Component({
  selector: 'app-user-level',
  imports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
    AppButtonComponent,
  ],
  templateUrl: './user-level.component.html',
  styleUrl: './user-level.component.scss',
})
export class UserLevelComponent implements OnInit {
  private readonly userLevelService = inject(UserLevelService);
  private readonly toast = inject(ToastService);
  private readonly dialog = inject(MatDialog);

  readonly columns = USER_LEVEL_TABLE_COLUMNS;
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'User Level' },
  ];

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

    this.userLevelService
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

  openNewLevel(): void {
    const ref = this.dialog.open(UserLevelDialogComponent, {
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

  onRowAction(_event: { action: string; row: Record<string, unknown> }): void {
    // TODO: edit / delete via API
  }
}
