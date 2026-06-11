import { Component, computed, input, output } from '@angular/core';

export type ButtonPreset =
  | 'primary'
  | 'outline'
  | 'danger'
  | 'ghost'
  | 'gold'
  | 'live'
  | 'new'
  | 'delete'
  | 'export'
  | 'filter'
  | 'filter-apply'
  | 'filter-labeled'
  | 'submit'
  | 'submit-full'
  | 'save-all'
  | 'save-card'
  | 'cancel'
  | 'cancel-card'
  | 'send'
  | 'login'
  | 'edit'
  | 'empty'
  | 'auto'
  | 'update-password'
  | 'setting-save'
  | 'menu'
  | 'icon'
  | 'table-action'
  | 'table-action-danger'
  | 'pagination'
  | 'close'
  | 'date-filter'
  | 'primary-inline';

const PRESET_CLASS: Record<ButtonPreset, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  danger: 'btn-danger',
  ghost: 'btn-ghost',
  gold: 'btn-gold',
  live: 'btn-live',
  new: 'btn-new',
  delete: 'btn-delete',
  export: 'btn-export',
  filter: 'btn-filter',
  'filter-apply': 'btn-filter-apply',
  'filter-labeled': 'btn-filter-labeled',
  submit: 'btn-submit',
  'submit-full': 'btn-submit-full',
  'save-all': 'btn-save-all',
  'save-card': 'btn-save-card',
  cancel: 'btn-cancel',
  'cancel-card': 'btn-cancel-card',
  send: 'btn-send',
  login: 'btn-login',
  edit: 'btn-edit',
  empty: 'btn-empty-action',
  auto: 'btn-auto',
  'update-password': 'btn-update-password',
  'setting-save': 'setting-card__save',
  menu: 'btn-menu',
  icon: 'icon-btn',
  'table-action': 'btn-table-action',
  'table-action-danger': 'btn-table-action btn-table-action--danger',
  pagination: 'btn-pagination',
  close: 'dialog-close',
  'date-filter': 'date-filter-btn',
  'primary-inline': 'btn-primary-inline',
};

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [type]="type()"
      [class]="classNames()"
      [disabled]="disabled()"
      [title]="title()"
      [attr.aria-label]="ariaLabel() || null"
      (click)="clicked.emit($event)"
    >
      @if (icon()) {
        <i [class]="icon()"></i>
      }
      <ng-content />
    </button>
  `,
})
export class AppButtonComponent {
  readonly preset = input<ButtonPreset>('primary');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly icon = input('');
  readonly title = input('');
  readonly ariaLabel = input('');
  readonly fullWidth = input(false);
  readonly clicked = output<MouseEvent>();

  readonly classNames = computed(() => {
    const classes = [PRESET_CLASS[this.preset()]];
    if (this.fullWidth()) {
      classes.push('btn-full');
    }
    return classes.join(' ');
  });
}
