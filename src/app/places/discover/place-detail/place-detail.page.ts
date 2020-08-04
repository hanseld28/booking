import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { 
  NavController, 
  ModalController, 
  ActionSheetController 
} from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  public place: Place;
  
  constructor(
    private _navController: NavController,
    private _route: ActivatedRoute,
    private _placesService: PlacesService,
    private _modalController: ModalController,
    private _actionSheetController: ActionSheetController
  ) { }

  ngOnInit(): void {
    this
    ._route.paramMap
    .subscribe(paramMap => {
        this.findPlaceByIdWithParametersMap(paramMap);
    });
  }

  onBookPlace(): void {
    this._actionSheetController.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModal("random");
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    })
    .then(actionSheetElement => {
      actionSheetElement.present();
    });
  }

  private openBookingModal(mode: 'select' | 'random'): void {
    console.log(mode);

    this._modalController
    .create({ 
      component: CreateBookingComponent,
      componentProps: {
        selectedPlace: this.place
      } 
    })
    .then(modalElement => {
      modalElement.present();
      return modalElement.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData.data, resultData.role);

      if (resultData.role === 'confirm') {
        console.log("BOOKED!");
      }
    });
  }

  private findPlaceByIdWithParametersMap(paramMap: ParamMap): void {
    if (this.placeIdNotExistsInParameters(paramMap)) {
      this._navController.navigateBack('/places/tabs/discover');
      return;
    }
    const placeIdFromParam = parseInt(paramMap.get('placeId'));
    this.place = this._placesService.getPlaceById(placeIdFromParam);
  }
  
  private placeIdExistsInParameters(paramMap: ParamMap): boolean {
    return (paramMap.has('placeId'));
  }

  private placeIdNotExistsInParameters(paramMap: ParamMap): boolean {
    return !this.placeIdExistsInParameters(paramMap);
  }
}
