import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AsyncService {
  private _weatherUpdate$ = new Subject();

  constructor() {}

  public listenToWeatherUpdates() {
    return this._weatherUpdate$.asObservable();
  }

  public triggerWeatherUpdates() {
    this._weatherUpdate$.next(null);
  }
}
