import { NavController } from '@ionic/angular';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  public place: Place;
  public form: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _navController: NavController,
    private _placesService: PlacesService
  ) { }

  ngOnInit(): void {
    this.subscribeToParamMap();
    this.initializeForm();
  }

  onUpdateOffer(): void {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form);
  } 

  private subscribeToParamMap(): void {
    this._route.paramMap
      .subscribe(
        paramMap => {
          console.log(paramMap);
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
    const placeIdFromParam = paramMap.get('placeId');
    this.place = this._placesService.getPlaceById(placeIdFromParam);
  }
  
  private placeIdExistsInParameters(paramMap: ParamMap): boolean {
    return (paramMap.has('placeId'));
  }

  private placeIdNotExistsInParameters(paramMap: ParamMap): boolean {
    return !this.placeIdExistsInParameters(paramMap);
  }

}
