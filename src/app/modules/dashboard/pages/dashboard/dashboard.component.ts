import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { StatCard } from '../../models/stat-card.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly auth = inject(AuthService);

  readonly dateRange = 'May 21 - Jun 21, 2024';
  readonly statCards = signal<StatCard[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadStats();
  }

  isAgency(): boolean {
    return this.auth.isAgency();
  }

  welcomeTitle(): string {
    return this.auth.isAgency() ? 'Welcome' : 'Welcome back, Admin! 👋';
  }

  welcomeSubtitle(): string {
    return this.auth.isAgency()
      ? 'Dashboard'
      : "Here's what's happening with your platform today.";
  }

  hasCardValue(card: StatCard): boolean {
    return card.value !== null && card.value !== undefined;
  }

  private loadStats(): void {
    this.loading.set(true);

    this.dashboardService
      .getStats()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((cards) => this.statCards.set(cards));
  }
}
