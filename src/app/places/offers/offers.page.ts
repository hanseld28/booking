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

  constructor(
    private _placesService: PlacesService,
    private _router: Router
  ) { }
  
  ngOnInit(): void {
    this._placeOffersSubscription = this._placesService.places.subscribe(places => {
      this.placeOffers = places;
    });
  }

  ngOnDestroy(): void {
    if (this._placeOffersSubscription) {
      this._placeOffersSubscription.unsubscribe();
    }
  }

  onEdit(offerId: string, slidingItem: IonItemSliding): void {
    slidingItem.close();
    this._router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
  }

}
