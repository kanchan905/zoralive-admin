import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
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
        path: 'host/detail',
        loadComponent: () =>
          import('./modules/host/pages/host-detail/host-detail.component').then(
            (m) => m.HostDetailComponent
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
];
