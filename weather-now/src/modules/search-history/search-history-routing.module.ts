import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchHistoryComponent } from './components/search-history/search-history.component';

const routes: Routes = [
  {
    path: '',
    component: SearchHistoryComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchHistoryRoutingModule {}
