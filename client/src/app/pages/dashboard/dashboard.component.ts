import { Component } from '@angular/core';
import { ToDoListComponent } from '../../components/to-do-list/to-do-list.component';
import { CommonModule } from '@angular/common';
import { IToDoList } from '../../_shared/models/to-do-list.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ToDoListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  toDoLists: IToDoList[] = [
    {
      id: 1,
      title: 'ToDo List 1',
      items: [
        { text: 'Task 1.1', isCompleted: false },
        { text: 'Task 1.2', isCompleted: true },
      ],
    },
    {
      id: 2,
      title: 'ToDo List 2',
      items: [
        { text: 'Task 2.1', isCompleted: false },
        { text: 'Task 2.2', isCompleted: true },
      ],
    },
    {
      id: 3,
      title: 'ToDo List 3',
      items: [
        { text: 'Task 3.1', isCompleted: false },
        { text: 'Task 3.2', isCompleted: true },
      ],
    },
    {
      id: 4,
      title: 'ToDo List 4',
      items: [
        { text: 'Task 4.1', isCompleted: false },
        { text: 'Task 4.2', isCompleted: true },
      ],
    },
    {
      id: 5,
      title: 'ToDo List 5',
      items: [
        { text: 'Task 5.1', isCompleted: false },
        { text: 'Task 5.2', isCompleted: true },
      ],
    },
  ];
}
