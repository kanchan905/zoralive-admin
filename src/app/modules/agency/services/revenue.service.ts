import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { AgencyRevenue } from '../models/agency-revenue.model';

export interface RevenueListParams {
  page: number;
  pageSize: number;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class RevenueService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/agency/revenue`;

  getList(params: RevenueListParams): Observable<PaginatedResponse<AgencyRevenue>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }

    return this.http.get<PaginatedResponse<AgencyRevenue>>(this.baseUrl, { params: httpParams });
  }
}
