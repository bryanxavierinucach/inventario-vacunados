import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionaryOpportunityResolve } from 'app/shared/resolves/questionary-opportunity.resolve';
import { DashboardTalentComponent } from './dashboard-talent/dashboard-talent.component';
import { MarketplaceTalentComponent } from './marketplace-talent/marketplace-talent.component';
import { OpportunityRateComponent } from './marketplace-talent/opportunity-rate/opportunity-rate.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardTalentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalentRoutingModule { }
