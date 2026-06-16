import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { isApiRequest } from '../utils/api-config.util';

export const agencyScopeInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  if (!auth.isAgency() || !isApiRequest(req.url)) {
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
