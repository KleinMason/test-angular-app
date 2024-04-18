import { Injectable } from '@angular/core';
import { IUser } from '../../models/user.model';

const ACCESS_TOKEN_KEY = 'auth-access-token';
const REFRESH_TOKEN_KEY = 'auth-refresh-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private storage = window.localStorage;
  constructor() {}

  signOut(): void {
    this.storage.clear();
  }

  saveAccessToken(accessToken: string): void {
    this.storage.removeItem(ACCESS_TOKEN_KEY);
    this.storage.setItem(ACCESS_TOKEN_KEY, accessToken);

    const user = this.getUser();
    if (user?.id) {
      this.saveUser(user);
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  saveRefreshToken(refreshToken: string): void {
    this.storage.removeItem(REFRESH_TOKEN_KEY);
    this.storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  saveUser(user: IUser): void {
    this.storage.removeItem(USER_KEY);
    this.storage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): IUser | null {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }
}
