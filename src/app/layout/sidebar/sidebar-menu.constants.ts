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
      { label: 'Pending Complain', route: '/host/pending-complain' },
      { label: 'Solved Complain', route: '/host/solved-complain' },
      { label: 'Fake Host', route: '/host/fake' },
    ],
  },
  {
    label: 'User',
    icon: 'bi-people',
    children: [
      { label: 'User Detail', route: '/user/detail' },
      { label: 'Offline Recharge', route: '/user/offline-recharge' },
      { label: 'Offline History', route: '/user/offline-history' },
      { label: 'Pending Complain', route: '/user/pending-complain' },
      { label: 'Solved Complain', route: '/user/solved-complain' },
    ],
  },
  { label: 'Host Request', icon: 'bi-inbox', route: '/host-request' },
  { label: 'Host Image', icon: 'bi-images', route: '/host-image' },
  {
    label: 'Level',
    icon: 'bi-bar-chart-steps',
    children: [
      { label: 'Host Level', route: '/level/host' },
      { label: 'User Level', route: '/level/user' },
    ],
  },
  { label: 'Country', icon: 'bi-globe2', route: '/country' },
  {
    label: 'Gift',
    icon: 'bi-gift',
    children: [
      { label: 'Category', route: '/gift/category' },
      { label: 'Gift', route: '/gift/gifts' },
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
  { label: 'Logout', icon: 'bi-box-arrow-right', action: 'logout' },
];
