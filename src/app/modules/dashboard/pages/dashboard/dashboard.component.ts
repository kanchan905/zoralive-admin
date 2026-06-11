import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { StatCard } from '../../models/stat-card.model';
import { DashboardService } from '../../services/dashboard.service';
import { AppButtonComponent } from '../../../../layout/components/button/button.component';
import { AppDatePickerComponent } from '../../../../layout/components/date-picker/date-picker.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, AppButtonComponent, AppDatePickerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly auth = inject(AuthService);

  fromDate = '';
  toDate = '';

  private readonly appliedFromDate = signal('');
  private readonly appliedToDate = signal('');

  readonly statCards = signal<StatCard[]>([]);
  readonly loading = signal(true);

  ngOnInit(): void {
    this.loadStats();
  }

  applyFilters(): void {
    this.appliedFromDate.set(this.fromDate);
    this.appliedToDate.set(this.toDate);
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
      .getStats({
        fromDate: this.appliedFromDate() || undefined,
        toDate: this.appliedToDate() || undefined,
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((cards) => this.statCards.set(cards));
  }
}
