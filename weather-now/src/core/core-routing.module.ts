import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchWeatherComponent } from './components/search-weather/search-weather.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {
    path: 'welcome',
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
  {
    path: 'login',
    loadChildren: () =>
      import('../modules/sign-in-or-up/sign-in-or-up.module').then(
        (m) => m.SignInOrUpModule
      ),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
