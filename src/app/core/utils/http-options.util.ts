import { HttpContext } from '@angular/common/http';
import { SKIP_API_TOAST } from '../tokens/http-context.tokens';

export function withSkipApiToast() {
  return { context: new HttpContext().set(SKIP_API_TOAST, true) };
}
