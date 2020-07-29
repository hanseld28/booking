import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
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
      paramMap => {
        console.log(paramMap);
        this.findPlaceByIdWithParametersMap(paramMap)
      }
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
