import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { UserSolvedComplain } from '../models/solved-complain.model';

export interface UserSolvedComplainListParams {
  page: number;
  pageSize: number;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class UserSolvedComplainService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/users/solved-complaints`;

  getList(params: UserSolvedComplainListParams): Observable<PaginatedResponse<UserSolvedComplain>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }

    return this.http.get<PaginatedResponse<UserSolvedComplain>>(this.baseUrl, {
      params: httpParams,
    });
  }
}
