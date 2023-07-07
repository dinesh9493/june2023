import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'wn-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss'],
})
export class WeatherDetailComponent implements OnChanges {
  @Input() weartherDetails: any;
  @Input() isRefreshAvailable: boolean = false;
  @Output() updateWeather: any = new EventEmitter();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
  }

  public refresh() {
    this.updateWeather.emit(this.weartherDetails.name);
  }
}
