import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import { OpportunityFormComponent } from './opportunity-form/opportunity-form.component';
import { PagesModule } from 'app/modules/pages.module';
import { DialogModule } from 'primeng/dialog';
import { OpportunityPercentageListComponent } from './percentage-list/opportunity-percentage-list.component';
import { OpportunityProposalComponent } from './opportunity-proposal/opportunity-proposal.component';
import { OpportunityListAssignedComponent } from './opportunity-list-assigned/opportunity-list-assigned.component';
import { OpportunityListActiveComponent } from './opportunity-list-active/opportunity-list-active.component';
import { OpportunityListCompletedComponent } from './opportunity-list-completed/opportunity-list-completed.component';
import { OpportunityRateComponent } from './opportunity-rate/opportunity-rate.component';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchFormComponent } from './match-form/match-form.component';
import { PaginatorModule } from 'primeng/paginator';
import { OpportunityListExpirededComponent } from './opportunity-list-expired/opportunity-list-expired.component';


@NgModule({
  declarations: [MarketplaceComponent, OpportunityFormComponent,
    OpportunityPercentageListComponent, OpportunityListActiveComponent, OpportunityProposalComponent,
    OpportunityListAssignedComponent, OpportunityListCompletedComponent,
    OpportunityListExpirededComponent, OpportunityRateComponent, MatchListComponent, MatchFormComponent],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    PagesModule,
    DialogModule,
    PaginatorModule,
  ],
})
export class MarketplaceModule { }
