import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WnSpinnerService } from 'src/core/services/wn-spinner.service';
import { WnToastService } from 'src/core/services/wn-toast.service';
import { AsyncService } from 'src/modules/shared/services/async.service';

import { SharedApiService } from 'src/modules/shared/services/shared-api.service';
import { StateManagementService } from 'src/modules/shared/services/state-management.service';

@Component({
  selector: 'wn-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.scss'],
})
export class SearchWeatherComponent implements OnInit, OnDestroy {
  public data: any;
  public isRefreshNeeded: boolean = false;

  private _subscription = new Subscription();

  constructor(
    private _stateManagementService: StateManagementService,
    private _asyncService: AsyncService,
    private _sharedApiService: SharedApiService,
    private _wnSpinnerService: WnSpinnerService,
    private _wnToastService: WnToastService
  ) {}

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.data = this._stateManagementService.getLatestResult();
    this._subscribeToEvents();
  }

  private _subscribeToEvents() {
    this._subscription.add(
      this._asyncService.listenToWeatherUpdates().subscribe({
        next: (response) => {
          this.data = this._stateManagementService.getLatestResult();
        },
      })
    );
  }
}
