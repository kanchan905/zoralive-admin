import { TableColumn } from '../../../core/models/table-column.model';

export const HOST_REQUEST_TABLE_COLUMNS: TableColumn[] = [
  { key: 'video', label: 'Video' },
  { key: 'profileImage', label: 'Profile Image', type: 'image', width: '90px' },
  { key: 'newImage', label: 'New Image', type: 'image', width: '90px' },
  { key: 'name', label: 'Name', width: '110px' },
  { key: 'hostId', label: 'Host Id', width: '90px' },
  { key: 'coin', label: 'Coin', width: '80px' },
  { key: 'followers', label: 'Followers', width: '90px' },
  { key: 'following', label: 'Following', width: '90px' },
  { key: 'country', label: 'Country', width: '100px' },
  { key: 'agencyName', label: 'Agency Name', width: '110px' },
  { key: 'showImage', label: 'Show Image', type: 'toggle', width: '95px' },
  { key: 'isAccept', label: 'Is Accept', type: 'toggle', width: '90px' },
  { key: 'isDecline', label: 'Is Decline', type: 'toggle', width: '95px' },
  { key: 'actions', label: 'Action', type: 'actions', width: '90px' },
  { key: 'createdAt', label: 'Created At', width: '120px' },
];
