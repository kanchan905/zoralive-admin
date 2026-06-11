import { TableColumn } from '../../../core/models/table-column.model';

export const HOST_LEVEL_TABLE_COLUMNS: TableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'coin', label: 'Coin' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'updatedAt', label: 'Updated At' },
  { key: 'actions', label: 'Action', type: 'actions', width: '100px' },
];
