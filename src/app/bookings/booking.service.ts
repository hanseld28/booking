import { Injectable } from '@angular/core';

import { Booking } from './booking.model';
import { NewBooking } from './new-booking.model';

import { AuthService } from '../auth/auth.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { delay, tap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class BookingService {
  private _bookings: BehaviorSubject<Booking[]>; 

  constructor(
    private _authService: AuthService
  ) {
    this._bookings = new BehaviorSubject<Booking[]>([]);
  }
  
  get bookings(): Observable<Booking[]> {
      return this._bookings.asObservable();
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImage: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    bookedFrom: Date,
    bookedTo: Date 
  ): Observable<Booking[]> {

    const bookingId = Math.round(Math.random() * 501).toString(); 
    const userId = this._authService.userId; 
    const newBooking = new Booking(
      bookingId, 
      placeId, 
      userId, 
      placeTitle, 
      placeImage, 
      firstName, 
      lastName, 
      guestNumber, 
      bookedFrom, 
      bookedTo
    );

    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap(bookings => {
        this._bookings.next(bookings.concat(newBooking));
      })
    );
  }

  cancelBooking(bookingIdToBeCancelled: string): Observable<Booking[]> {
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap(bookings => {
        this._bookings
        .next(
          bookings
          .filter(
            function(existingBooking: Booking) { 
              existingBooking.id !== bookingIdToBeCancelled 
            }
          )
        )
      })
    );
  }
}