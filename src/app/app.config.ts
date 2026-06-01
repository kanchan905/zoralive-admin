import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    provideToastr({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      closeButton: true,
      progressBar: true,
      tapToDismiss: true,
      newestOnTop: true,
      preventDuplicates: true,
      toastClass: 'zora-toast',
      titleClass: 'zora-toast-title',
      messageClass: 'zora-toast-message',
    }),
  ],
};
