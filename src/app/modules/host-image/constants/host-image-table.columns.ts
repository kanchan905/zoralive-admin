import { TableColumn } from '../../../core/models/table-column.model';

export const HOST_PROFILE_IMAGE_TABLE_COLUMNS: TableColumn[] = [
  { key: 'newImage', label: 'New Image', type: 'image', width: '95px' },
  { key: 'oldImage', label: 'Old Image', type: 'image', width: '95px' },
  { key: 'name', label: 'Name', width: '120px' },
  { key: 'hostId', label: 'Host Id', width: '90px' },
  { key: 'country', label: 'Country', width: '100px' },
  { key: 'createdAt', label: 'Created At', width: '120px' },
  { key: 'isApprove', label: 'Is Approve', type: 'toggle', width: '95px' },
  { key: 'delete', label: 'Delete', type: 'link', linkLabel: 'Delete', width: '90px' },
];

export const HOST_IMAGE_TABLE_COLUMNS: TableColumn[] = [
  { key: 'image', label: 'Image', type: 'image', width: '95px' },
  { key: 'name', label: 'Name', width: '120px' },
  { key: 'hostId', label: 'Host Id', width: '90px' },
  { key: 'country', label: 'Country', width: '100px' },
  { key: 'createdAt', label: 'Created At', width: '120px' },
  { key: 'showImage', label: 'Show Image', type: 'toggle', width: '95px' },
  { key: 'isApprove', label: 'Is Approve', type: 'toggle', width: '95px' },
  { key: 'delete', label: 'Delete', type: 'link', linkLabel: 'Delete', width: '90px' },
];
