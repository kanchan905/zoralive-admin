import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { withSkipApiToast } from '../../../core/utils/http-options.util';
import { environment } from '../../../../environments/environment';
import { PlatformSettings } from '../models/platform-settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/settings`;

  getSettings(): Observable<PlatformSettings> {
    return this.http.get<PlatformSettings>(this.baseUrl, withSkipApiToast());
  }

  saveSettings(settings: PlatformSettings): Observable<PlatformSettings> {
    return this.http.put<PlatformSettings>(this.baseUrl, settings, withSkipApiToast());
  }
}
