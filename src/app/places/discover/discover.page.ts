import { Component, OnInit, OnDestroy } from '@angular/core';

import { PlacesService } from '../places.service';

import { Place } from '../place.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  public loadedPlaces: Place[];
  public listLoadedPlaces: Place[];
  public relevantPlaces: Place[];
  private _placesSubscription: Subscription;
  private _filter: string;
  public isLoading: boolean;

  constructor(
    private _placesService: PlacesService,
    private _authService: AuthService
  ) { 
    this._filter = 'all';
  }

  ngOnInit(): void {
    this._placesSubscription = this._placesService.places
      .subscribe(places => {
        this.loadedPlaces = places;
        this.onFilterUpdate(this._filter);
      });
  }
  
  ionViewWillEnter() {
    this.isLoading = true;
    this._placesService
    .fetchPlaces()
    .subscribe(() => {
      this.isLoading = false;
    });
  }

  onFilterUpdate(filter: string): void {
    if (filter === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listLoadedPlaces = this.relevantPlaces.slice(1);   
    } else {
      this.relevantPlaces = this.loadedPlaces.filter(
        place => {
          return place.userId !== this._authService.userId
        }
      );
      this.listLoadedPlaces = this.relevantPlaces.slice(1);
    }
  }
  
  ngOnDestroy(): void {
    if (this._placesSubscription) {
      this._placesSubscription.unsubscribe();
    }
  }
}
