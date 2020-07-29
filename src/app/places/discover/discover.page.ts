import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Place } from '../place.model';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  public loadedPlaces: Place[] = [];

  constructor(private _placesService: PlacesService) { }

  ngOnInit(): void {
    this.loadedPlaces = this._placesService.places;
  }

}
