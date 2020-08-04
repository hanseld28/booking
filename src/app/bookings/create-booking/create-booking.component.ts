import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../places/place.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;

  constructor(private _modalController: ModalController) { }

  ngOnInit() {}

  onCancel(): void {
    this._modalController.dismiss(null, 'cancel');
  }

  onBookPlace(): void {
    this._modalController.dismiss({message: 'This is a dummy message!'}, 'confirm')
  }
}
