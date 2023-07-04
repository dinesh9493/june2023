import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateManagementService {
  private _searchHistory: Array<any> = [];

  constructor() {}

  public getHistory() {
    return this._searchHistory;
  }

  public getLatestResult() {
    if (this._searchHistory.length) {
      return this._searchHistory[this._searchHistory.length - 1];
    }
  }

  public setHistory(data: any) {
    this._searchHistory.push(data);
  }
}
