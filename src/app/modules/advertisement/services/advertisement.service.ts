import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { withSkipApiToast } from '../../../core/utils/http-options.util';
import { environment } from '../../../../environments/environment';
import { AdvertisementSettings } from '../models/ad-network-config.model';

@Injectable({ providedIn: 'root' })
export class AdvertisementService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/advertisement`;

  getSettings(): Observable<AdvertisementSettings> {
    return this.http.get<AdvertisementSettings>(this.baseUrl, withSkipApiToast());
  }

  saveSettings(settings: AdvertisementSettings): Observable<AdvertisementSettings> {
    return this.http.put<AdvertisementSettings>(this.baseUrl, settings, withSkipApiToast());
  }
}
