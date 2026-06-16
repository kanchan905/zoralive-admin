import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { mockApiInterceptor } from './core/interceptors/mock-api.interceptor';
import { agencyScopeInterceptor } from './core/interceptors/agency-scope.interceptor';
import { apiToastInterceptor } from './core/interceptors/api-toast.interceptor';
import { AppToastComponent } from './layout/components/toast/toast.component';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([mockApiInterceptor, agencyScopeInterceptor, apiToastInterceptor])
    ),
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      closeButton: true,
      progressBar: true,
      tapToDismiss: true,
      newestOnTop: true,
      preventDuplicates: true,
      toastComponent: AppToastComponent,
      toastClass: 'app-toast',
    }),
  ],
};
