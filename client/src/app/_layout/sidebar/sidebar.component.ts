import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarMenuItem } from './sidebar-menu-item.model';
import { SidebarService } from './sidebar.service';

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
          this.messageService.add({
            severity: 'info',
            summary: 'Dashboard',
            detail: 'Navigate to Dashboard',
          });
        },
      },
      {
        label: 'To-Do List',
        icon: 'pi pi-fw pi-users',
        command: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'To-Do List',
            detail: 'Navigate to To-Do List',
          });
        },
      },
    ];
  }

  onSidebarHide = (): void => {
    this.sidebarService.setVisibility(false);
  };
}
