import { TableColumn } from '../../../core/models/table-column.model';

export const PURCHASE_HISTORY_TABLE_COLUMNS: TableColumn[] = [
  { key: 'userName', label: 'UserName' },
  { key: 'paymentGateway', label: 'Payment Gateway' },
  { key: 'coin', label: 'Coin' },
  { key: 'rupee', label: 'Rupee' },
  { key: 'createdAt', label: 'Created At' },
];
