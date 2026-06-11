import { Component, input, output } from '@angular/core';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';

export type SettingCardTheme =
  | 'purple'
  | 'orange'
  | 'pink'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'yellow'
  | 'navy';

@Component({
  selector: 'app-setting-card',
  imports: [AppButtonComponent],
  templateUrl: './setting-card.component.html',
  styleUrl: './setting-card.component.scss',
})
export class SettingCardComponent {
  readonly title = input.required<string>();
  readonly icon = input.required<string>();
  readonly theme = input<SettingCardTheme>('purple');
  readonly saving = input(false);

  readonly save = output<void>();
}
