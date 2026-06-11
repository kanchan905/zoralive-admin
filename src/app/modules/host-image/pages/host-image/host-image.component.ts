import { Component, OnInit, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../layout/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../layout/components/page-header/page-header.component';
import { SearchBoxComponent } from '../../../../layout/components/search-box/search-box.component';
import { DataTableComponent } from '../../../../layout/components/data-table/data-table.component';
import { BreadcrumbItem } from '../../../../core/models/breadcrumb.model';
import { ToastService } from '../../../../core/services/toast.service';
import {
  HOST_IMAGE_TABLE_COLUMNS,
  HOST_PROFILE_IMAGE_TABLE_COLUMNS,
} from '../../constants/host-image-table.columns';
import { HostImageService } from '../../services/host-image.service';

type HostImageTab = 'profile' | 'image';

@Component({
  selector: 'app-host-image',
  imports: [
    BreadcrumbComponent,
    PageHeaderComponent,
    SearchBoxComponent,
    DataTableComponent,
  ],
  templateUrl: './host-image.component.html',
  styleUrl: './host-image.component.scss',
})
export class HostImageComponent implements OnInit {
  private readonly hostImageService = inject(HostImageService);
  private readonly toast = inject(ToastService);

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Image' },
  ];

  readonly profileColumns = HOST_PROFILE_IMAGE_TABLE_COLUMNS;
  readonly imageColumns = HOST_IMAGE_TABLE_COLUMNS;
  readonly activeTab = signal<HostImageTab>('profile');

  readonly profileRows = signal<Record<string, unknown>[]>([]);
  readonly profileLoading = signal(false);
  readonly profileSearch = signal('');
  readonly profilePage = signal(1);
  readonly profilePageSize = signal(5);
  readonly profileTotal = signal(0);

  readonly imageRows = signal<Record<string, unknown>[]>([]);
  readonly imageLoading = signal(false);
  readonly imageSearch = signal('');
  readonly imagePage = signal(1);
  readonly imagePageSize = signal(5);
  readonly imageTotal = signal(0);

  ngOnInit(): void {
    this.loadProfileTable();
  }

  setTab(tab: HostImageTab): void {
    this.activeTab.set(tab);
    if (tab === 'image' && this.imageRows().length === 0 && !this.imageLoading()) {
      this.loadImageTable();
    }
  }

  isProfileTab(): boolean {
    return this.activeTab() === 'profile';
  }

  loadProfileTable(): void {
    this.profileLoading.set(true);

    this.hostImageService
      .getProfileImageList({
        page: this.profilePage(),
        pageSize: this.profilePageSize(),
        search: this.profileSearch(),
      })
      .pipe(finalize(() => this.profileLoading.set(false)))
      .subscribe({
        next: (res) => {
          this.profileRows.set(res.data as unknown as Record<string, unknown>[]);
          this.profileTotal.set(res.total);
        },
        error: () => {
          this.profileRows.set([]);
          this.profileTotal.set(0);
        },
      });
  }

  loadImageTable(): void {
    this.imageLoading.set(true);

    this.hostImageService
      .getImageList({
        page: this.imagePage(),
        pageSize: this.imagePageSize(),
        search: this.imageSearch(),
      })
      .pipe(finalize(() => this.imageLoading.set(false)))
      .subscribe({
        next: (res) => {
          this.imageRows.set(res.data as unknown as Record<string, unknown>[]);
          this.imageTotal.set(res.total);
        },
        error: () => {
          this.imageRows.set([]);
          this.imageTotal.set(0);
        },
      });
  }

  onProfileSearch(query: string): void {
    this.profileSearch.set(query);
    this.profilePage.set(1);
    this.loadProfileTable();
  }

  onProfilePageChange(page: number): void {
    this.profilePage.set(page);
    this.loadProfileTable();
  }

  onProfilePageSizeChange(size: number): void {
    this.profilePageSize.set(size);
    this.profilePage.set(1);
    this.loadProfileTable();
  }

  onImageSearch(query: string): void {
    this.imageSearch.set(query);
    this.imagePage.set(1);
    this.loadImageTable();
  }

  onImagePageChange(page: number): void {
    this.imagePage.set(page);
    this.loadImageTable();
  }

  onImagePageSizeChange(size: number): void {
    this.imagePageSize.set(size);
    this.imagePage.set(1);
    this.loadImageTable();
  }

  onProfileDelete(_event: { columnKey: string; row: Record<string, unknown> }): void {
    // TODO: delete profile image via API
  }

  onImageDelete(_event: { columnKey: string; row: Record<string, unknown> }): void {
    // TODO: delete image via API
  }

  onProfileToggle(_event: { columnKey: string; row: Record<string, unknown>; value: boolean }): void {
    // TODO: update approve state via API
  }

  onImageToggle(_event: { columnKey: string; row: Record<string, unknown>; value: boolean }): void {
    // TODO: update approve/show image state via API
  }
}
