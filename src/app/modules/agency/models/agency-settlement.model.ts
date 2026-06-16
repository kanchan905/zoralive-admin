export interface AgencySettlement {
  id?: number;
  image?: string;
  agencyName: string;
  code: string;
  settlementDate: string;
  settlementCycle: string;
  totalAmount: number;
  commission: number;
}
