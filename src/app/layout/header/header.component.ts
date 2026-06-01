import { Component, EventEmitter, HostListener, inject, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NotificationOneComponent } from '../components/notification-one/notification-one.component';
import { NotificationTwoComponent } from '../components/notification-two/notification-two.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();

  private readonly dialog = inject(MatDialog);

  readonly profileMenuOpen = signal(false);
  readonly avatarUrl = 'assets/admin-avatar.png';

  @HostListener('document:click')
  closeProfileMenuOnOutsideClick(): void {
    if (this.profileMenuOpen()) {
      this.profileMenuOpen.set(false);
    }
  }

  toggleProfileMenu(event: Event): void {
    event.stopPropagation();
    this.profileMenuOpen.update((open) => !open);
  }

  closeProfileMenu(): void {
    this.profileMenuOpen.set(false);
  }

  openNotificationOne(): void {
    this.dialog.open(NotificationOneComponent, {
      width: '480px',
      maxWidth: '95vw',
      panelClass: 'notification-dialog-panel',
      autoFocus: 'first-titled-element',
    });
  }

  openNotificationTwo(): void {
    this.dialog.open(NotificationTwoComponent, {
      width: '480px',
      maxWidth: '95vw',
      panelClass: 'notification-dialog-panel',
      autoFocus: 'first-titled-element',
    });
  }
}
