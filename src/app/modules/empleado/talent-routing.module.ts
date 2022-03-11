import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardTalentComponent } from './dashboard-talent/dashboard-talent.component';

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
