import { Component, computed, input } from '@angular/core';

export type BadgeVariant =
  | 'live'
  | 'vip'
  | 'verified'
  | 'hot'
  | 'new'
  | 'top'
  | 'online'
  | 'offline'
  | 'active'
  | 'disabled'
  | 'default';

export type BadgeSize = 'badge' | 'chip' | 'bar';

const BADGE_CLASS: Record<'live' | 'vip' | 'verified' | 'hot' | 'new' | 'top', string> = {
  live: 'badge-live',
  vip: 'badge-vip',
  verified: 'badge-verified',
  hot: 'badge-hot',
  new: 'badge-new',
  top: 'badge-top',
};

const DEFAULT_ICON: Partial<Record<BadgeVariant, string>> = {
  vip: 'bi bi-award-fill badge-icon',
  verified: 'bi bi-patch-check-fill badge-icon',
  hot: 'bi bi-fire badge-icon',
  new: 'bi bi-heart-fill badge-icon',
  top: 'bi bi-trophy-fill badge-icon',
};

const DECORATIVE_BADGE_VARIANTS = new Set<BadgeVariant>(['vip', 'verified', 'hot', 'new', 'top']);

export function resolveBadgeVariant(value: unknown): BadgeVariant {
  const raw = String(value ?? '')
    .trim()
    .toLowerCase();

  switch (raw) {
    case 'live':
    case 'vip':
    case 'verified':
    case 'hot':
    case 'new':
    case 'top':
    case 'top host':
    case 'online':
    case 'offline':
    case 'active':
    case 'disabled':
      return raw === 'top host' ? 'top' : (raw as BadgeVariant);
    default:
      return 'default';
  }
}

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `
    <span [class]="classNames()" [attr.data-variant]="chipVariant()">
      @if (showDot()) {
        <span class="status-dot" aria-hidden="true"></span>
      }
      @if (resolvedIcon()) {
        <i [class]="resolvedIcon()"></i>
      }
      <ng-content />
    </span>
  `,
})
export class AppBadgeComponent {
  readonly variant = input<BadgeVariant>('default');
  readonly size = input<BadgeSize | undefined>(undefined);
  readonly icon = input('');
  readonly label = input('');

  readonly classNames = computed(() => {
    const size = this.resolvedSize();

    if (size === 'bar') {
      return this.variant() === 'offline' ? 'status-offline' : 'status-online';
    }

    if (size === 'badge') {
      const variant = this.variant();
      if (variant in BADGE_CLASS) {
        return BADGE_CLASS[variant as keyof typeof BADGE_CLASS];
      }
      return 'badge-live';
    }

    return 'status-chip';
  });

  readonly chipVariant = computed(() => (this.resolvedSize() === 'chip' ? this.variant() : null));

  readonly showDot = computed(() => {
    const size = this.resolvedSize();
    if (size === 'badge' && this.variant() === 'live') {
      return true;
    }
    return size === 'chip' || size === 'bar';
  });

  readonly resolvedIcon = computed(() => {
    if (this.icon()) {
      return this.icon();
    }
    if (this.resolvedSize() === 'badge') {
      return DEFAULT_ICON[this.variant()] ?? '';
    }
    return '';
  });

  private resolvedSize(): BadgeSize {
    const explicit = this.size();
    if (explicit) {
      return explicit;
    }

    const variant = this.variant();
    if (DECORATIVE_BADGE_VARIANTS.has(variant)) {
      return 'badge';
    }

    if (variant === 'live') {
      return 'badge';
    }

    return 'chip';
  }
}
