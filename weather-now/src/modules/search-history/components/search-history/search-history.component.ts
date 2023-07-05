import { Component, OnInit } from '@angular/core';
import { StateManagementService } from 'src/modules/shared/services/state-management.service';

@Component({
  selector: 'wn-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss'],
})
export class SearchHistoryComponent implements OnInit {
  public history: any = [];

  constructor(private _stateManagementService: StateManagementService) {}

  ngOnInit(): void {
    this.history = this._stateManagementService.getHistory();
  }
}
