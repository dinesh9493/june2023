import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WnSpinnerService {
  private _spinner$ = new Subject();

  constructor() {}

  public listenToSpinner() {
    return this._spinner$.asObservable();
  }

  public showSpinner() {
    this._spinner$.next(true);
  }

  public hideSpinner() {
    this._spinner$.next(false);
  }
}
