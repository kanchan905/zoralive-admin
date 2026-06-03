import { TableColumn } from '../../../shared/models/table-column.model';

export const HOST_INCOME_TABLE_COLUMNS: TableColumn[] = [
  { key: 'settlementDate', label: 'Settlement Date', type: 'date', width: '160px' },
  { key: 'settlementCycle', label: 'Settlement Cycle' },
  { key: 'myCommission', label: 'My Commission' },
  { key: 'totalCashOutAmount', label: 'Total cash out Amount' },
  { key: 'hostInfoLabel', label: 'Host Info', type: 'link', linkLabel: 'View', width: '120px' },
];
