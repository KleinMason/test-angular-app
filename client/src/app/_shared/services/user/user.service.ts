import { Injectable } from '@angular/core';
import { IUser } from '../../models/user.model';
import { Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class UserService {
  private apiBaseUrl: string;

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  addUser = (user: IUser): Observable<IUser> => {
    return this.http
      .post<IUser>(`${this.apiBaseUrl}/user`, user)
      .pipe(shareReplay());
  };
}
