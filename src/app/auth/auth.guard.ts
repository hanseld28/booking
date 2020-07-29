import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  canLoad(
    route: Route, 
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    
    const userIsAuthenticated = this._authService.userIsAuthenticated;
    
    if (!userIsAuthenticated) {
      this._router.navigateByUrl('/auth');
    }

    return userIsAuthenticated;
  }
  
  
}
