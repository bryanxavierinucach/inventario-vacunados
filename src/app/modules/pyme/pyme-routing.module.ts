import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPymeComponent } from './dashboard-pyme/dashboard-pyme.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPymeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PymeRoutingModule { }
