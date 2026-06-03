import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../core/services/auth.service';
import { StatCard } from '../models/stat-card.model';

const ADMIN_STATS: StatCard[] = [
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

/** Agency dashboard — 5 cards, kam data (API + agencyId filter) */
const AGENCY_STATS: StatCard[] = [
  { label: 'Host', value: 0, icon: 'bi-people-fill', theme: 'pink' },
  { label: 'Online Host', icon: 'bi-person-fill', theme: 'purple' },
  { label: 'Live Host', icon: 'bi-person-fill', theme: 'green' },
  { label: 'Report user', value: 0, icon: 'bi-person-vcard-fill', theme: 'orange' },
  { label: 'Net Worth', icon: 'bi-layers-fill', theme: 'amber' },
];

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly baseUrl = `${environment.apiUrl}/dashboard/stats`;

  getStats(): Observable<StatCard[]> {
    const fallback = this.auth.isAgency() ? AGENCY_STATS : ADMIN_STATS;

    return this.http.get<StatCard[]>(this.baseUrl).pipe(catchError(() => of(fallback)));
  }
}
