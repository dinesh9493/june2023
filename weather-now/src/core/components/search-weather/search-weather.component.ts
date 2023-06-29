import { Component } from '@angular/core';

import { SharedApiService } from 'src/modules/shared/services/shared-api.service';

@Component({
  selector: 'wn-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.scss'],
})
export class SearchWeatherComponent {
  public cityName: string = '';
  public weartherDetails: any;

  constructor(private _sharedApiService: SharedApiService) {}

  public getWeatherOfCityName() {
    this.weartherDetails = null;
    this._sharedApiService.getWeatherDetails(this.cityName).subscribe({
      next: (response: any) => {
        if (response) {
          this.weartherDetails = response;
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
