import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { BannerItem } from '../models/banner.model';

export interface BannerListParams {
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class BannerService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/banner`;

  getList(params: BannerListParams): Observable<PaginatedResponse<BannerItem>> {
    const httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    return this.http.get<PaginatedResponse<BannerItem>>(this.baseUrl, { params: httpParams });
  }
}
