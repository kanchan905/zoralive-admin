import { environment } from '../../../environments/environment';

/** Live API calls tabhi jab mock mode off ho aur placeholder URL na ho. */
export function isLiveApiEnabled(): boolean {
  if (environment.useMockApi) {
    return false;
  }

  const url = environment.apiUrl.trim();

  return url.length > 0 && !url.includes('your-api-url.com');
}

export function isApiRequest(url: string): boolean {
  const base = environment.apiUrl;

  if (base.startsWith('http')) {
    return url.startsWith(base);
  }

  return url.includes(base);
}
