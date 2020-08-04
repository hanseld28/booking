import { Component, OnInit } from '@angular/core';

import { SegmentChangeEventDetail } from '@ionic/core';

import { PlacesService } from '../places.service';

import { Place } from '../place.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  public loadedPlaces: Place[];
  public listLoadedPlaces: Place[];

  constructor(private _placesService: PlacesService) { }

  ngOnInit(): void {
    this.loadedPlaces = this._placesService.places;
    this.listLoadedPlaces = this.loadedPlaces.slice(1);
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>): void {
    console.log(event.detail);
  }

}
