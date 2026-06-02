import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { HostLevel } from '../models/host-level.model';

export interface HostLevelListParams {
  page: number;
  pageSize: number;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class HostLevelService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/levels/host`;

  getList(params: HostLevelListParams): Observable<PaginatedResponse<HostLevel>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }

    return this.http.get<PaginatedResponse<HostLevel>>(this.baseUrl, { params: httpParams });
  }
}
