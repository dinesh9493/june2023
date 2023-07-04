import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WnToastService {
  private _toastMessage$ = new Subject();

  public listenForToastMessages() {
    return this._toastMessage$.asObservable();
  }

  public showInfo(message: string) {
    this._toastMessage$.next({
      severity: 'info',
      title: 'Information',
      message: message,
    });
  }

  public showWarning(message: string) {
    this._toastMessage$.next({
      severity: 'warn',
      title: 'Warning',
      message: message,
    });
  }

  public showSuccess(message: string) {
    this._toastMessage$.next({
      severity: 'success',
      title: 'Success',
      message: message,
    });
  }

  public showError(message: string) {
    this._toastMessage$.next({
      severity: 'error',
      title: 'Error',
      message: message,
    });
  }
}
