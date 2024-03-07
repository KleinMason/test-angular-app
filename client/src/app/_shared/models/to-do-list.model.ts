export interface IToDoList {
  id: number;
  title: string;
  items: IToDoListItem[];
}

export interface IToDoListItem {
  text: string;
  isCompleted: boolean;
}
