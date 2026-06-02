import { TableColumn } from '../../../shared/models/table-column.model';

export const OFFLINE_HISTORY_TABLE_COLUMNS: TableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'username', label: 'Username' },
  { key: 'coinAdded', label: 'Coin Added' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'updatedAt', label: 'Updated At' },
];
