import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { TokenStorageService } from '../token-storage/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiBaseUrl: string;
  protected isLoggedInSubject: ReplaySubject<boolean> =
    new ReplaySubject<boolean>(1);

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService,
  ) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }

  public isLoggedIn = this.isLoggedInSubject.asObservable();

  login = (email: string, password: string): Observable<any> => {
    return this.http
      .post<{
        accessToken: string;
        expiresIn: string;
      }>(`${this.apiBaseUrl}/auth`, { email, password })
      .pipe(
        tap((res) => {
          this.tokenStorageService.saveAccessToken(res.accessToken);
          this.isLoggedInSubject.next(true);
        }),
      );
  };

  logout = () => {
    this.tokenStorageService.signOut();
    this.isLoggedInSubject.next(false);
  };
}
