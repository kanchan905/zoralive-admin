import { Component, DestroyRef, Input, computed, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { AGENCY_SIDEBAR_MENU, SIDEBAR_MENU } from './sidebar-menu.constants';
import { SidebarMenuItem } from './sidebar-menu.model';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  @Input() collapsed = false;

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly auth = inject(AuthService);

  readonly user = this.auth.user();

  readonly menuItems = computed(() =>
    this.user()?.role === 'agency' ? AGENCY_SIDEBAR_MENU : SIDEBAR_MENU
  );
  /** Sirf ek parent menu expand — accordion */
  readonly expandedLabel = signal<string | null>(null);

  ngOnInit(): void {
    this.syncExpandedFromRoute();

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.syncExpandedFromRoute());
  }

  toggleExpand(item: SidebarMenuItem): void {
    if (!item.children?.length) {
      return;
    }

    this.expandedLabel.update((current) => (current === item.label ? null : item.label));
  }

  isExpanded(item: SidebarMenuItem): boolean {
    return this.expandedLabel() === item.label;
  }

  hasChildren(item: SidebarMenuItem): boolean {
    return !!item.children?.length;
  }

  isLogoutItem(item: SidebarMenuItem): boolean {
    return item.action === 'logout';
  }

  onLogoutClick(): void {
    void this.auth.logoutWithConfirm();
  }

  /** Top-level link (Dashboard, etc.) — solid active sirf jab route match ho aur koi menu open na ho */
  isFlatItemActive(item: SidebarMenuItem): boolean {
    if (!item.route) {
      return false;
    }

    const url = this.currentUrl();
    const onRoute =
      item.route === '/dashboard'
        ? url === '/' || url === '/dashboard'
        : url === item.route || url.startsWith(`${item.route}/`);

    if (!onRoute) {
      return false;
    }

    if (item.route === '/dashboard' && this.expandedLabel() !== null) {
      return false;
    }

    return true;
  }

  isChildActive(route: string | undefined): boolean {
    if (!route) {
      return false;
    }
    const url = this.currentUrl();
    return url === route || url.startsWith(`${route}/`);
  }

  private currentUrl(): string {
    return this.router.url.split('?')[0];
  }

  private syncExpandedFromRoute(): void {
    const url = this.currentUrl();

    for (const item of this.menuItems()) {
      if (!item.children?.length) {
        continue;
      }

      const matches = item.children.some(
        (child) => child.route && (url === child.route || url.startsWith(`${child.route}/`))
      );

      if (matches) {
        this.expandedLabel.set(item.label);
        return;
      }
    }
  }
}
