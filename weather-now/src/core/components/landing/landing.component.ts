import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { MessageService } from 'primeng/api';

import { WnToastService } from 'src/core/services/wn-toast.service';

@Component({
  selector: 'wn-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  providers: [MessageService],
})
export class LandingComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();

  constructor(
    private _messageService: MessageService,
    private _wnToastService: WnToastService
  ) {}

  ngOnInit(): void {
    this.subscribeToEvents();
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
  }

  private _showToast(data: any) {
    this._messageService.add({
      severity: data.severity,
      summary: data.title,
      detail: data.message,
    });
  }
}
