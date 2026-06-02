import { TableColumn } from '../../../shared/models/table-column.model';

export const VIP_PLAN_TABLE_COLUMNS: TableColumn[] = [
  { key: 'time', label: 'Time' },
  { key: 'price', label: 'Price' },
  { key: 'productId', label: 'Product Id' },
  { key: 'discount', label: 'Discount' },
  { key: 'createdAt', label: 'Created At' },
  { key: 'updatedAt', label: 'Updated At' },
  { key: 'active', label: 'Active', type: 'toggle' },
  { key: 'actions', label: 'Action', type: 'actions' },
];
