import { Component } from '@angular/core';
// import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css'],
})
export class FlightFormComponent {
  isOneWaySelected = true;
  isRoundTripSelected = false;
  selectedOption = 'ida';

  constructor() {}

  selectOneWay() {
    this.isOneWaySelected = true;
    this.isRoundTripSelected = false;
  }

  selectRoundTrip() {
    this.isOneWaySelected = false;
    this.isRoundTripSelected = true;
  }

  changeOption(option: string) {
    this.selectedOption = option;
  }
}
