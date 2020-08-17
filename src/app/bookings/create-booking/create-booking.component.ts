import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Place } from '../../places/place.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('form', { static: true }) form: NgForm;
  startDate: string;
  endDate: string;

  constructor(private _modalController: ModalController) { }

  ngOnInit() {
    if (this.selectedMode === 'random') {
      this.generateRandomStartDate();
      this.generateRandomEndDateBasedOnStartDate(this.startDate);
    }
  }
  
  onAvailableDateFromChange(startDateChanged: string) : void {
    if (this.selectedMode === 'random') {
      this.generateRandomEndDateBasedOnStartDate(startDateChanged);
    }
  }

  onCancel(): void {
    this._modalController.dismiss(null, 'cancel');
  }

  onBookPlace(): void {
    if (!this.form.valid || !this.datesValid()) {
      return;
    }


    this._modalController
      .dismiss({ 
        bookingData: this.extractFormValues()
    }, 'confirm')
  }

  private generateRandomStartDate(): void {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);

    this.startDate = 
      this.generateRandomStringDateBasedOnDateInterval(
        availableFrom, 
        availableTo, 
        'minus'
      );
  }

  private generateRandomEndDateBasedOnStartDate(dateBasedString: string): void {
    const dateParameterToGenerateEndDate = new Date(dateBasedString); 
    this.endDate = 
      this.generateRandomStringDateBasedOnDateInterval(
        dateParameterToGenerateEndDate, 
        dateParameterToGenerateEndDate, 
        'plus'
      );
  }

  private generateRandomStringDateBasedOnDateInterval(
      basedStartDate: Date, 
      basedEndDate  : Date, 
      coreOperation : 'plus' | 'minus'
    ): string {
      
    return (
      new Date(
        basedStartDate.getTime() 
        + Math.random()
        * (
            basedEndDate.getTime() 
            + (
                (coreOperation === 'minus') ? 7 * (- 1) : 6
              ) * (24 * 60 * 60 * 1000)
            - basedStartDate.getTime()
          )
      ).toISOString()
    );
  }

  datesValid(): boolean {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);

    return endDate > startDate;
  }

  private extractFormValues(): any {
    return {
      firstName: this.form.value['first-name'],
      lastName: this.form.value['last-name'],
      guestNumber: this.form.value['guest-number'],
      startDate: this.form.value['date-from'],
      endDate: this.form.value['date-to'] 
    };
  }
}  