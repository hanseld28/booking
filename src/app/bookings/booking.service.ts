import { Injectable } from '@angular/core';

import { Booking } from './booking.model';

@Injectable({ providedIn: 'root'})
export class BookingService {
    private _bookings: Booking[];

    constructor() {
        this.seed();
    }

    private seed(): void {
        this._bookings = [
          new Booking(
            '1', 
            '1',
            '1',
            'Manhattan Mansion', 
            2
          ),
          new Booking(
            '2', 
            '2',
            '1',
            'L\'Amour Toujuors',  
            3
          ),
          new Booking(
            '3', 
            '3',
            '1',
            'The Foggy Palace', 
            4
          ),
        ];
      }
    
    get bookings(): Booking[] {
        return [...this._bookings];
    }
}