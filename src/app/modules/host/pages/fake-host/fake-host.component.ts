import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { FakeHostDialogComponent } from '../../components/fake-host-dialog/fake-host-dialog.component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../shared/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../shared/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { FAKE_HOST_TABLE_COLUMNS } from '../../constants/fake-host-table.columns';
import { FakeHostService } from '../../services/fake-host.service';

@Component({
  selector: 'app-fake-host',
  imports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
  ],
  templateUrl: './fake-host.component.html',
  styleUrl: './fake-host.component.scss',
})
export class FakeHostComponent implements OnInit {
  private readonly fakeHostService = inject(FakeHostService);
  private readonly notify = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Host' },
    { label: 'Fake Host' },
  ];

  readonly columns = FAKE_HOST_TABLE_COLUMNS;

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

    this.fakeHostService
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
          this.notify.error('Failed to load fake hosts');
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

  onToggleChange(_event: { columnKey: string; row: Record<string, unknown>; value: boolean }): void {
    // TODO: PATCH live / video via API
  }

  openNewFakeHost(): void {
    const ref = this.dialog.open(FakeHostDialogComponent, {
      width: '560px',
      maxWidth: '95vw',
      panelClass: 'agency-dialog-panel',
      autoFocus: 'first-titled-element',
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }
}
