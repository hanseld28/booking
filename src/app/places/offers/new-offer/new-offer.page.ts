import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';
import { NewPlaceOffer } from './new-place-offer.model';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  public form: FormGroup;

  constructor(
    private _placesService: PlacesService,
    private _router: Router,
    private _loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.initializeFormValidation();
  }

  onCreateOffer(): void {
    if (!this.form.valid) {
      return;
    }

    this._loadingController.create({
      message: 'Creating place...'
    }).then(loadingELement => {
      loadingELement.present();  
      const newPlaceOffer = this.extractNewPlaceOfferFoomFormValues(); 
      this._placesService
      .addPlace(newPlaceOffer)
      .subscribe(
        (function() {
          this._loadingController.dismiss();
          this.form.reset();
          this._router.navigate(['/places/tabs/offers']);
        }).bind(this)
      );
    });
  }

  private initializeFormValidation(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [
          Validators.required, 
          Validators.maxLength(180)
        ]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.min(1)
        ]
      }),
      availableFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      availableTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  private extractNewPlaceOfferFoomFormValues(): NewPlaceOffer {
    const { title, description, price, availableFrom, availableTo } = this.form.value; 

    return new NewPlaceOffer(
      title,
      description,
      +price,
      availableFrom,
      availableTo
    );
  }

}
