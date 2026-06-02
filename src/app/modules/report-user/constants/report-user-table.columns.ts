import { TableColumn } from '../../../shared/models/table-column.model';

export const REPORT_USER_TABLE_COLUMNS: TableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'userName', label: 'User Name' },
  { key: 'country', label: 'Country' },
  { key: 'coin', label: 'Coin' },
  { key: 'count', label: 'Count' },
  { key: 'block', label: 'Block', type: 'toggle' },
  { key: 'actions', label: 'Action', type: 'actions' },
];
