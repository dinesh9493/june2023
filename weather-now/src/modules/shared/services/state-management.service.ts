import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateManagementService {
  private _searchHistory: string = '[]';

  constructor() {}

  public getHistory() {
    let temp = JSON.parse(this._searchHistory);
    return temp;
  }

  public getLatestResult() {
    let temp = JSON.parse(this._searchHistory);
    if (temp.length) {
      return temp[temp.length - 1];
    }
  }

  public updateHistory(data: any) {
    let temp = JSON.parse(this._searchHistory);
    temp.push(data);
    let str = JSON.stringify(temp);
    this._searchHistory = str;
  }

  public setHistory(data: any) {
    let temp = JSON.stringify(data);
    this._searchHistory = temp;
  }
}
