import { Component, OnInit, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../layout/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../layout/components/page-header/page-header.component';
import { DataTableComponent } from '../../../../layout/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../core/models/breadcrumb.model';
import { ToastService } from '../../../../core/services/toast.service';
import { BANNER_TABLE_COLUMNS } from '../../constants/banner-table.columns';
import { BannerService } from '../../services/banner.service';
import { BannerDialogComponent } from '../../components/banner-dialog/banner-dialog.component';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';

@Component({
  selector: 'app-banner',
  imports: [BreadcrumbComponent, PageHeaderComponent, DataTableComponent, AppButtonComponent],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent implements OnInit {
  private readonly bannerService = inject(BannerService);
  private readonly toast = inject(ToastService);
  private readonly dialog = inject(MatDialog);

  readonly columns = BANNER_TABLE_COLUMNS;
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Banner' },
  ];

  readonly rows = signal<Record<string, unknown>[]>([]);
  readonly loading = signal(false);
  readonly page = signal(1);
  readonly pageSize = signal(5);
  readonly total = signal(0);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);

    this.bannerService
      .getList({
        page: this.page(),
        pageSize: this.pageSize(),
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
    const ref = this.dialog.open(BannerDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      panelClass: 'agency-dialog-panel',
      autoFocus: 'first-titled-element',
    });

    ref.afterClosed().subscribe((created) => {
      if (created) this.loadData();
    });
  }

  onRowAction(_event: { action: string; row: Record<string, unknown> }): void {
    // TODO: edit/delete API integration
  }
}
