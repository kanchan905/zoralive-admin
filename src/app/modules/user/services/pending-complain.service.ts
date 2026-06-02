import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { UserPendingComplain } from '../models/pending-complain.model';

export interface UserPendingComplainListParams {
  page: number;
  pageSize: number;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class UserPendingComplainService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/users/pending-complaints`;

  getList(params: UserPendingComplainListParams): Observable<PaginatedResponse<UserPendingComplain>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }

    return this.http.get<PaginatedResponse<UserPendingComplain>>(this.baseUrl, {
      params: httpParams,
    });
  }
}
