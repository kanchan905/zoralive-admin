import { Component, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { SettingCardComponent } from '../../components/setting-card/setting-card.component';
import { PlatformSettings } from '../../models/platform-settings.model';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule, BreadcrumbComponent, PageHeaderComponent, SettingCardComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly settingsService = inject(SettingsService);
  private readonly notify = inject(NotificationService);

  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Setting' },
  ];

  readonly savingAll = signal(false);
  readonly loading = signal(false);

  readonly redeemGatewayOptions = ['Select Gateway', 'PayPal', 'Stripe', 'Razorpay'];
  readonly currencyOptions = ['Select Currency', 'USD', 'INR', 'EUR'];
  readonly redeemDayOptions = ['Select Day', 'Monday', 'Friday', 'Sunday'];

  readonly form = this.fb.group({
    zegoSignIn: [''],
    zegoAppId: [''],
    privacyPolicyLink: [''],
    termsOfServiceLink: [''],
    loginCoin: [''],
    loginBonusAdmin: [''],
    loginMessage: [''],
    dailyTaskMin: [''],
    dailyTaskMax: [''],
    videoCallCharge: [''],
    addCoinHost: [''],
    redeemGateway: ['Select Gateway'],
    redeemCurrency: ['Select Currency'],
    redeemDay: ['Select Day'],
    redeemMinPoints: [''],
    redeemCoins: [''],
    stripeEnabled: [false],
    stripeSecretKey: [''],
    stripePublishableKey: [''],
    phonePayEnabled: [false],
    phonePayId: [''],
    razorpayEnabled: [false],
    razorpayId: [''],
    googlePayEnabled: [false],
    googlePayId: [''],
    callBonuses: this.fb.array(
      Array.from({ length: 5 }, () => this.fb.control(''))
    ),
    callDurations: this.fb.array(
      Array.from({ length: 5 }, () => this.fb.control(''))
    ),
  });

  get callBonuses(): FormArray {
    return this.form.get('callBonuses') as FormArray;
  }

  get callDurations(): FormArray {
    return this.form.get('callDurations') as FormArray;
  }

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.loading.set(true);

    this.settingsService
      .getSettings()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (settings) => this.patchForm(settings),
        error: () => {
          /* keep empty defaults */
        },
      });
  }

  saveAll(): void {
    this.persist('All settings saved successfully', () => this.savingAll.set(true), () =>
      this.savingAll.set(false)
    );
  }

  saveSection(message: string): void {
    this.persist(message);
  }

  private persist(
    successMessage: string,
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    onStart?.();

    this.settingsService
      .saveSettings(this.formToModel())
      .pipe(finalize(() => onEnd?.()))
      .subscribe({
        next: (settings) => {
          this.patchForm(settings);
          this.notify.success(successMessage);
        },
        error: () => {
          this.notify.warning('Save will be available when API is connected');
          onEnd?.();
        },
      });
  }

  private formToModel(): PlatformSettings {
    const v = this.form.getRawValue();
    return {
      ...v,
      callBonuses: (v.callBonuses as string[]) ?? [],
      callDurations: (v.callDurations as string[]) ?? [],
    } as PlatformSettings;
  }

  private patchForm(settings: PlatformSettings): void {
    this.form.patchValue({
      zegoSignIn: settings.zegoSignIn,
      zegoAppId: settings.zegoAppId,
      privacyPolicyLink: settings.privacyPolicyLink,
      termsOfServiceLink: settings.termsOfServiceLink,
      loginCoin: settings.loginCoin,
      loginBonusAdmin: settings.loginBonusAdmin,
      loginMessage: settings.loginMessage,
      dailyTaskMin: settings.dailyTaskMin,
      dailyTaskMax: settings.dailyTaskMax,
      videoCallCharge: settings.videoCallCharge,
      addCoinHost: settings.addCoinHost,
      redeemGateway: settings.redeemGateway,
      redeemCurrency: settings.redeemCurrency,
      redeemDay: settings.redeemDay,
      redeemMinPoints: settings.redeemMinPoints,
      redeemCoins: settings.redeemCoins,
      stripeEnabled: settings.stripeEnabled,
      stripeSecretKey: settings.stripeSecretKey,
      stripePublishableKey: settings.stripePublishableKey,
      phonePayEnabled: settings.phonePayEnabled,
      phonePayId: settings.phonePayId,
      razorpayEnabled: settings.razorpayEnabled,
      razorpayId: settings.razorpayId,
      googlePayEnabled: settings.googlePayEnabled,
      googlePayId: settings.googlePayId,
    });

    settings.callBonuses?.forEach((val, i) => this.callBonuses.at(i)?.setValue(val));
    settings.callDurations?.forEach((val, i) => this.callDurations.at(i)?.setValue(val));
  }
}
