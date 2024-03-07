import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { IToDoList } from '../../_shared/models/to-do-list.model';

@Component({
  selector: 'app-to-do-list',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CheckboxModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.scss',
})
export class ToDoListComponent {
  @Input({ required: true })
  toDoList!: IToDoList;

  constructor(private messageService: MessageService) {}

  getCompletedItemCount(): number {
    return this.toDoList.items.filter((item) => item.isCompleted).length;
  }

  onOpenClick(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Open',
      detail: 'Open To-Do List',
    });
  }
}
