import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { URL_LIST } from '../configs/api-urls.config';

@Injectable({
  providedIn: 'root',
})
export class SharedApiService {
  constructor(private _httpClient: HttpClient) {}

  public getWeatherDetails(cityName: string) {
    let url = `${URL_LIST.GET_WEATHER_BASED_ON_CITY}&q=${cityName}`;
    return this._httpClient.get(url);
  }

  public getHistoryFromCloud() {
    return this._httpClient.get(URL_LIST.JSON_SERVER_URL_FOR_SEARCH_HISTORY);
  }

  public syncHistoryWithCloud(payload: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._httpClient.put(
      URL_LIST.JSON_SERVER_URL_FOR_SEARCH_HISTORY,
      payload,
      { headers }
    );
  }

  public saveSignUpDetailsWithCloud(payload: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._httpClient.put(URL_LIST.JSON_SERVER_URL_FOR_SIGN_UP, payload, {
      headers,
    });
  }
}
