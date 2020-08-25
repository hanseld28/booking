import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { take, map, tap, switchMap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

import { Place } from './place.model';
import { NewPlaceOffer } from './offers/new-offer/new-place-offer.model';
import { EditPlaceOffer } from './offers/edit-offer/edit-place-offer.model';
import { apiUrlBuilder } from '../../util/api-url-builder';
import { FirebaseEntityFileName } from '../../util/firebase-entity-file-name';

interface PlaceDTO {
  title: string,
  description: string,
  price: number,​
  imageUrl: string,​
  userId: string
  availableFrom: string,
  availableTo: string,
}

interface FirebaseList<T> {
  [key: string]: T
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: BehaviorSubject<Place[]>;
  private OFFERED_PLACES_BASE_URL: string; 

  constructor(
    private _authService: AuthService,
    private _httpClient: HttpClient
  ) { 
    this._places = new BehaviorSubject<Place[]>([]);
    this.OFFERED_PLACES_BASE_URL = apiUrlBuilder({
      buildedUrl: FirebaseEntityFileName.OFFERED_PLACES, 
      endWithJson: false
    });
  }

  get places(): Observable<Place[]> {
    return this._places.asObservable();
  }

  fetchPlaces(): Observable<Place[]> {
    return this._httpClient
      .get<FirebaseList<PlaceDTO>>(
        apiUrlBuilder({
          buildedUrl: this.OFFERED_PLACES_BASE_URL, 
          endWithJson: true
        })
      )
      .pipe(
        map(responseData => {
          const places = [];
          
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const { 
                title, 
                description, 
                price, 
                imageUrl, 
                userId,
                availableFrom, 
                availableTo 
              } = responseData[key];
              
              places.push(
                new Place(
                  key, 
                  title, 
                  description, 
                  imageUrl, 
                  price, 
                  new Date(availableFrom), 
                  new Date(availableTo), 
                  userId
                )
              );
            }
          }
          return places;
        }),
        tap(places => {
          this._places.next(places);
        })
      );
  }

  getPlaceById(id: string): Observable<Place>{
    return this._httpClient
      .get<PlaceDTO>(
        apiUrlBuilder({
          buildedUrl: this.OFFERED_PLACES_BASE_URL, 
          endWithJson: true,
          params: [id]
        })
      )
      .pipe(
        map(({ title, description, imageUrl, price, availableFrom, availableTo, userId }: PlaceDTO) => {
          return new Place(
            id, 
            title, 
            description, 
            imageUrl, 
            price, 
            new Date(availableFrom), 
            new Date(availableTo), 
            userId
          );
        })
      )
  }

  addPlace(newPlaceOffer: NewPlaceOffer): Observable<any> {
    const { 
      title, 
      description, 
      price, 
      availableFrom, 
      availableTo 
    } = newPlaceOffer;

    const placeId = null;
    const imageUrl = 'https://1001freedownloads.s3.amazonaws.com/vector/thumb/75285/location_icon.png';
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

    let generatedId: string;

    return this._httpClient
      .post<{ name: string }>(
        apiUrlBuilder({
          buildedUrl: this.OFFERED_PLACES_BASE_URL, 
          endWithJson: true
        }), 
        { 
          ...newPlace, 
          id: null 
        }
      )
      .pipe(
        switchMap(({ name }) => {
          generatedId = name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
        })
      );
  }

  updatePlace({ 
    id, 
    title, 
    description, 
    price 
  }: EditPlaceOffer): Observable<Place[]>{
    let updatedPlaces: Place[];

    return this._places.pipe(
      take(1),
      switchMap(places => {
        return (!places || places.length <= 0) 
          ? this.fetchPlaces() 
          : of(places);
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(existingPlace => {
          return existingPlace.id === id;
        });
        updatedPlaces = [...places];
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
        const updatedPlace = updatedPlaces[updatedPlaceIndex];

        return this._httpClient.put<Place[]>(
          apiUrlBuilder({
            buildedUrl: this.OFFERED_PLACES_BASE_URL, 
            endWithJson: true,
            params: [updatedPlace.id]
          }),
          { ...updatedPlace, id: null }
        )
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}