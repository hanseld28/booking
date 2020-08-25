import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { 
  NavController, 
  ModalController, 
  ActionSheetController, 
  LoadingController,
  AlertController
} from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/bookings/booking.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  public place: Place;
  public isBookable: boolean;
  public isLoading: boolean;
  private _placeSubscription: Subscription;

  constructor(
    private _placesService: PlacesService,
    private _bookingService: BookingService,
    private _authService: AuthService,
    private _navController: NavController,
    private _route: ActivatedRoute,
    private _router: Router,
    private _modalController: ModalController,
    private _actionSheetController: ActionSheetController,
    private _loadingController: LoadingController,
    private _alertController: AlertController
  ) { }

  ngOnInit(): void {
    this._route.paramMap
    .subscribe(paramMap => {
      this.findAndFillPlaceByIdWithParametersMap(paramMap);
    });
  }

  ngOnDestroy(): void {
    if (this._placeSubscription) {
      this._placeSubscription.unsubscribe();
    }
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
            this.openBookingModal('random');
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
    this._modalController
    .create({ 
      component: CreateBookingComponent,
      componentProps: {
        selectedPlace: this.place,
        selectedMode: mode
      } 
    })
    .then(modalElement => {
      modalElement.present();
      return modalElement.onDidDismiss();
    })
    .then(resultData => {
      if (resultData.role === 'confirm') {
        this._loadingController
        .create({ 
          message: 'Booking place...' 
        })
        .then(loadingElement => {
          loadingElement.present();
          const { 
            firstName, 
            lastName, 
            guestNumber, 
            startDate, 
            endDate 
          } = resultData.data.bookingData;
  
          this._bookingService
          .addBooking(
            this.place.id,
            this.place.title,
            this.place.imageUrl,
            firstName,
            lastName,
            guestNumber,
            startDate,
            endDate
          )
          .subscribe(() => {
            loadingElement.dismiss();
          });
        });
      }
    });
  }

  private findAndFillPlaceByIdWithParametersMap(paramMap: ParamMap): void {
    if (this.placeIdNotExistsInParameters(paramMap)) {
      this._navController.navigateBack('/places/tabs/discover');
      return;
    }
    this.isLoading = true;

    const placeIdFromParam = paramMap.get('placeId');
    
    this._placeSubscription = this._placesService
    .getPlaceById(placeIdFromParam)
    .subscribe(
      place => {
        this.place = place;
        this.isBookable = place.userId !== this._authService.userId;
        this.isLoading = false;
      },
      _error => {
        this._alertController.create({
          header: 'An error occured!',
          message: 'Could not load place.',
          buttons: [{
            text: 'Okay',
            handler: () => {
              this._router.navigate(['/places/tabs/discover']);
            }
          }]
        })
        .then(alertElement => {
          alertElement.present();
        })
      }
    );
  }
  
  private placeIdExistsInParameters(paramMap: ParamMap): boolean {
    return (paramMap.has('placeId'));
  }

  private placeIdNotExistsInParameters(paramMap: ParamMap): boolean {
    return !this.placeIdExistsInParameters(paramMap);
  }
}
