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
  { key: 'hangedCall', label: 'Hanged Call' },
  { key: 'rejectedCall', label: 'Rejected Call' },
  { key: 'missCalled', label: 'Miss Called' },
  { key: 'callBonus', label: 'Call bonus' },
  { key: 'callIncome', label: 'Call Income' },
  { key: 'receiveGift', label: 'Receive Gift' },
  { key: 'coin', label: 'Coin' },
  { key: 'callDuration', label: 'Call Duration' },
  { key: 'approvedDate', label: 'Approved Date', type: 'date' },
  { key: 'country', label: 'Country' },
  { key: 'agencyName', label: 'Agency Name' },
  { key: 'extraBonus', label: 'Extra Bonus' },
  { key: 'block', label: 'Block', type: 'toggle', width: '100px' },
  { key: 'actions', label: 'Action', type: 'actions', width: '100px' },
  { key: 'hostInfo', label: 'Host Info', type: 'link', linkLabel: 'View', width: '120px' },
];

export const HOST_STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'online', label: 'Online' },
  { value: 'live', label: 'Live' },
  { value: 'offline', label: 'Offline' },
] as const;
