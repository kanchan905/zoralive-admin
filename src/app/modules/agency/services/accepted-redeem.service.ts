import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { AcceptedRedeem } from '../models/accepted-redeem.model';

export interface AcceptedRedeemListParams {
  page: number;
  pageSize: number;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class AcceptedRedeemService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/agency/accepted-redeems`;

  getList(params: AcceptedRedeemListParams): Observable<PaginatedResponse<AcceptedRedeem>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }

    return this.http.get<PaginatedResponse<AcceptedRedeem>>(this.baseUrl, { params: httpParams });
  }
}
