import { Component, OnInit } from '@angular/core';

import { LoadingController } from '@ionic/angular';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  private _isSignIn: boolean = true;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _loadingController: LoadingController
  ) { }

  ngOnInit() { }

  private onSignIn(): void {
    this._authService.signIn();

    this._loadingController
    .create({
      keyboardClose: true,
      message: this.getMessageLoadingByContext()
    })
    .then(loadingElement => {
      loadingElement.present();
      
      setTimeout(
        (function() {
          loadingElement.dismiss();
          this._router.navigateByUrl('/places/tabs/discover');          
        }).bind(this)
        , 1000);
    });
  }

  get isSignIn(): boolean {
    return this._isSignIn;
  }

  private getMessageLoadingByContext(): string {
    return this.isSignIn ? 'Signing in...' : 'Signing up...' ;
  }

  onSwitchAuthMode(): void {
    this._isSignIn = !this.isSignIn;
  }

  onSubmit(authForm: NgForm): void {
    if (!authForm.valid) {
      return;
    }

    const { email, password} = authForm.value;
    console.log(email, password);

    if (this.isSignIn) {
      // TODO: Sent a request to API endpoint to sign in 
    } else {
      // TODO: Sent a request to API endpoint to sign up 
    }

    this.onSignIn();
  }
}