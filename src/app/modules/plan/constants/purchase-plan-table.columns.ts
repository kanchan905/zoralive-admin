import { TableColumn } from '../../../shared/models/table-column.model';

export const PURCHASE_PLAN_TABLE_COLUMNS: TableColumn[] = [
  { key: 'coin', label: 'Coin' },
  { key: 'rupee', label: 'Rupee' },
  { key: 'productId', label: 'Product Id' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'updatedAt', label: 'Updated At' },
  { key: 'actions', label: 'Action', type: 'actions' },
];
