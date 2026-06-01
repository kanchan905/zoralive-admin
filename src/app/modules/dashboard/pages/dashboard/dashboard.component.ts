import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface StatCard {
  label: string;
  value: number;
  icon: string;
  theme: 'purple' | 'blue' | 'green' | 'yellow' | 'pink' | 'teal';
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly dateRange = 'May 21 - Jun 21, 2024';

  readonly statCards: StatCard[] = [
    { label: 'User', value: 15420, icon: 'bi-people', theme: 'purple' },
    { label: 'Country', value: 120, icon: 'bi-globe2', theme: 'blue' },
    { label: 'Purchase Plan', value: 520, icon: 'bi-cart-check', theme: 'green' },
    { label: 'VIP Plan', value: 210, icon: 'bi-star', theme: 'yellow' },
    { label: 'Category', value: 56, icon: 'bi-grid', theme: 'pink' },
    { label: 'Gift', value: 325, icon: 'bi-gift', theme: 'purple' },
    { label: 'Emoji', value: 1250, icon: 'bi-emoji-smile', theme: 'yellow' },
    { label: 'Sticker', value: 740, icon: 'bi-sticky', theme: 'green' },
    { label: 'Online Host', value: 85, icon: 'bi-broadcast', theme: 'teal' },
    { label: 'Live Host', value: 42, icon: 'bi-camera-video', theme: 'pink' },
    { label: 'Total Host', value: 1240, icon: 'bi-person-video2', theme: 'blue' },
    { label: 'Total Agency', value: 320, icon: 'bi-building', theme: 'purple' },
    { label: 'Online User', value: 620, icon: 'bi-person-check', theme: 'blue' },
  ];
}
