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
}

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const;
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

interface CalendarCell {
  iso: string;
  day: number;
  inMonth: boolean;
  disabled: boolean;
}

function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseIso(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDisplay(iso: string): string {
  const date = parseIso(iso);
  if (!date) {
    return '';
  }
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
}

@Component({
  selector: 'app-date-picker',
  standalone: true,
  host: {
    class: 'app-date-picker-host',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppDatePickerComponent),
      multi: true,
    },
  ],
  template: `
    <div
      class="app-date-picker"
      [class.app-date-picker--open]="open()"
      [class.app-date-picker--disabled]="isDisabled()"
    >
      <button
        type="button"
        [class]="triggerClasses()"
        [id]="id()"
        [disabled]="isDisabled()"
        [attr.aria-expanded]="open()"
        [attr.aria-label]="placeholder()"
        (click)="toggle($event)"
      >
        <span
          class="app-date-picker__value"
          [class.app-date-picker__value--placeholder]="!value()"
        >
          {{ displayValue() }}
        </span>
        <i class="bi bi-calendar3 app-date-picker__icon" aria-hidden="true"></i>
      </button>

      @if (open()) {
        <div
          class="app-date-picker__panel app-date-picker__panel--fixed"
          role="dialog"
          aria-label="Choose date"
          [style.top]="panelStyle()?.top ?? null"
          [style.bottom]="panelStyle()?.bottom ?? null"
          [style.left]="panelStyle()?.left ?? null"
          [style.width]="panelStyle()?.width ?? null"
        >
          <div class="app-date-picker__header">
            <button type="button" class="app-date-picker__nav" (click)="prevMonth($event)" aria-label="Previous month">
              <i class="bi bi-chevron-up"></i>
            </button>
            <span class="app-date-picker__month">{{ monthLabel() }}</span>
            <button type="button" class="app-date-picker__nav" (click)="nextMonth($event)" aria-label="Next month">
              <i class="bi bi-chevron-down"></i>
            </button>
          </div>

          <div class="app-date-picker__weekdays">
            @for (day of weekdays; track day) {
              <span>{{ day }}</span>
            }
          </div>

          <div class="app-date-picker__grid">
            @for (cell of calendarDays(); track cell.iso) {
              <button
                type="button"
                class="app-date-picker__day"
                [class.app-date-picker__day--muted]="!cell.inMonth"
                [class.app-date-picker__day--selected]="value() === cell.iso"
                [class.app-date-picker__day--today]="cell.iso === todayIso"
                [disabled]="cell.disabled"
                (click)="pickDate(cell, $event)"
              >
                {{ cell.day }}
              </button>
            }
          </div>

          <div class="app-date-picker__footer">
            <button type="button" class="app-date-picker__action" (click)="clear($event)">Clear</button>
            <button type="button" class="app-date-picker__action" (click)="setToday($event)">Today</button>
          </div>
        </div>
      }
    </div>
  `,
})
export class AppDatePickerComponent implements ControlValueAccessor, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private scrollSubscription?: Subscription;

  readonly weekdays = WEEKDAYS;
  readonly todayIso = toIso(new Date());

  readonly id = input('');
  readonly placeholder = input('dd-mm-yyyy');
  readonly min = input('');
  readonly triggerClass = input('filter-date');
  readonly disabled = input(false);

  readonly open = signal(false);
  readonly value = signal('');
  readonly viewYear = signal(new Date().getFullYear());
  readonly viewMonth = signal(new Date().getMonth());
  readonly disabledByForm = signal(false);
  readonly panelStyle = signal<PanelPosition | null>(null);

  readonly isDisabled = computed(() => this.disabled() || this.disabledByForm());
  readonly triggerClasses = computed(() => `app-date-picker__trigger ${this.triggerClass()}`.trim());

  readonly displayValue = computed(() => {
    const current = this.value();
    return current ? formatDisplay(current) : this.placeholder();
  });

  readonly monthLabel = computed(() => `${MONTHS[this.viewMonth()]}, ${this.viewYear()}`);

  readonly calendarDays = computed<CalendarCell[]>(() => {
    const year = this.viewYear();
    const month = this.viewMonth();
    const first = new Date(year, month, 1);
    const startOffset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const minIso = this.min();
    const cells: CalendarCell[] = [];

    for (let i = 0; i < startOffset; i++) {
      const date = new Date(year, month, -startOffset + i + 1);
      const iso = toIso(date);
      cells.push({
        iso,
        day: date.getDate(),
        inMonth: false,
        disabled: this.isBeforeMin(iso, minIso),
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const iso = toIso(new Date(year, month, day));
      cells.push({
        iso,
        day,
        inMonth: true,
        disabled: this.isBeforeMin(iso, minIso),
      });
    }

    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1];
      const date = parseIso(last.iso)!;
      date.setDate(date.getDate() + 1);
      const iso = toIso(date);
      cells.push({
        iso,
        day: date.getDate(),
        inMonth: false,
        disabled: this.isBeforeMin(iso, minIso),
      });
    }

    return cells;
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
    const next = value ?? '';
    this.value.set(next);
    const parsed = parseIso(next);
    if (parsed) {
      this.viewYear.set(parsed.getFullYear());
      this.viewMonth.set(parsed.getMonth());
    }
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
      const parsed = parseIso(this.value());
      if (parsed) {
        this.viewYear.set(parsed.getFullYear());
        this.viewMonth.set(parsed.getMonth());
      }
      this.bindScrollListener();
      queueMicrotask(() => this.syncPanelPosition());
      return;
    }

    this.closePanel();
  }

  prevMonth(event: MouseEvent): void {
    event.stopPropagation();
    if (this.viewMonth() === 0) {
      this.viewMonth.set(11);
      this.viewYear.update((y) => y - 1);
      return;
    }
    this.viewMonth.update((m) => m - 1);
  }

  nextMonth(event: MouseEvent): void {
    event.stopPropagation();
    if (this.viewMonth() === 11) {
      this.viewMonth.set(0);
      this.viewYear.update((y) => y + 1);
      return;
    }
    this.viewMonth.update((m) => m + 1);
  }

  pickDate(cell: CalendarCell, event: MouseEvent): void {
    event.stopPropagation();
    if (cell.disabled) {
      return;
    }
    this.value.set(cell.iso);
    this.onChange(cell.iso);
    this.onTouched();
    this.closePanel();
  }

  clear(event: MouseEvent): void {
    event.stopPropagation();
    this.value.set('');
    this.onChange('');
    this.onTouched();
    this.closePanel();
  }

  setToday(event: MouseEvent): void {
    event.stopPropagation();
    const today = this.todayIso;
    if (this.isBeforeMin(today, this.min())) {
      return;
    }
    this.value.set(today);
    this.onChange(today);
    this.onTouched();
    this.viewYear.set(new Date().getFullYear());
    this.viewMonth.set(new Date().getMonth());
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
    const trigger = this.host.nativeElement.querySelector('.app-date-picker__trigger') as HTMLElement | null;
    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const gap = 6;
    const panelHeight = 320;
    const spaceBelow = window.innerHeight - rect.bottom - gap;
    const spaceAbove = rect.top - gap;
    const openUp = spaceBelow < panelHeight && spaceAbove > spaceBelow;

    if (openUp) {
      this.panelStyle.set({
        left: `${rect.left}px`,
        width: `${Math.max(rect.width, 280)}px`,
        bottom: `${window.innerHeight - rect.top + gap}px`,
      });
      return;
    }

    this.panelStyle.set({
      left: `${rect.left}px`,
      width: `${Math.max(rect.width, 280)}px`,
      top: `${rect.bottom + gap}px`,
    });
  }

  private isBeforeMin(iso: string, minIso: string): boolean {
    return !!minIso && iso < minIso;
  }
}
