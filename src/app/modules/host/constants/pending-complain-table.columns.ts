import { TableColumn } from '../../../core/models/table-column.model';

export const PENDING_COMPLAIN_TABLE_COLUMNS: TableColumn[] = [
  { key: 'name', label: 'Name' },
  { key: 'count', label: 'Count'},
  {
    key: 'viewDetail',
    label: 'View Detail',
    type: 'link',
    linkLabel: 'View Detail',
  },
];
