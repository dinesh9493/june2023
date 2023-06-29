import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_LIST } from '../configs/api-urls.config';
import { API_KEY } from '../configs/api-keys.config';

@Injectable({
  providedIn: 'root',
})
export class SharedApiService {
  constructor(private _httpClient: HttpClient) {}

  public getWeatherDetails(cityName: string) {
    let url = `${URL_LIST.GET_WEATHER_BASED_ON_CITY}&q=${cityName}`;
    return this._httpClient.get(url);
  }
}
