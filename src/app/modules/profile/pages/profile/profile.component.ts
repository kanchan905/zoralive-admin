import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { BreadcrumbItem } from '../../../../shared/models/breadcrumb.model';

@Component({
  selector: 'app-profile',
  imports: [BreadcrumbComponent, PageHeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  readonly breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Profile' },
  ];

  readonly avatarUrl = 'assets/admin-avatar.png';
}
