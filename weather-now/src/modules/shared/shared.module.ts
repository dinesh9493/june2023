import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { WeatherFooterComponent } from './components/weather-footer/weather-footer.component';

@NgModule({
  declarations: [HeaderNavComponent, WeatherFooterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [HeaderNavComponent, WeatherFooterComponent],
})
export class SharedModule {}
