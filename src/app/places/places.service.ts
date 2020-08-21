import { Injectable } from '@angular/core';

import { Place } from './place.model';
import { NewPlaceOffer } from './offers/new-offer/new-place-offer.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map, filter, tap, delay } from 'rxjs/operators';
import { EditPlaceOffer } from './offers/edit-offer/edit-place-offer.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: BehaviorSubject<Place[]>;

  constructor(
    private _authService: AuthService
  ) { 
    this.seed();
  }

  get places(): Observable<Place[]> {
    return this._places.asObservable();
  }

  getPlaceById(id: string): Observable<Place>{
    return this._places.pipe(
      take(1),
      map(places => {
        return { 
          ...places
          .find(
            function(place: Place) { 
              return place.id === id; 
            }
          ) 
        }
      })
    );  
  }

  addPlace(newPlaceOffer: NewPlaceOffer): Observable<Place[]> {
    const { title, description, price, availableFrom, availableTo } = newPlaceOffer;
    const placeId = Math.round(Math.random() * 501).toString();
    const imageUrl = 'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg';
    const userId = this._authService.userId;

    const newPlace = new Place(
      placeId,
      title,
      description,
      imageUrl,
      price,
      availableFrom,
      availableTo,
      userId
    );

    return this._places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace({ id, title, description, price }: EditPlaceOffer): Observable<Place[]> {
    return this._places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(existingPlace => {
          return existingPlace.id === id;
        });
        const updatedPlaces = [...places];
        const { 
          imageUrl, 
          availableFrom, 
          availableTo, 
          userId
        } = updatedPlaces[updatedPlaceIndex];
        
        updatedPlaces[updatedPlaceIndex] = new Place(
          id,
          title,
          description,
          imageUrl,
          price,
          availableFrom,
          availableTo,
          userId
        );
        
        this._places.next(updatedPlaces);
      })
    );
  }

  private seed(): void {
    this._places = new BehaviorSubject(
      [
        new Place(
          '1', 
          'Manhattan Mansion', 
          'In the heart of New York City.', 
          'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 
          159.99,
          new Date('2020-08-13'),
          new Date('2020-12-31'),
          'sj29dhsk91ks323'
        ),
        new Place(
          '2', 
          'L\'Amour Toujuors', 
          'A romantic place in Paris.', 
          'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
          189.99,
          new Date('2020-08-13'),
          new Date('2020-12-31'),
          'sj29dhsk91ks1422'
        ),
        new Place(
          '3', 
          'The Foggy Palace', 
          'Not your average city trip.', 
          'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
          99.99,
          new Date('2020-08-13'),
          new Date('2020-12-31'),
          'sj29dhs328s'
        ),
        new Place(
          '4', 
          'Manhattan Mansion', 
          'In the heart of New York City.', 
          'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 
          159.99,
          new Date('2020-08-13'),
          new Date('2020-12-31'),
          'sj29dhsk91ks'
        ),
        new Place(
          '5', 
          'L\'Amour Toujuors', 
          'A romantic place in Paris.', 
          'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
          189.99,
          new Date('2020-08-13'),
          new Date('2020-12-31'),
          'sj29dhsk91ks'
        ),
        new Place(
          '6', 
          'The Foggy Palace', 
          'Not your average city trip.', 
          'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
          99.99,
          new Date('2020-08-13'),
          new Date('2020-12-31'),
          'sj29dhsk91ks'
        ),
        new Place(
          '7', 
          'Manhattan Mansion', 
          'In the heart of New York City.', 
          'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 
          159.99,
          new Date('2020-08-13'),
          new Date('2020-12-31'),
          'sj29dhsk91ksaklsjsla'
        ),
        new Place(
          '8', 
          'L\'Amour Toujuors (TEST)', 
          'A romantic place in Paris.', 
          'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
          189.99,
          new Date('2020-08-13'),
          new Date('2020-12-31'),
          'sj29dhsk91ks'
        )
      ]
    );
  }
}