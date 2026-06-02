import { TableColumn } from '../../../shared/models/table-column.model';

export const CATEGORY_TABLE_COLUMNS: TableColumn[] = [
  { key: 'select', label: 'Select', type: 'checkbox',},
  { key: 'image', label: 'Image', type: 'image',},
  { key: 'name', label: 'Name' },
  { key: 'createdAt', label: 'Created At', },
  { key: 'updatedAt', label: 'Updated At',},
  { key: 'isTop', label: 'Is Top', type: 'toggle',},
  { key: 'actions', label: 'Action', type: 'actions',},
];
