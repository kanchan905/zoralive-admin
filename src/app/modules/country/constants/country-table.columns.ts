import { TableColumn } from '../../../shared/models/table-column.model';

export const COUNTRY_TABLE_COLUMNS: TableColumn[] = [
  { key: 'select', label: '', type: 'checkbox',},
  { key: 'id', label: 'ID', },
  { key: 'name', label: 'Name' },
  { key: 'createdAt', label: 'Created At', },
  { key: 'updatedAt', label: 'Updated At',},
  { key: 'actions', label: 'Action', type: 'actions',  },
];
