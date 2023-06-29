import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CoreRoutingModule } from './core-routing.module';

import { LandingComponent } from './components/landing/landing.component';
import { SharedModule } from 'src/modules/shared/shared.module';
import { SearchWeatherComponent } from './components/search-weather/search-weather.component';

@NgModule({
  declarations: [LandingComponent, SearchWeatherComponent],
  imports: [
    BrowserModule,
    CoreRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
  ],
  bootstrap: [LandingComponent],
})
export class CoreModule {}
