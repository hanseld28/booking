import { Injectable } from '@angular/core';

import { Booking } from './booking.model';

import { AuthService } from '../auth/auth.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { delay, tap, take, switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { apiUrlBuilder } from 'src/util/api-url-builder';
import { FirebaseEntityFileName } from 'src/util/firebase-entity-file-name';
import { findLast } from '@angular/compiler/src/directive_resolver';

interface BookingDTO {
  firstName: string;
  lastName: string;
  placeId: string;
  placeImage: string;
  placeTitle: string;
  guestNumber: number;
  bookedFrom: string; 
  bookedTo: string;
  userId: string;
}

interface FirebaseList<T> {
  [key: string]: T
}

@Injectable({ providedIn: 'root'})
export class BookingService {
  private _bookings: BehaviorSubject<Booking[]>; 
  private BOOKING_BASE_URL: string; 

  constructor(
    private _authService: AuthService,
    private _httpClient: HttpClient
  ) {
    this._bookings = new BehaviorSubject<Booking[]>([]);
    this.BOOKING_BASE_URL = apiUrlBuilder({
      buildedUrl: FirebaseEntityFileName.BOOKINGS,
      endWithJson: false
    })
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
    let generatedId: string;
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

    const firebaseEndpointToSaveBooking = apiUrlBuilder({
      buildedUrl: this.BOOKING_BASE_URL,
      endWithJson: true
    }); 

    return this._httpClient
      .post<{ name: string }>(
        firebaseEndpointToSaveBooking, 
        { 
          ...newBooking, 
          id: null
        }
      )
      .pipe(
        switchMap(responseData => {
          generatedId = responseData.name;
          return this.bookings;
        }), 
        take(1),
        tap(bookings => {
          newBooking.id = generatedId;
          this._bookings.next(bookings.concat(newBooking));          
        }));
  }

  fetchBookings(): Observable<Booking[]> {
    let loggedUserId = this._authService.userId;
    const firebaseEndpointToFetchBookings = apiUrlBuilder({
      buildedUrl: this.BOOKING_BASE_URL,
      endWithJson: true,  
      params: [
        'orderBy="userId"', 
        `equalTo="${loggedUserId}"`
      ], 
      hasQueryParams: true
    }); 

    return this._httpClient
      .get<FirebaseList<BookingDTO>>(firebaseEndpointToFetchBookings)
      .pipe(
        map(bookingResponseData => {
          const bookings: Booking[] = [];
          for (const key in bookingResponseData) {
            if (bookingResponseData.hasOwnProperty(key)) {
              const {  
                firstName,
                lastName,
                placeId,
                placeImage,
                placeTitle,
                guestNumber,
                bookedFrom, 
                bookedTo,
                userId
              } = bookingResponseData[key]; 
              
              bookings.push(
                new Booking(
                  key,
                  placeId,
                  userId,
                  placeTitle,
                  placeImage,
                  firstName,
                  lastName,
                  guestNumber,
                  new Date(bookedFrom),
                  new Date(bookedTo)
                )
              )
            }
          }
          return bookings;
        }),
        tap(bookings => {
          this._bookings.next(bookings);
        })
      );
  }

  cancelBooking(bookingIdToBeCancelled: string): Observable<Booking[]> {
    const firebaseEndpointToDeleteBooking = apiUrlBuilder({
      buildedUrl: this.BOOKING_BASE_URL,
      endWithJson: true,
      params: [bookingIdToBeCancelled]
    }); 

    return this._httpClient
      .delete(firebaseEndpointToDeleteBooking)
      .pipe(
        switchMap(() => {
          return this.fetchBookings();
        }),
        take(1),
        tap(bookings => {
          this._bookings.next(bookings);
        })
      );
  }
}