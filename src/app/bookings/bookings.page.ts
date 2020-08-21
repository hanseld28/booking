import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';

import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {

  loadedBookings: Booking[];
  private _bookingSubscription: Subscription;

  constructor(
    private _bookingService: BookingService,
    private _loadingController: LoadingController
  ) { }

  ngOnInit() {
    this._bookingSubscription = this._bookingService.bookings.subscribe(
      bookings => {
        this.loadedBookings = bookings;
      }
    );
  }

  ngOnDestroy() {
    if (this._bookingSubscription) {
      this._bookingSubscription.unsubscribe();
    }
  }

  onCancelBooking(bookingId: string, slidingElement: IonItemSliding): void {
    slidingElement.close();
    
    this._loadingController
    .create({
      message: 'Cancelling...'
    })
    .then(
      (function (loadingElement: HTMLIonLoadingElement) {
        loadingElement.present();
        
        this._bookingSubscription = this._bookingService
        .cancelBooking(bookingId)
        .subscribe(
          function() {
            loadingElement.dismiss();
          }
        );
      }).bind(this)
    )
  }

}
