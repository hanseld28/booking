import { Injectable } from '@angular/core';

import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places: Place[];


  constructor() { 
    this.seed();
  }

  private seed(): void {
    this._places = [
      new Place(
        1, 
        'Manhattan Mansion', 
        'In the heart of New York City.', 
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 
        159.99
      ),
      new Place(
        2, 
        'L\'Amour Toujuors', 
        'A romantic place in Paris.', 
        'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
        189.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
      new Place(
        1, 
        'Manhattan Mansion', 
        'In the heart of New York City.', 
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 
        159.99
      ),
      new Place(
        2, 
        'L\'Amour Toujuors', 
        'A romantic place in Paris.', 
        'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
        189.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
      new Place(
        1, 
        'Manhattan Mansion', 
        'In the heart of New York City.', 
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 
        159.99
      ),
      new Place(
        2, 
        'L\'Amour Toujuors', 
        'A romantic place in Paris.', 
        'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
        189.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
      new Place(
        1, 
        'Manhattan Mansion', 
        'In the heart of New York City.', 
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 
        159.99
      ),
      new Place(
        2, 
        'L\'Amour Toujuors', 
        'A romantic place in Paris.', 
        'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
        189.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
      new Place(
        1, 
        'Manhattan Mansion', 
        'In the heart of New York City.', 
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 
        159.99
      ),
      new Place(
        2, 
        'L\'Amour Toujuors', 
        'A romantic place in Paris.', 
        'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
        189.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
      new Place(
        1, 
        'Manhattan Mansion', 
        'In the heart of New York City.', 
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 
        159.99
      ),
      new Place(
        2, 
        'L\'Amour Toujuors', 
        'A romantic place in Paris.', 
        'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
        189.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
      new Place(
        1, 
        'Manhattan Mansion', 
        'In the heart of New York City.', 
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 
        159.99
      ),
      new Place(
        2, 
        'L\'Amour Toujuors', 
        'A romantic place in Paris.', 
        'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
        189.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
      new Place(
        1, 
        'Manhattan Mansion', 
        'In the heart of New York City.', 
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 
        159.99
      ),
      new Place(
        2, 
        'L\'Amour Toujuors', 
        'A romantic place in Paris.', 
        'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
        189.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
      new Place(
        1, 
        'Manhattan Mansion', 
        'In the heart of New York City.', 
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 
        159.99
      ),
      new Place(
        2, 
        'L\'Amour Toujuors', 
        'A romantic place in Paris.', 
        'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
        189.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
      new Place(
        1, 
        'Manhattan Mansion', 
        'In the heart of New York City.', 
        'https://imgs.6sqft.com/wp-content/uploads/2014/06/21042533/Carnegie-Mansion-nyc.jpg', 
        159.99
      ),
      new Place(
        2, 
        'L\'Amour Toujuors', 
        'A romantic place in Paris.', 
        'https://media-cdn.tripadvisor.com/media/photo-s/16/0b/96/09/hotel-amour.jpg',
        189.99
      ),
      new Place(
        3, 
        'The Foggy Palace', 
        'Not your average city trip.', 
        'https://sanfrancisco.cbslocal.com/wp-content/uploads/sites/15116056/2016/09/465194539.jpg',
        99.99
      ),
    ];
  }

  get places(): Place[] {
    return [...this._places];
  }

  getPlaceById(id: number): Place {
    return {
      ...this.places.find(
        function (place) {
          return place.id === id;
        }
      )
    };
  }
}
