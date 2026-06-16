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
  hangedCall?: string | number;
  rejectedCall?: string | number;
  missCalled?: string | number;
  callBonus?: string | number;
  callIncome?: string | number;
  receiveGift?: string | number;
  coin?: string | number;
  callDuration?: string;
  approvedDate?: string;
  country?: string;
  agencyName?: string;
  extraBonus?: string | number;
  block?: boolean;
  hostInfo?: string;
}
