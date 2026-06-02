export const FAKE_HOST_AGENCY_OPTIONS = [
  { value: '', label: 'Agency' },
  { value: 'agency-1', label: 'Agency One' },
  { value: 'agency-2', label: 'Agency Two' },
  { value: 'agency-3', label: 'Agency Three' },
] as const;

export type HostAddMode = 'single' | 'multiple';
