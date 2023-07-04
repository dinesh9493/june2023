import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchWeatherComponent } from './components/search-weather/search-weather.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'search-result',
    component: SearchWeatherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
