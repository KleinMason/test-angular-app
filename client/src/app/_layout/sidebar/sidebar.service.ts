import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SidebarService {
  protected visible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  get isVisible(): Observable<boolean> {
    return this.visible.asObservable();
  }

  public toggleVisibility = (): void => {
    this.visible.next(!this.visible.value);
  };

  public setVisibility = (visibility: boolean): void => {
    this.visible.next(visibility);
  };
}
