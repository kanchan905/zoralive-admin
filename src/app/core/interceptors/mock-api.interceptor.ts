import { HttpInterceptorFn, HttpParams, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { isApiRequest, isLiveApiEnabled } from '../utils/api-config.util';

function mockResponseBody(url: string, method: string, params: HttpParams): unknown {
  if (method !== 'GET') {
    return { success: true, message: 'OK' };
  }

  if (/\/advertisement\/?$/i.test(url)) {
    return {
      google: {
        enabled: true,
        interstitialId: 'ca-app-pub-3940256099942544/1033173712',
        rewardId: 'ca-app-pub-3940256099942544/5224354917',
        nativeId: 'ca-app-pub-3940256099942544/2247696110',
      },
      facebook: {
        enabled: true,
        interstitialId: 'IMG_16_9_APP_INSTALL#1234567890',
        rewardId: 'IMG_16_9_APP_INSTALL#0987654321',
        nativeId: 'IMG_16_9_APP_INSTALL#1122334455',
      },
    };
  }

  const isPaginated =
    params.has('page') ||
    params.has('pageSize') ||
    /\/(list|settlements|revenue|redeems|hosts|users|countries|gifts|categories|complaints|history|settlements)/i.test(
      url
    );

  if (isPaginated) {
    return {
      data: [],
      total: 0,
      page: Number(params.get('page') ?? 1),
      pageSize: Number(params.get('pageSize') ?? 10),
    };
  }

  return {};
}

/** useMockApi: true par network/proxy call skip — empty mock response */
export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (isLiveApiEnabled() || !isApiRequest(req.url)) {
    return next(req);
  }

  return of(
    new HttpResponse({
      status: 200,
      body: mockResponseBody(req.url, req.method, req.params),
    })
  );
};
