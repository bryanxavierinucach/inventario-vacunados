import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionaryOpportunityResolve } from 'app/shared/resolves/questionary-opportunity.resolve';
import { MarketplaceTalentComponent } from './marketplace-talent.component';
import { OpportunityRateComponent } from './opportunity-rate/opportunity-rate.component';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceTalentComponent,
  },
  {
    path: ':id/rate',
    component: OpportunityRateComponent,
    resolve: {
      questionaryOpportunity: QuestionaryOpportunityResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplaceTalentRoutingModule { }
