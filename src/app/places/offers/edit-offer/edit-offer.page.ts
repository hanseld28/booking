import { NavController, LoadingController, AlertController } from '@ionic/angular';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';
import { EditPlaceOffer } from './edit-place-offer.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
  public place: Place;
  public placeIdFromParamMap: string;
  public form: FormGroup;
  public isLoading: boolean;
  private _editOfferPlaceSubscription: Subscription;


  constructor(
    private _route: ActivatedRoute,
    private _navController: NavController,
    private _placesService: PlacesService,
    private _router: Router,
    private _loadingController: LoadingController,
    private _alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.subscribeToParamMap();
  }

  ngOnDestroy(): void {
    if (this._editOfferPlaceSubscription) {
      this._editOfferPlaceSubscription.unsubscribe();
    }
  }

  onUpdateOffer(): void {
    if (!this.form.valid) {
      return;
    }
    
    const { title, description, price } = this.form.value;
    const editPlaceOffer = new EditPlaceOffer(
      this.place.id,
      title,
      description,
      price
    );

    this._loadingController.create({
      message: 'Updating place...'
    }).then(loadingElement => {
      loadingElement.present();

      this._placesService
      .updatePlace(editPlaceOffer)
      .subscribe(
        (function() {
          loadingElement.dismiss();
          this.form.reset();
          this._router.navigate(['/places/tabs/offers']);
        }).bind(this)
      );
    });
  } 

  private subscribeToParamMap(): void {
    this._route.paramMap
      .subscribe(
        paramMap => {
          this.findPlaceByIdWithParametersMap(paramMap)
        }
      );
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.place.title, {
        updateOn: 'blur',
        validators: [
          Validators.required
        ]
      }),
      description: new FormControl(this.place.description, {
        updateOn: "blur",
        validators: [
          Validators.required, 
          Validators.maxLength(180)
        ]
      }),
      price: new FormControl(this.place.price, {
        updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.min(1)
        ]
      })
    });
  }

  private findPlaceByIdWithParametersMap(paramMap: ParamMap) {
    if (this.placeIdNotExistsInParameters(paramMap)) {
      this._navController.navigateBack('/places/tabs/offers');
      return;
    }
    this.placeIdFromParamMap = this.recoveryPlaceIdInParametersMap(paramMap);
    
    this._editOfferPlaceSubscription = this._placesService
      .getPlaceById(this.placeIdFromParamMap)
      .subscribe(
        place => {
          this.place = place;
          this.initializeForm();
          this.isLoading = false;
        },
        _error => {
          this._alertController.create({
            header: 'An error occured!',
            message: 'Place could not be fetched. Please try again later.',
            buttons: [{
              text: 'Okay',
              handler: () => {
                this._router.navigate(['/places/tabs/offers'])
              }
            }]
          })
          .then(alertElement => {
            alertElement.present();
          })
        } 
      );
  }
  
  private recoveryPlaceIdInParametersMap(paramMap: ParamMap): string {
    return paramMap.get('placeId');
  }

  private placeIdExistsInParameters(paramMap: ParamMap): boolean {
    return (paramMap.has('placeId'));
  }

  private placeIdNotExistsInParameters(paramMap: ParamMap): boolean {
    return !this.placeIdExistsInParameters(paramMap);
  }

}
