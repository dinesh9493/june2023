import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchWeatherComponent } from './components/search-weather/search-weather.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchWeatherComponent,
  },
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'search',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
