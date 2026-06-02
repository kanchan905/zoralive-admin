import { TableColumn } from '../../../shared/models/table-column.model';

export const USER_TABLE_COLUMNS: TableColumn[] = [
  { key: 'image', label: 'Image', type: 'image', width: '72px' },
  { key: 'name', label: 'Name', width: '120px' },
  { key: 'status', label: 'Status', type: 'badge', width: '110px' },
  { key: 'userId', label: 'User Id', width: '100px' },
  { key: 'coin', label: 'Coin', width: '80px' },
  { key: 'followers', label: 'Followers', width: '90px' },
  { key: 'following', label: 'Following', width: '90px' },
  { key: 'country', label: 'Country', width: '100px' },
  { key: 'loginType', label: 'Login Type', width: '110px' },
  { key: 'uniqueField', label: 'Unique Field', width: '120px' },
  { key: 'lastLogin', label: 'Last Login', width: '130px' },
  { key: 'arrivedOn', label: 'Arrived On', width: '130px' },
  { key: 'isBlock', label: 'Is Block', type: 'toggle', width: '90px' },
  { key: 'actions', label: 'Action', type: 'actions', width: '100px' },
];
