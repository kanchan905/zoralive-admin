export interface HostSettlement {
  id: string;
  settlementDate: string;
  settlementCycle: string;
  myCommission: number;
  totalCashOutAmount: number;
  hostInfoLabel?: string;
}
