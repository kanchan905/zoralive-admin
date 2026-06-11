import { TableColumn } from '../../../core/models/table-column.model';

export const HOST_TABLE_COLUMNS: TableColumn[] = [
  { key: 'image', label: 'Image', type: 'image', width: '80px' },
  { key: 'name', label: 'Name' },
  { key: 'hostId', label: 'Host Id' },
  { key: 'status', label: 'Status', type: 'badge', width: '120px' },
  { key: 'onlineDuration', label: 'Online Duration' },
  { key: 'averageTime', label: 'Average Time' },
  { key: 'liveDuration', label: 'Live Duration' },
  { key: 'answerRate', label: 'Answer Rate' },
  { key: 'unqualifiedRate', label: 'Unqualified Rate' },
  { key: 'hangupRate', label: 'Hangup Rate' },
  { key: 'actions', label: 'Action', type: 'actions', width: '100px' },
];

export const HOST_STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'online', label: 'Online' },
  { value: 'live', label: 'Live' },
  { value: 'offline', label: 'Offline' },
] as const;
