import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceTalentRoutingModule } from './marketplace-talent-routing.module';
import { MarketplaceTalentComponent } from './marketplace-talent.component';
import { OpportunityListCompletedComponent } from './opportunity-list-completed/opportunity-list-completed.component';
import { OpportunityRateComponent } from './opportunity-rate/opportunity-rate.component';
import { PagesModule } from 'app/modules/pages.module';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';


@NgModule({
  declarations: [MarketplaceTalentComponent, OpportunityListCompletedComponent,
    OpportunityRateComponent],
  imports: [
    CommonModule,
    MarketplaceTalentRoutingModule,
    PagesModule,
    DialogModule,
    PaginatorModule,
  ],
})
export class MarketplaceTalentModule { }
