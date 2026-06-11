import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, NgZone } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

const TOAST_ICONS: Record<string, string> = {
  'toast-success': 'bi-check-circle-fill',
  success: 'bi-check-circle-fill',
  'toast-error': 'bi-exclamation-circle-fill',
  error: 'bi-exclamation-circle-fill',
  'toast-info': 'bi-info-circle-fill',
  info: 'bi-info-circle-fill',
  'toast-warning': 'bi-exclamation-triangle-fill',
  warning: 'bi-exclamation-triangle-fill',
};

@Component({
  selector: '[toast-component]',
  standalone: true,
  template: `
    <div class="app-toast__inner">
      <span class="app-toast__icon" aria-hidden="true">
        <i class="bi" [class]="iconClass"></i>
      </span>

      <div class="app-toast__body">
        @if (title) {
          <div class="app-toast__title">
            {{ title }}
            @if (duplicatesCount) {
              [{{ duplicatesCount + 1 }}]
            }
          </div>
        }

        @if (message) {
          <div class="app-toast__message" role="alert">{{ message }}</div>
        }
      </div>

      @if (options.closeButton) {
        <button
          type="button"
          class="app-toast__close"
          (click)="closeToast($event)"
          aria-label="Close"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      }

      @if (options.progressBar) {
        <div class="app-toast__progress">
          <div class="app-toast__progress-bar" [style.width.%]="progressWidth"></div>
        </div>
      }
    </div>
  `,
  styleUrl: './toast.component.scss',
  animations: [
    trigger('flyInOut', [
      state('inactive', style({ opacity: 0 })),
      state('active', style({ opacity: 1 })),
      state('removed', style({ opacity: 0 })),
      transition('inactive => active', animate('{{ easeTime }}ms {{ easing }}')),
      transition('active => removed', animate('{{ easeTime }}ms {{ easing }}')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class AppToastComponent extends Toast {
  constructor(
    protected override toastrService: ToastrService,
    public override toastPackage: ToastPackage,
    protected override ngZone?: NgZone
  ) {
    super(toastrService, toastPackage, ngZone);
  }

  get iconClass(): string {
    return TOAST_ICONS[this.toastPackage.toastType] ?? 'bi-info-circle-fill';
  }

  get progressWidth(): number {
    const value = this.width();
    return value < 0 ? 100 : value;
  }

  @HostBinding('@flyInOut')
  get flyInOutState() {
    return this._state;
  }

  @HostBinding('class')
  get hostToastClasses(): string {
    return this.toastClasses;
  }

  @HostBinding('style.display')
  get hostDisplayStyle(): string | undefined {
    return this.displayStyle;
  }

  @HostListener('click', ['$event'])
  onToastClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('.app-toast__close')) {
      return;
    }
    this.tapToast();
  }

  closeToast(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    this.toastPackage.toastRef.manualClose();
  }
}
