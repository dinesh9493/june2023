import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedApiService } from '../../services/shared-api.service';
import { WnToastService } from 'src/core/services/wn-toast.service';
import { StateManagementService } from '../../services/state-management.service';
import { AsyncService } from '../../services/async.service';
import { WnSpinnerService } from 'src/core/services/wn-spinner.service';

@Component({
  selector: 'wn-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent {
  public cityName: string = '';

  constructor(
    private _router: Router,
    private _sharedApiService: SharedApiService,
    private _wnToastService: WnToastService,
    private _stateManagementService: StateManagementService,
    private _asyncService: AsyncService,
    private _wnSpinnerService: WnSpinnerService
  ) {}

  public navigate(url: string) {
    this._router.navigateByUrl(url);
  }

  public getWeatherDetails() {
    this._wnSpinnerService.showSpinner();
    this._sharedApiService.getWeatherDetails(this.cityName).subscribe({
      next: (response: any) => {
        if (response) {
          this._wnSpinnerService.hideSpinner();
          this._stateManagementService.updateHistory(response);
          this._wnToastService.showSuccess('Got the weather details!');
          this._asyncService.triggerWeatherUpdates();
          this._syncSearchHistoryToCloud();
          this._router.navigateByUrl('search-result');
        }
      },
      error: (error: any) => {
        this._wnSpinnerService.hideSpinner();
        this._wnToastService.showError('Please enter a Valid City Name');
      },
    });
  }

  private _syncSearchHistoryToCloud() {
    this._wnSpinnerService.showSpinner();
    let history = this._stateManagementService.getHistory();
    let payload = {
      data: history,
    };
    this._sharedApiService.syncHistoryWithCloud(payload).subscribe({
      next: (response: any) => {
        console.log(response);
        this._wnSpinnerService.hideSpinner();
      },
      error: (error: any) => {
        console.log(error);
        this._wnSpinnerService.hideSpinner();
      },
    });
  }
}
