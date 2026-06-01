export type HostStatus = 'online' | 'live' | 'offline' | string;

export interface Host {
  id?: number;
  image?: string;
  name: string;
  hostId: string;
  status: HostStatus;
  onlineDuration?: string;
  averageTime?: string;
  liveDuration?: string;
  answerRate?: string;
  unqualifiedRate?: string;
  hangupRate?: string;
}
