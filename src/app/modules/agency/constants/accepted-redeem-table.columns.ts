import { TableColumn } from '../../../shared/models/table-column.model';

export const ACCEPTED_REDEEM_TABLE_COLUMNS: TableColumn[] = [
  { key: 'image', label: 'Image', type: 'image', width: '80px' },
  { key: 'coin', label: 'Coin' },
  { key: 'dollar', label: 'Dollar' },
  { key: 'description', label: 'Description' },
  { key: 'acceptedOn', label: 'Accepted On', type: 'date' },
  { key: 'actions', label: 'Action', type: 'actions', width: '100px' },
];
