import { TableColumn } from '../../../shared/models/table-column.model';

export const USER_PENDING_COMPLAIN_TABLE_COLUMNS: TableColumn[] = [
  { key: 'image', label: 'Image', type: 'image', width: '80px' },
  { key: 'coin', label: 'Coin' },
  { key: 'contact', label: 'Contact' },
  { key: 'arrivedOn', label: 'Arrived On' },
  { key: 'isSolved', label: 'Is Solved' },
  {
    key: 'viewDetail',
    label: 'View Detail',
    type: 'link',
    linkLabel: 'View Detail',
  },
];
