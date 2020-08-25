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
  public loadedBookings: Booking[];
  public isLoading: boolean;
  private _bookingSubscription: Subscription;

  constructor(
    private _bookingService: BookingService,
    private _loadingController: LoadingController
  ) { }

  ngOnInit() {
    this._bookingSubscription = this._bookingService.bookings
      .subscribe(bookings => {
        this.loadedBookings = bookings;
      });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this._bookingService.fetchBookings()
      .subscribe(() => {
        this.isLoading = false;
      });
  }

  onCancelBooking(bookingId: string, slidingElement: IonItemSliding): void {
    slidingElement.close();
    
    this._loadingController
    .create({
      message: 'Cancelling...'
    })
    .then(loadingElement => {
        loadingElement.present();
        
        this._bookingSubscription = this._bookingService.cancelBooking(bookingId)
          .subscribe(() => {
            loadingElement.dismiss();
          });
      });
  }

  ngOnDestroy() {
    if (this._bookingSubscription) {
      this._bookingSubscription.unsubscribe();
    }
  }
}
