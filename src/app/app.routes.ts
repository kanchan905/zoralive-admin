import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { loginGuard } from './core/guards/login.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./modules/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./modules/dashboard/pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'agency/list',
        loadComponent: () =>
          import('./modules/agency/pages/agency-detail/agency-detail.component').then(
            (m) => m.AgencyDetailComponent
          ),
      },
      {
        path: 'agency/accepted',
        loadComponent: () =>
          import('./modules/agency/pages/accepted-redeem/accepted-redeem.component').then(
            (m) => m.AcceptedRedeemComponent
          ),
      },
      {
        path: 'agency/pending',
        loadComponent: () =>
          import('./modules/agency/pages/pending-redeem/pending-redeem.component').then(
            (m) => m.PendingRedeemComponent
          ),
      },
      {
        path: 'agency/settlement',
        loadComponent: () =>
          import('./modules/agency/pages/settlement/settlement.component').then(
            (m) => m.SettlementComponent
          ),
      },
      {
        path: 'agency/revenue',
        loadComponent: () =>
          import('./modules/agency/pages/revenue/revenue.component').then(
            (m) => m.RevenueComponent
          ),
      },
      {
        path: 'host/detail',
        loadComponent: () =>
          import('./modules/host/pages/host-detail/host-detail.component').then(
            (m) => m.HostDetailComponent
          ),
      },
      {
        path: 'host/pending-complain',
        loadComponent: () =>
          import('./modules/host/pages/pending-complain/pending-complain.component').then(
            (m) => m.PendingComplainComponent
          ),
      },
      {
        path: 'host/solved-complain',
        loadComponent: () =>
          import('./modules/host/pages/solved-complain/solved-complain.component').then(
            (m) => m.SolvedComplainComponent
          ),
      },
      {
        path: 'host/fake',
        loadComponent: () =>
          import('./modules/host/pages/fake-host/fake-host.component').then(
            (m) => m.FakeHostComponent
          ),
      },
      {
        path: 'user/detail',
        loadComponent: () =>
          import('./modules/user/pages/user-detail/user-detail.component').then(
            (m) => m.UserDetailComponent
          ),
      },
      {
        path: 'user/offline-recharge',
        loadComponent: () =>
          import('./modules/user/pages/offline-recharge/offline-recharge.component').then(
            (m) => m.OfflineRechargeComponent
          ),
      },
      {
        path: 'user/offline-history',
        loadComponent: () =>
          import('./modules/user/pages/offline-history/offline-history.component').then(
            (m) => m.OfflineHistoryComponent
          ),
      },
      {
        path: 'user/pending-complain',
        loadComponent: () =>
          import('./modules/user/pages/pending-complain/pending-complain.component').then(
            (m) => m.UserPendingComplainComponent
          ),
      },
      {
        path: 'user/solved-complain',
        loadComponent: () =>
          import('./modules/user/pages/solved-complain/solved-complain.component').then(
            (m) => m.UserSolvedComplainComponent
          ),
      },
      {
        path: 'host-request',
        loadComponent: () =>
          import('./modules/host-request/pages/host-request/host-request.component').then(
            (m) => m.HostRequestComponent
          ),
      },
      {
        path: 'host-income',
        loadComponent: () =>
          import('./modules/host-income/pages/host-income/host-income.component').then(
            (m) => m.HostIncomeComponent
          ),
      },
      {
        path: 'host-image',
        loadComponent: () =>
          import('./modules/host-image/pages/host-image/host-image.component').then(
            (m) => m.HostImageComponent
          ),
      },
      {
        path: 'level/host',
        loadComponent: () =>
          import('./modules/level/pages/host-level/host-level.component').then(
            (m) => m.HostLevelComponent
          ),
      },
      {
        path: 'level/user',
        loadComponent: () =>
          import('./modules/level/pages/user-level/user-level.component').then(
            (m) => m.UserLevelComponent
          ),
      },
      {
        path: 'country',
        loadComponent: () =>
          import('./modules/country/pages/country/country.component').then(
            (m) => m.CountryComponent
          ),
      },
      {
        path: 'gift/category',
        loadComponent: () =>
          import('./modules/gift/pages/category/category.component').then(
            (m) => m.CategoryComponent
          ),
      },
      {
        path: 'gift/gifts',
        loadComponent: () =>
          import('./modules/gift/pages/gifts/gifts.component').then((m) => m.GiftsComponent),
      },
      {
        path: 'effects/emoji',
        loadComponent: () =>
          import('./modules/effects/pages/emoji/emoji.component').then((m) => m.EmojiComponent),
      },
      {
        path: 'effects/sticker',
        loadComponent: () =>
          import('./modules/effects/pages/sticker/sticker.component').then(
            (m) => m.StickerComponent
          ),
      },
      {
        path: 'plan/purchase',
        loadComponent: () =>
          import('./modules/plan/pages/purchase-plan/purchase-plan.component').then(
            (m) => m.PurchasePlanComponent
          ),
      },
      {
        path: 'plan/vip',
        loadComponent: () =>
          import('./modules/plan/pages/vip-plan/vip-plan.component').then((m) => m.VipPlanComponent),
      },
      {
        path: 'purchase-history',
        loadComponent: () =>
          import('./modules/purchase-history/pages/purchase-history/purchase-history.component').then(
            (m) => m.PurchaseHistoryComponent
          ),
      },
      {
        path: 'banner',
        loadComponent: () =>
          import('./modules/banner/pages/banner/banner.component').then((m) => m.BannerComponent),
      },
      {
        path: 'report-user',
        loadComponent: () =>
          import('./modules/report-user/pages/report-user/report-user.component').then(
            (m) => m.ReportUserComponent
          ),
      },
      {
        path: 'advertisement',
        loadComponent: () =>
          import('./modules/advertisement/pages/advertisement/advertisement.component').then(
            (m) => m.AdvertisementComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./modules/settings/pages/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./modules/profile/pages/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
