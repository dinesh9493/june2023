import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CoreRoutingModule } from './core-routing.module';

import { LandingComponent } from './components/landing/landing.component';
import { SharedModule } from 'src/modules/shared/shared.module';
import { SearchWeatherComponent } from './components/search-weather/search-weather.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [LandingComponent, SearchWeatherComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ToastModule,
    NgxSpinnerModule,
  ],
  bootstrap: [LandingComponent],
})
export class CoreModule {}
