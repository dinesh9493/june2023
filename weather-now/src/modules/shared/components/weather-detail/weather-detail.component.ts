import { Component, Input } from '@angular/core';

@Component({
  selector: 'wn-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss'],
})
export class WeatherDetailComponent {
  @Input() weartherDetails: any;
}
