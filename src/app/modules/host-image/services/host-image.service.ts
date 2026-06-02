import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { HostImageItem, HostProfileImageItem } from '../models/host-image.model';

export interface HostImageListParams {
  page: number;
  pageSize: number;
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class HostImageService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/host-images`;

  getProfileImageList(
    params: HostImageListParams
  ): Observable<PaginatedResponse<HostProfileImageItem>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }

    return this.http.get<PaginatedResponse<HostProfileImageItem>>(
      `${this.baseUrl}/profile`,
      { params: httpParams }
    );
  }

  getImageList(params: HostImageListParams): Observable<PaginatedResponse<HostImageItem>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.search?.trim()) {
      httpParams = httpParams.set('search', params.search.trim());
    }

    return this.http.get<PaginatedResponse<HostImageItem>>(this.baseUrl, {
      params: httpParams,
    });
  }
}
