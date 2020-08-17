import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import { BookingService } from './booking.service';
import { Booking } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

  loadedBookings: Booking[];

  constructor(
    private _bookingService: BookingService
  ) { }

  ngOnInit() {
    this.loadedBookings = this._bookingService.bookings;
  }

  onCancelBooking(offerId: string, slidingElement: IonItemSliding): void {
    slidingElement.close();
    // cancel booking with offerId
  }

}
