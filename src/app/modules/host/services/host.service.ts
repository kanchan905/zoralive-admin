import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { Host } from '../models/host.model';

export interface HostListParams {
  page: number;
  pageSize: number;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

@Injectable({ providedIn: 'root' })
export class HostService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/hosts`;

  getList(params: HostListParams): Observable<PaginatedResponse<Host>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.status) {
      httpParams = httpParams.set('status', params.status);
    }
    if (params.fromDate) {
      httpParams = httpParams.set('fromDate', params.fromDate);
    }
    if (params.toDate) {
      httpParams = httpParams.set('toDate', params.toDate);
    }

    return this.http.get<PaginatedResponse<Host>>(this.baseUrl, { params: httpParams });
  }
}
