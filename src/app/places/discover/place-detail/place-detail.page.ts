import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  public place: Place;
  
  constructor(
    private _navController: NavController,
    private _route: ActivatedRoute,
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

  onBookPlace(): void {
    this._navController.navigateBack('/places/tabs/discover');
  }

  private findPlaceByIdWithParametersMap(paramMap: ParamMap) {
    if (this.placeIdNotExistsInParameters(paramMap)) {
      this._navController.navigateBack('/places/tabs/discover');
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
