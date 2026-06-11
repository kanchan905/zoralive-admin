import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { SKIP_API_TOAST } from '../tokens/http-context.tokens';
import { environment } from '../../../environments/environment';

export const apiToastInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const isApiRequest = req.url.startsWith(environment.apiUrl);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (isApiRequest && !req.context.get(SKIP_API_TOAST)) {
        toast.apiError(error);
      }

      return throwError(() => error);
    })
  );
};
