import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../../core/models/paginated-response.model';
import { VipPlan } from '../models/vip-plan.model';

export interface VipPlanListParams {
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class VipPlanService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/plan/vip`;

  getList(params: VipPlanListParams): Observable<PaginatedResponse<VipPlan>> {
    const httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    return this.http.get<PaginatedResponse<VipPlan>>(this.baseUrl, { params: httpParams });
  }
}
