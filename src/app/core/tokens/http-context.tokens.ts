import { HttpContextToken } from '@angular/common/http';

/** Skip automatic API error toast for this request. */
export const SKIP_API_TOAST = new HttpContextToken<boolean>(() => false);
