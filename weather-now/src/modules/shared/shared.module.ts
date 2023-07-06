import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { WeatherFooterComponent } from './components/weather-footer/weather-footer.component';
import { WeatherDetailComponent } from './components/weather-detail/weather-detail.component';

@NgModule({
  declarations: [
    HeaderNavComponent,
    WeatherFooterComponent,
    WeatherDetailComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [HeaderNavComponent, WeatherFooterComponent, WeatherDetailComponent],
})
export class SharedModule {}
