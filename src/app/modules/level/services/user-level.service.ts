import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { UserLevel } from '../models/user-level.model';

export interface UserLevelListParams {
  page: number;
  pageSize: number;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class UserLevelService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/levels/user`;

  getList(params: UserLevelListParams): Observable<PaginatedResponse<UserLevel>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }

    return this.http.get<PaginatedResponse<UserLevel>>(this.baseUrl, { params: httpParams });
  }
}
