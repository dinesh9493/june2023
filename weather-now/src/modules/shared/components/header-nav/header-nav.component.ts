import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedApiService } from '../../services/shared-api.service';
import { WnToastService } from 'src/core/services/wn-toast.service';
import { StateManagementService } from '../../services/state-management.service';
import { AsyncService } from '../../services/async.service';

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
    private _asyncService: AsyncService
  ) {}

  public navigate(url: string) {
    this._router.navigateByUrl(url);
  }

  public getWeatherDetails() {
    this._sharedApiService.getWeatherDetails(this.cityName).subscribe({
      next: (response: any) => {
        if (response) {
          this._stateManagementService.setHistory(response);
          this._wnToastService.showSuccess('Got the weather details!');
          this._asyncService.triggerWeatherUpdates();
          this._router.navigateByUrl('search-result');
        }
      },
      error: (error: any) => {
        this._wnToastService.showError('Please enter a Valid City Name');
      },
    });
  }
}
