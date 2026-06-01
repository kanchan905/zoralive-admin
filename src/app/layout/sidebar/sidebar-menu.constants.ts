import { SidebarMenuItem } from './sidebar-menu.model';

export const SIDEBAR_MENU: SidebarMenuItem[] = [
  { label: 'Dashboard', icon: 'bi-speedometer2', route: '/dashboard' },
  {
    label: 'Agency',
    icon: 'bi-building',
    children: [
      { label: 'Agency Detail', route: '/agency/list' },
      { label: 'Accepted', route: '/agency/accepted' },
      { label: 'Pending Redeem', route: '/agency/pending' },
    ],
  },
  {
    label: 'Host',
    icon: 'bi-person-video2',
    children: [
      { label: 'Host Detail', route: '/host/detail' },
      { label: 'Pending Complaint', route: '/host/pending-complaint' },
      { label: 'Solved Complaint', route: '/host/solved-complaint' },
      { label: 'Fake Host', route: '/host/fake' },
    ],
  },
  {
    label: 'User',
    icon: 'bi-people',
    children: [
      { label: 'User List', route: '/user/list' },
      { label: 'Reported Users', route: '/user/reported' },
    ],
  },
  { label: 'Host Request', icon: 'bi-inbox', route: '/host-request' },
  { label: 'Host Image', icon: 'bi-images', route: '/host-image' },
  {
    label: 'Level',
    icon: 'bi-bar-chart-steps',
    children: [
      { label: 'User Level', route: '/level/user' },
      { label: 'Host Level', route: '/level/host' },
    ],
  },
  { label: 'Country', icon: 'bi-globe2', route: '/country' },
  {
    label: 'Gift',
    icon: 'bi-gift',
    children: [
      { label: 'Gift List', route: '/gift/list' },
      { label: 'Gift Category', route: '/gift/category' },
    ],
  },
  {
    label: 'Effects',
    icon: 'bi-stars',
    children: [
      { label: 'Emoji', route: '/effects/emoji' },
      { label: 'Sticker', route: '/effects/sticker' },
    ],
  },
  {
    label: 'Plan',
    icon: 'bi-credit-card',
    children: [
      { label: 'Purchase Plan', route: '/plan/purchase' },
      { label: 'VIP Plan', route: '/plan/vip' },
    ],
  },
  { label: 'Purchase History', icon: 'bi-clock-history', route: '/purchase-history' },
  { label: 'Banner', icon: 'bi-image', route: '/banner' },
  { label: 'Report User', icon: 'bi-flag', route: '/report-user' },
  { label: 'Advertisement', icon: 'bi-megaphone', route: '/advertisement' },
  { label: 'Setting', icon: 'bi-gear', route: '/settings' },
  { label: 'Profile', icon: 'bi-person-circle', route: '/profile' },
  { label: 'Logout', icon: 'bi-box-arrow-right', route: '/logout' },
];
