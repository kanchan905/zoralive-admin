import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { SolvedComplain } from '../models/solved-complain.model';

export interface SolvedComplainListParams {
  page: number;
  pageSize: number;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class SolvedComplainService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/host/solved-complaints`;

  getList(params: SolvedComplainListParams): Observable<PaginatedResponse<SolvedComplain>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }

    return this.http.get<PaginatedResponse<SolvedComplain>>(this.baseUrl, { params: httpParams });
  }
}
