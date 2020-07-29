import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;

  constructor() { }

  get userIsAuthenticated(): boolean {
    return this._userIsAuthenticated;
  }

  signIn(): void {
    this._userIsAuthenticated = true;
  }

  signOut(): void {
    this._userIsAuthenticated = false;
  }
}
