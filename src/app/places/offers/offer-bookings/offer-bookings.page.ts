import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  public place: Place;

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

  private findPlaceByIdWithParametersMap(paramMap: ParamMap) {
    if (this.placeIdNotExistsInParameters(paramMap)) {
      this._navController.navigateBack('/places/tabs/offers');
      return;
    }
    const placeIdFromParam = parseInt(paramMap.get('placeId'));
    this.place = this._placesService.getPlaceById(placeIdFromParam);
  }

  private placeIdExistsInParameters(paramMap: ParamMap): boolean {
    return (paramMap.has('placeId'));
  }

  private placeIdNotExistsInParameters(paramMap: ParamMap): boolean {
    return !this.placeIdExistsInParameters(paramMap);
  }
}
