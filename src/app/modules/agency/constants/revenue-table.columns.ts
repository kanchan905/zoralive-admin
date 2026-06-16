import { TableColumn } from '../../../core/models/table-column.model';

export const REVENUE_TABLE_COLUMNS: TableColumn[] = [
  { key: 'image', label: 'Image', type: 'image', width: '80px' },
  { key: 'agencyName', label: 'Agency Name' },
  { key: 'code', label: 'Code' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'commission', label: 'Commission' },
  { key: 'period', label: 'Period' },
  { key: 'createdAt', label: 'Created At', type: 'date' },
  { key: 'actions', label: 'Action', type: 'actions', width: '100px' },
];
