import { TableColumn } from '../../../shared/models/table-column.model';

export const BANNER_TABLE_COLUMNS: TableColumn[] = [
  { key: 'image', label: 'Image', type: 'image' },
  { key: 'link', label: 'Link' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'updatedAt', label: 'Updated At' },
  { key: 'actions', label: 'Action', type: 'actions' },
];
