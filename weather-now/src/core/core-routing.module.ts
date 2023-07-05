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
  {
    path: 'search-history',
    loadChildren: () =>
      import('../modules/search-history/search-history.module').then(
        (m) => m.SearchHistoryModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
