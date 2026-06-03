import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';


export const agencyScopeInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  if (!auth.isAgency() || !req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  const agencyId = auth.getAgencyId();
  const agencyCode = auth.getAgencyCode();

  if (!agencyId && !agencyCode) {
    return next(req);
  }

  let params = req.params;

  if (agencyId && !params.has('agencyId')) {
    params = params.set('agencyId', agencyId);
  }

  if (agencyCode && !params.has('agencyCode')) {
    params = params.set('agencyCode', agencyCode);
  }

  return next(req.clone({ params }));
};
