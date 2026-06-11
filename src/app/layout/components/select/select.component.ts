import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  computed,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription, fromEvent } from 'rxjs';

interface PanelPosition {
  top?: string;
  bottom?: string;
  left: string;
  width: string;
  maxHeight: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  host: {
    class: 'app-select-host',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelectComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="app-select"
      [class.app-select--open]="open()"
      [class.app-select--drop-up]="dropUp()"
      [class.app-select--disabled]="isDisabled()"
    >
      <button
        type="button"
        [class]="triggerClasses()"
        [id]="id()"
        [disabled]="isDisabled()"
        [attr.aria-expanded]="open()"
        [attr.aria-haspopup]="'listbox'"
        (click)="toggle($event)"
      >
        <span
          class="app-select__value"
          [class.app-select__value--placeholder]="!hasValue()"
        >
          {{ displayLabel() }}
        </span>
        <i class="bi bi-chevron-down app-select__chevron" aria-hidden="true"></i>
      </button>

      @if (open()) {
        <ul
          class="app-select__panel app-select__panel--fixed"
          role="listbox"
          [style.top]="panelStyle()?.top ?? null"
          [style.bottom]="panelStyle()?.bottom ?? null"
          [style.left]="panelStyle()?.left ?? null"
          [style.width]="panelStyle()?.width ?? null"
          [style.max-height]="panelStyle()?.maxHeight ?? null"
        >
          @for (opt of normalizedOptions(); track opt.value) {
            <li
              role="option"
              class="app-select__option"
              [class.app-select__option--selected]="value() === opt.value"
              [class.app-select__option--disabled]="opt.disabled"
              [attr.aria-selected]="value() === opt.value"
              (click)="pick(opt, $event)"
            >
              {{ opt.label }}
            </li>
          }
        </ul>
      }
    </div>
  `,
})
export class AppSelectComponent implements ControlValueAccessor, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private scrollSubscription?: Subscription;

  readonly id = input('');
  readonly placeholder = input('Select...');
  readonly options = input<ReadonlyArray<SelectOption | string | number>>([]);
  readonly triggerClass = input('form-control');
  readonly dropUp = input(false);
  readonly disabled = input(false);

  readonly open = signal(false);
  readonly value = signal('');
  readonly disabledByForm = signal(false);
  readonly panelStyle = signal<PanelPosition | null>(null);

  readonly isDisabled = computed(() => this.disabled() || this.disabledByForm());

  readonly normalizedOptions = computed<SelectOption[]>(() =>
    this.options().map((item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        const value = String(item);
        return { value, label: value };
      }
      return {
        ...item,
        disabled: item.disabled ?? item.value === '',
      };
    })
  );

  readonly triggerClasses = computed(() => `app-select__trigger ${this.triggerClass()}`.trim());

  readonly hasValue = computed(() => this.value().trim().length > 0);

  readonly displayLabel = computed(() => {
    const current = this.normalizedOptions().find((opt) => opt.value === this.value());
    if (current) {
      return current.label;
    }
    return this.placeholder();
  });

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.closePanel();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closePanel();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.open()) {
      this.syncPanelPosition();
    }
  }

  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabledByForm.set(disabled);
  }

  toggle(event: MouseEvent): void {
    event.stopPropagation();
    if (this.isDisabled()) {
      return;
    }

    const willOpen = !this.open();
    this.open.set(willOpen);

    if (willOpen) {
      this.onTouched();
      this.bindScrollListener();
      queueMicrotask(() => this.syncPanelPosition());
      return;
    }

    this.closePanel();
  }

  pick(option: SelectOption, event: MouseEvent): void {
    event.stopPropagation();
    if (option.disabled) {
      return;
    }
    this.value.set(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.closePanel();
  }

  private closePanel(): void {
    this.open.set(false);
    this.panelStyle.set(null);
    this.scrollSubscription?.unsubscribe();
    this.scrollSubscription = undefined;
  }

  private bindScrollListener(): void {
    this.scrollSubscription?.unsubscribe();
    this.scrollSubscription = fromEvent(document, 'scroll', { capture: true }).subscribe(() => {
      if (this.open()) {
        this.syncPanelPosition();
      }
    });
  }

  private syncPanelPosition(): void {
    const trigger = this.host.nativeElement.querySelector('.app-select__trigger') as HTMLElement | null;
    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const gap = 6;
    const maxPanelHeight = 220;
    const spaceBelow = window.innerHeight - rect.bottom - gap;
    const spaceAbove = rect.top - gap;
    const openUp = this.dropUp() || (spaceBelow < 160 && spaceAbove > spaceBelow);

    if (openUp) {
      this.panelStyle.set({
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        bottom: `${window.innerHeight - rect.top + gap}px`,
        maxHeight: `${Math.min(maxPanelHeight, Math.max(spaceAbove, 100))}px`,
      });
      return;
    }

    this.panelStyle.set({
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      top: `${rect.bottom + gap}px`,
      maxHeight: `${Math.min(maxPanelHeight, Math.max(spaceBelow, 100))}px`,
    });
  }
}
