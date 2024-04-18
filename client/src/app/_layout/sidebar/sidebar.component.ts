import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { Subject } from 'rxjs';
import { AuthService } from '../../_shared/services/auth/auth.service';
import { SidebarMenuItem } from './sidebar-menu-item.model';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonModule, CommonModule, SidebarModule],
  template: `
    <p-sidebar
      [(visible)]="isVisible"
      position="right"
      [baseZIndex]="9999"
      (onHide)="onSidebarHide()"
    >
      <ng-template pTemplate="header">
        <h3>Menu</h3>
      </ng-template>
      <ul class="sidebar-menu">
        @for (menuItem of menuItems; track $index) {
          <li>
            <a (click)="menuItem?.command()">
              <i class="{{ menuItem.icon }}"></i>
              <span>{{ menuItem.label }}</span>
            </a>
          </li>
        }
      </ul>
      @if (isLoggedIn) {
        <p-button
          label="logout"
          severity="danger"
          styleClass="w-full"
          [outlined]="true"
          (onClick)="onLogoutClick()"
        ></p-button>
      } @else {
        <p-button
          label="login"
          styleClass="w-full"
          [outlined]="true"
          (onClick)="onLoginClick()"
        ></p-button>
      }
    </p-sidebar>
  `,
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit, OnDestroy {
  isVisible: boolean = false;
  menuItems: SidebarMenuItem[] = [];
  private unsubscribe$ = new Subject<void>();
  private _isLoggedIn: boolean = false;
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      console.log('isLoggedIn', isLoggedIn);
      this._isLoggedIn = isLoggedIn;
    });
    this.sidebarService.isVisible.subscribe((visibility: boolean) => {
      console.log('visibility', visibility);
      this.isVisible = visibility;
    });
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        command: () => {
          this.sidebarService.setVisibility(false);
          this.router.navigate(['/dashboard']);
        },
      },
      {
        label: 'Blog',
        icon: 'pi pi-fw pi-pencil',
        command: () => {
          this.sidebarService.setVisibility(false);
          this.router.navigate(['/blog']);
        },
      },
      {
        label: 'New User',
        icon: 'pi pi-fw pi-user-plus',
        command: () => {
          this.sidebarService.setVisibility(false);
          this.router.navigate(['/signup']);
        },
      },
    ];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSidebarHide = (): void => {
    this.sidebarService.setVisibility(false);
  };

  onLoginClick = (): void => {
    this.sidebarService.setVisibility(false);
    this.router.navigate(['/login']);
  };

  onLogoutClick = (): void => {
    this.authService.logout();
    this.sidebarService.setVisibility(false);
    this.router.navigate(['/login']);
  };
}
