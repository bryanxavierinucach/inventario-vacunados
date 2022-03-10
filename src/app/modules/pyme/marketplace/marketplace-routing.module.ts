import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AchievementFormAssignComponent } from 'app/shared/components/achievement-form-assign/achievement-form-assign.component';
import { OpportunityActiveResolve } from 'app/shared/resolves/opportunity-active.resolve';
import { OpportunityRateResolve } from 'app/shared/resolves/opportunity-rate.resolve';
import { OpportunityResolve } from 'app/shared/resolves/opportunity.resolve';
import { QuestionaryOpportunityResolve } from 'app/shared/resolves/questionary-opportunity.resolve';
import { MarketplaceComponent } from './marketplace.component';
import { MatchListComponent } from './match-list/match-list.component';
import { OpportunityFormComponent } from './opportunity-form/opportunity-form.component';
import { OpportunityProposalComponent } from './opportunity-proposal/opportunity-proposal.component';
import { OpportunityRateComponent } from './opportunity-rate/opportunity-rate.component';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceComponent,
  },
  {
    path: 'new',
    component: OpportunityFormComponent,
  },
  {
    path: ':id/edit',
    component: OpportunityFormComponent,
    resolve: {
      opportunity: OpportunityResolve,
    },
  },
  {
    path: ':id/view',
    component: OpportunityProposalComponent,
    resolve: {
      opportunity: OpportunityActiveResolve,
    },
  },
  {
    path: ':id/rate',
    component: OpportunityRateComponent,
    resolve: {
      questionaryOpportunity: QuestionaryOpportunityResolve,
    },
  },
  {
    path: 'match/:id',
    component: MatchListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplaceRoutingModule { }
