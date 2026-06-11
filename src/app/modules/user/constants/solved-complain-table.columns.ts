import { TableColumn } from '../../../core/models/table-column.model';

export const USER_SOLVED_COMPLAIN_TABLE_COLUMNS: TableColumn[] = [
  { key: 'image', label: 'Image', type: 'image', width: '80px' },
  { key: 'coin', label: 'Coin' },
  { key: 'contact', label: 'Contact' },
  { key: 'solvedOn', label: 'Solved On' },
  {
    key: 'viewDetail',
    label: 'View Detail',
    type: 'link',
    linkLabel: 'View Detail',
  },
];
