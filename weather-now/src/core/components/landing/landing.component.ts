import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';

import { WnToastService } from 'src/core/services/wn-toast.service';
import { WnSpinnerService } from 'src/core/services/wn-spinner.service';
import { SharedApiService } from 'src/modules/shared/services/shared-api.service';
import { StateManagementService } from 'src/modules/shared/services/state-management.service';

@Component({
  selector: 'wn-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [MessageService],
})
export class LandingComponent implements OnInit, OnDestroy {
  public isDataLoaded: boolean = false;
  public isLoggedIn: boolean = false;
  private _subscription = new Subscription();

  constructor(
    private _messageService: MessageService,
    private _wnToastService: WnToastService,
    private _ngxSpinnerService: NgxSpinnerService,
    private _wnSpinnerService: WnSpinnerService,
    private _sharedApiService: SharedApiService,
    private _stateManagementService: StateManagementService
  ) {}

  ngOnInit(): void {
    this.subscribeToEvents();
    this._loadDataFromTheServer();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private subscribeToEvents() {
    this._subscription.add(
      this._wnToastService.listenForToastMessages().subscribe({
        next: (response) => {
          this._showToast(response);
        },
      })
    );
    this._subscription.add(
      this._wnSpinnerService.listenToSpinner().subscribe({
        next: (response) => {
          if (response) {
            this._ngxSpinnerService.show();
          } else {
            this._ngxSpinnerService.hide();
          }
        },
      })
    );
  }

  private _showToast(data: any) {
    this._messageService.add({
      severity: data.severity,
      summary: data.title,
      detail: data.message,
    });
  }

  private _loadDataFromTheServer() {
    this._ngxSpinnerService.show();
    this._sharedApiService.getHistoryFromCloud().subscribe({
      next: (response: any) => {
        if (response?.data?.length && response.data[0].name) {
          this._stateManagementService.setHistory(response.data);
        }
        this.isDataLoaded = true;
        this._ngxSpinnerService.hide();
      },
      error: (error: any) => {
        console.log(error);
        this._ngxSpinnerService.hide();
        this._showToast({
          severity: 'error',
          title: 'Error',
          message: 'Could not connect to the server.',
        });
      },
    });
  }
}
