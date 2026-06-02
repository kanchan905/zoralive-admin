import { Component, input, output, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdNetworkConfig, AdNetworkType } from '../../models/ad-network-config.model';

@Component({
  selector: 'app-ad-network-card',
  imports: [FormsModule],
  templateUrl: './ad-network-card.component.html',
  styleUrl: './ad-network-card.component.scss',
})
export class AdNetworkCardComponent {
  readonly network = input.required<AdNetworkType>();
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly config = input.required<AdNetworkConfig>();
  readonly editing = input(false);

  readonly editStart = output<void>();
  readonly editCancel = output<void>();
  readonly editSave = output<AdNetworkConfig>();
  readonly enabledChange = output<boolean>();
  readonly copyId = output<string>();

  readonly draft = signal<AdNetworkConfig>({
    enabled: false,
    interstitialId: '',
    rewardId: '',
    nativeId: '',
  });

  constructor() {
    effect(() => {
      if (this.editing()) {
        this.draft.set({ ...this.config() });
      }
    });
  }

  isActive(): boolean {
    return this.config().enabled;
  }

  onToggle(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.enabledChange.emit(checked);
  }

  onDraftToggle(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.draft.update((d) => ({ ...d, enabled: checked }));
  }

  saveDraft(): void {
    this.editSave.emit(this.draft());
  }

  updateDraftField(field: keyof AdNetworkConfig, value: string | boolean): void {
    this.draft.update((d) => ({ ...d, [field]: value }));
  }
}
