import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { Agency } from '../models/agency.model';

export interface AgencyListParams {
  page: number;
  pageSize: number;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class AgencyService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/agencies`;

  /** GET /agencies?page=&pageSize=&search= */
  getList(params: AgencyListParams): Observable<PaginatedResponse<Agency>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }

    return this.http.get<PaginatedResponse<Agency>>(this.baseUrl, { params: httpParams });
  }
}
