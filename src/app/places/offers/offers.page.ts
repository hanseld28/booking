import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  public placeOffers: Place[];
  private _placeOffersSubscription: Subscription;
  public isLoading: boolean;

  constructor(
    private _placesService: PlacesService,
    private _router: Router
  ) { 
    this.isLoading = true;
  }
  
  ngOnInit(): void {
    this._placeOffersSubscription = this._placesService.places.subscribe(places => {
      this.placeOffers = places;
    });
  }

  ionViewWillEnter() {
    this._placesService
    .fetchPlaces()
    .subscribe(
      () => this.isLoading = false
    );
  }

  onEdit(offerId: string, slidingItem: IonItemSliding): void {
    slidingItem.close();
    this._router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }

  ngOnDestroy(): void {
    if (this._placeOffersSubscription) {
      this._placeOffersSubscription.unsubscribe();
    }
  }
}
