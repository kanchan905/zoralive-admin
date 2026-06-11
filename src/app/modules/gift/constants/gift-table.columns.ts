import { TableColumn } from '../../../core/models/table-column.model';

export const GIFT_TABLE_COLUMNS: TableColumn[] = [
  { key: 'select', label: '', type: 'checkbox', width: '56px' },
  { key: 'image', label: 'Gift', type: 'image' },
  { key: 'coin', label: 'Coin' },
  { key: 'categoryName', label: 'Category Name' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'updatedAt', label: 'Updated At' },
  { key: 'actions', label: 'Action', type: 'actions' },
];
