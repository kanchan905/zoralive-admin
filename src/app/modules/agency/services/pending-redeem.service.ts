import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { PendingRedeem } from '../models/pending-redeem.model';

export interface PendingRedeemListParams {
  page: number;
  pageSize: number;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class PendingRedeemService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/agency/pending-redeems`;

  getList(params: PendingRedeemListParams): Observable<PaginatedResponse<PendingRedeem>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }

    return this.http.get<PaginatedResponse<PendingRedeem>>(this.baseUrl, { params: httpParams });
  }
}
