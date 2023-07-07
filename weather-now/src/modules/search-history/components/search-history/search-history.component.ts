import { Component, OnInit } from '@angular/core';
import { WnSpinnerService } from 'src/core/services/wn-spinner.service';
import { WnToastService } from 'src/core/services/wn-toast.service';
import { SharedApiService } from 'src/modules/shared/services/shared-api.service';
import { StateManagementService } from 'src/modules/shared/services/state-management.service';

@Component({
  selector: 'wn-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss'],
})
export class SearchHistoryComponent implements OnInit {
  public history: any = [];
  public isRefreshNeeded: boolean = true;

  constructor(
    private _stateManagementService: StateManagementService,
    private _wnToastService: WnToastService,
    private _wnSpinnerService: WnSpinnerService,
    private _sharedApiService: SharedApiService
  ) {}

  ngOnInit(): void {
    this.history = this._stateManagementService.getHistory();
  }

  public refresh(cityName: string, arrayIndex: number) {
    this._wnSpinnerService.showSpinner();
    this._sharedApiService.getWeatherDetails(cityName).subscribe({
      next: (response: any) => {
        this._wnSpinnerService.hideSpinner();
        this._wnToastService.showSuccess('Refreshed the Weather Details!');
        this.history[arrayIndex] = response;
      },
      error: (error: any) => {
        this._wnSpinnerService.hideSpinner();
        this._wnToastService.showSuccess(
          'Error while refreshing the Weather Details.'
        );
        console.log(error);
      },
    });
  }
}
