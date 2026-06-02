import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { OfflineRechargePayload } from '../models/offline-recharge.model';

@Injectable({ providedIn: 'root' })
export class OfflineRechargeService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/users/offline-recharge`;

  recharge(payload: OfflineRechargePayload): Observable<{ message?: string }> {
    return this.http.post<{ message?: string }>(this.baseUrl, payload);
  }
}
