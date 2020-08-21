import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  public place: Place;
  private _placeSubscription: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _navController: NavController,
    private _placesService: PlacesService
  ) { }

  ngOnInit(): void {
    this
    ._route.paramMap
    .subscribe(
      paramMap => this.findPlaceByIdWithParametersMap(paramMap)
    );
  }

  ngOnDestroy(): void {
    if (this._placeSubscription) {
      this._placeSubscription.unsubscribe();
    }
  }

  private findPlaceByIdWithParametersMap(paramMap: ParamMap) {
    if (this.placeIdNotExistsInParameters(paramMap)) {
      this._navController.navigateBack('/places/tabs/offers');
      return;
    }
    const placeIdFromParam = paramMap.get('placeId');
    this._placeSubscription = this._placesService
    .getPlaceById(placeIdFromParam)
    .subscribe(place => {
      this.place = place;
    });
  }

  private placeIdExistsInParameters(paramMap: ParamMap): boolean {
    return (paramMap.has('placeId'));
  }

  private placeIdNotExistsInParameters(paramMap: ParamMap): boolean {
    return !this.placeIdExistsInParameters(paramMap);
  }
}
