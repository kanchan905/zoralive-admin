import { Component, OnInit, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../layout/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../layout/components/page-header/page-header.component';
import { BreadcrumbItem } from '../../../../core/models/breadcrumb.model';
import { ToastService } from '../../../../core/services/toast.service';
import { AdNetworkCardComponent } from '../../components/ad-network-card/ad-network-card.component';
import { AdNetworkConfig } from '../../models/ad-network-config.model';
import { AdvertisementService } from '../../services/advertisement.service';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';

const DEFAULT_GOOGLE: AdNetworkConfig = {
  enabled: true,
  interstitialId: 'ca-app-pub-3940256099942544/1033173712',
  rewardId: 'ca-app-pub-3940256099942544/5224354917',
  nativeId: 'ca-app-pub-3940256099942544/2247696110',
};

const DEFAULT_FACEBOOK: AdNetworkConfig = {
  enabled: true,
  interstitialId: 'IMG_16_9_APP_INSTALL#1234567890',
  rewardId: 'IMG_16_9_APP_INSTALL#0987654321',
  nativeId: 'IMG_16_9_APP_INSTALL#1122334455',
};

@Component({
  selector: 'app-advertisement',
  imports: [BreadcrumbComponent, PageHeaderComponent, AdNetworkCardComponent, AppButtonComponent],
  templateUrl: './advertisement.component.html',
  styleUrl: './advertisement.component.scss',
})
export class AdvertisementComponent implements OnInit {
  private readonly advertisementService = inject(AdvertisementService);
  private readonly toast = inject(ToastService);

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Advertisement' },
  ];

  readonly googleConfig = signal<AdNetworkConfig>({ ...DEFAULT_GOOGLE });
  readonly facebookConfig = signal<AdNetworkConfig>({ ...DEFAULT_FACEBOOK });
  readonly googleEditing = signal(false);
  readonly facebookEditing = signal(false);
  readonly saving = signal(false);
  readonly loading = signal(false);

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.loading.set(true);

    this.advertisementService
      .getSettings()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (settings) => {
          this.googleConfig.set(this.mergeConfig(DEFAULT_GOOGLE, settings?.google));
          this.facebookConfig.set(this.mergeConfig(DEFAULT_FACEBOOK, settings?.facebook));
        },
        error: () => {
          this.googleConfig.set({ ...DEFAULT_GOOGLE });
          this.facebookConfig.set({ ...DEFAULT_FACEBOOK });
        },
      });
  }

  saveAll(): void {
    this.saving.set(true);

    this.advertisementService
      .saveSettings({
        google: this.googleConfig(),
        facebook: this.facebookConfig(),
      })
      .pipe(finalize(() => this.saving.set(false)))
      .subscribe({
        next: (settings) => {
          this.googleConfig.set(this.mergeConfig(DEFAULT_GOOGLE, settings?.google));
          this.facebookConfig.set(this.mergeConfig(DEFAULT_FACEBOOK, settings?.facebook));
          this.googleEditing.set(false);
          this.facebookEditing.set(false);
          this.toast.apiSuccess(settings, 'Advertisement settings saved successfully');
        },
        error: () => {
          this.toast.warning('Save will be available when API is connected');
        },
      });
  }

  onGoogleEnabledChange(enabled: boolean): void {
    this.googleConfig.update((c) => ({ ...c, enabled }));
  }

  onFacebookEnabledChange(enabled: boolean): void {
    this.facebookConfig.update((c) => ({ ...c, enabled }));
  }

  onGoogleSave(config: AdNetworkConfig): void {
    this.googleConfig.set(config);
    this.googleEditing.set(false);
    this.toast.success('Google AdMob configuration updated');
  }

  onFacebookSave(config: AdNetworkConfig): void {
    this.facebookConfig.set(config);
    this.facebookEditing.set(false);
    this.toast.success('Facebook configuration updated');
  }

  copyId(value: string): void {
    if (!value?.trim()) {
      this.toast.info('Nothing to copy');
      return;
    }

    navigator.clipboard.writeText(value).then(
      () => this.toast.success('Copied to clipboard'),
    );
  }

  private mergeConfig(
    defaults: AdNetworkConfig,
    partial?: Partial<AdNetworkConfig> | null
  ): AdNetworkConfig {
    return { ...defaults, ...(partial ?? {}) };
  }
}
