import { Component } from '@angular/core';

@Component({
  selector: 'wn-weather-footer',
  templateUrl: './weather-footer.component.html',
  styleUrls: ['./weather-footer.component.scss'],
})
export class WeatherFooterComponent {
  public year = new Date().getFullYear();
}
