import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AsyncService } from 'src/modules/shared/services/async.service';

import { SharedApiService } from 'src/modules/shared/services/shared-api.service';
import { StateManagementService } from 'src/modules/shared/services/state-management.service';

@Component({
  selector: 'wn-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.scss'],
})
export class SearchWeatherComponent implements OnInit, OnDestroy {
  public weartherDetails: any;

  private _subscription = new Subscription();

  constructor(
    private _stateManagementService: StateManagementService,
    private _asyncService: AsyncService
  ) {}

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.weartherDetails = this._stateManagementService.getLatestResult();
    this._subscribeToEvents();
  }

  private _subscribeToEvents() {
    this._subscription.add(
      this._asyncService.listenToWeatherUpdates().subscribe({
        next: (response) => {
          this.weartherDetails = this._stateManagementService.getLatestResult();
        },
      })
    );
  }
}
