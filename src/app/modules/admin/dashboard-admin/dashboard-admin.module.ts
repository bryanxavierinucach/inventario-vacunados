import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { DashboardDetailAdminComponent } from './dashboard-detail-admin/dashboard-detail-admin.component';
import { PagesModule } from 'app/modules/pages.module';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ThemeModule } from 'app/@theme/theme.module';
import { NbBadgeModule, NbButtonModule, NbCardModule,
  NbIconModule, NbProgressBarModule, NbRadioModule,
  NbSpinnerModule, NbToastrModule, NbTooltipModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [DashboardDetailAdminComponent],
  imports: [
    CommonModule,
    DashboardAdminRoutingModule,
    PagesModule,
    PaginatorModule,
    DialogModule,
    PagesModule,
    ThemeModule,
    NbButtonModule,
    NbEvaIconsModule,
    DataViewModule,
    CardModule,
    TooltipModule,
    NbToastrModule,
    NbBadgeModule,
    NbCardModule,
    NbIconModule,
    NbProgressBarModule,
    NbRadioModule,
    NbSpinnerModule,
    NbTooltipModule,
  ],
})
export class DashboardAdminModule { }
