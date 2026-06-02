import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { ReportUser } from '../models/report-user.model';

export interface ReportUserListParams {
  page: number;
  pageSize: number;
  search?: string;
  agencyId?: string;
}

@Injectable({ providedIn: 'root' })
export class ReportUserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/report-user`;

  getList(params: ReportUserListParams): Observable<PaginatedResponse<ReportUser>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }
    if (params.agencyId) {
      httpParams = httpParams.set('agencyId', params.agencyId);
    }

    return this.http.get<PaginatedResponse<ReportUser>>(this.baseUrl, { params: httpParams });
  }
}
