import { TableColumn } from '../../../core/models/table-column.model';

export const SETTLEMENT_TABLE_COLUMNS: TableColumn[] = [
  { key: 'image', label: 'Image', type: 'image', width: '80px' },
  { key: 'agencyName', label: 'Agency Name' },
  { key: 'code', label: 'Code' },
  { key: 'settlementDate', label: 'Settlement Date', type: 'date' },
  { key: 'settlementCycle', label: 'Settlement Cycle' },
  { key: 'totalAmount', label: 'Total Amount' },
  { key: 'commission', label: 'Commission' },
  { key: 'actions', label: 'Action', type: 'actions', width: '100px' },
];
