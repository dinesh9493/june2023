import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchHistoryRoutingModule } from './search-history-routing.module';
import { SearchHistoryComponent } from './components/search-history/search-history.component';

@NgModule({
  declarations: [SearchHistoryComponent],
  imports: [CommonModule, SearchHistoryRoutingModule],
})
export class SearchHistoryModule {}
