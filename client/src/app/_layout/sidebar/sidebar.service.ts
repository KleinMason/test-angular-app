import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  protected visible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  public isVisible = this.visible.asObservable();

  public toggleVisibility = (): void => {
    this.visible.next(!this.visible.value);
  };

  public setVisibility = (visibility: boolean): void => {
    this.visible.next(visibility);
  };
}
