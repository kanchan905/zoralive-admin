import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { SKIP_API_TOAST } from '../tokens/http-context.tokens';
import { isApiRequest } from '../utils/api-config.util';

export const apiToastInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const apiRequest = isApiRequest(req.url);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (apiRequest && !req.context.get(SKIP_API_TOAST)) {
        toast.apiError(error);
      }

      return throwError(() => error);
    })
  );
};
