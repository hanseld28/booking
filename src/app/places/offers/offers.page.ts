import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  public placeOffers: Place[];

  constructor(
    private _placesService: PlacesService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.placeOffers = this._placesService.places;
  }

  onEdit(offerId: number, slidingItem: IonItemSliding): void {
    slidingItem.close();
    this._router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
    console.log(`Editing item with id ${offerId}`);
  }

}
