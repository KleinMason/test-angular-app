import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarMenuItem } from './sidebar-menu-item.model';
import { SidebarService } from './sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule],
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
    </p-sidebar>
  `,
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  isVisible: boolean = false;
  menuItems: SidebarMenuItem[] = [];

  constructor(
    private sidebarService: SidebarService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.sidebarService.isVisible.subscribe((visibility: boolean) => {
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
        label: 'New User',
        icon: 'pi pi-fw pi-user-plus',
        command: () => {
          this.sidebarService.setVisibility(false);
          this.router.navigate(['/signup']);
        },
      },
    ];
  }

  onSidebarHide = (): void => {
    this.sidebarService.setVisibility(false);
  };
}
