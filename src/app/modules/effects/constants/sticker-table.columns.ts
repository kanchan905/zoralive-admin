import { TableColumn } from '../../../core/models/table-column.model';

export const STICKER_TABLE_COLUMNS: TableColumn[] = [
  { key: 'select', label: '', type: 'checkbox', width: '56px' },
  { key: 'image', label: 'Sticker', type: 'image' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'updatedAt', label: 'Updated At' },
  { key: 'actions', label: 'Action', type: 'actions' },
];
