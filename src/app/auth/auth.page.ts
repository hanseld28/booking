import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _loadingController: LoadingController
  ) { }

  ngOnInit() { }

  onSignIn(): void {
    this._authService.signIn();

    this._loadingController
    .create({
      keyboardClose: true,
      message: 'Signing in...'
    })
    .then(loadingElement => {
      loadingElement.present();
      
      setTimeout(() => {
        loadingElement.dismiss();
        this._router.navigateByUrl('/places/tabs/discover');          
      }, 1000);
    });
  }
}