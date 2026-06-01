import { TableColumn } from '../../../shared/models/table-column.model';

export const PENDING_REDEEM_TABLE_COLUMNS: TableColumn[] = [
  { key: 'image', label: 'Image', type: 'image', width: '80px' },
  { key: 'coin', label: 'Coin' },
  { key: 'dollar', label: 'Dollar' },
  { key: 'description', label: 'Description' },
  { key: 'status', label: 'Status' },
  { key: 'arrivedOn', label: 'Arrived On', type: 'date' },
  { key: 'actions', label: 'Action', type: 'actions', width: '100px' },
];
