import { TableColumn } from '../../../shared/models/table-column.model';

/** Agency page columns — other pages define their own column arrays */
export const AGENCY_TABLE_COLUMNS: TableColumn[] = [
  { key: 'image', label: 'Image', type: 'image', width: '80px' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'country', label: 'Country' },
  { key: 'code', label: 'Code' },
  { key: 'mobile', label: 'Mobile Number' },
  { key: 'createdAt', label: 'Created At', type: 'date' },
  { key: 'actions', label: 'Action', type: 'actions', width: '100px' },
  { key: 'isDisabled', label: 'Is Disable', type: 'toggle', width: '100px' },
  { key: 'hostDetail', label: 'Host Detail', type: 'link' },
  { key: 'settlementReport', label: 'Settlement Report', type: 'link' },
  { key: 'settlementReportHistory', label: 'Settlement Report History', type: 'link' },
];
