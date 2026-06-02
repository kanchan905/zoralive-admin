import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { FakeHost } from '../models/fake-host.model';

export interface FakeHostListParams {
  page: number;
  pageSize: number;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class FakeHostService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/host/fake-hosts`;

  getList(params: FakeHostListParams): Observable<PaginatedResponse<FakeHost>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }

    return this.http.get<PaginatedResponse<FakeHost>>(this.baseUrl, { params: httpParams });
  }
}
