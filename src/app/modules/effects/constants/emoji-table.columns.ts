import { TableColumn } from '../../../shared/models/table-column.model';

export const EMOJI_TABLE_COLUMNS: TableColumn[] = [
  { key: 'select', label: '', type: 'checkbox', width: '56px' },
  { key: 'image', label: 'Emoji', type: 'image' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'updatedAt', label: 'Updated At' },
  { key: 'actions', label: 'Action', type: 'actions' },
];
