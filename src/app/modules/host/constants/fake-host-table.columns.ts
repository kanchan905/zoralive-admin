import { TableColumn } from '../../../core/models/table-column.model';

export const FAKE_HOST_TABLE_COLUMNS: TableColumn[] = [
  { key: 'image', label: 'Image', type: 'image', width: '80px' },
  { key: 'name', label: 'Name' },
  { key: 'hostId', label: 'Host Id' },
  { key: 'coin', label: 'Coin' },
  { key: 'country', label: 'Country' },
  { key: 'agencyName', label: 'Agency Name' },
  { key: 'live', label: 'Live', type: 'toggle', width: '90px' },
  { key: 'video', label: 'Video', type: 'toggle', width: '90px' },
  { key: 'actions', label: 'Action', type: 'actions', width: '100px' },
];
