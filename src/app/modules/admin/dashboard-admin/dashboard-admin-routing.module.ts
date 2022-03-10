import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardDetailAdminComponent } from './dashboard-detail-admin/dashboard-detail-admin.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardDetailAdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAdminRoutingModule { }
