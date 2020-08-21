import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = true;
  private _userId: string = 'sj29dhsk91ks';

  constructor() { }

  get userIsAuthenticated(): boolean {
    return this._userIsAuthenticated;
  }

  get userId(): string {
    return this._userId;
  }
  
  signIn(): void {
    this._userIsAuthenticated = true;
  }

  signOut(): void {
    this._userIsAuthenticated = false;
  }
}
