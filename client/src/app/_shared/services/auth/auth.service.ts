import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators'; // Import the shareReplay operator
@Injectable()
export class AuthService {
  private apiBaseUrl: string;

  constructor(private http: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  login = (email: string, password: string): Observable<any> => {
    return this.http
      .post(`${this.apiBaseUrl}/auth`, {
        email,
        password,
      })
      .pipe(shareReplay());
  };
}
