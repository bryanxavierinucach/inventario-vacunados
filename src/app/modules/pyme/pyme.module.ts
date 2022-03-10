import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PymeRoutingModule } from './pyme-routing.module';
import { PymeComponent } from './pyme.component';
import { PagesModule } from '../pages.module';
import {
  NbActionsModule, NbAlertModule, NbBadgeModule, NbButtonModule,
  NbInputModule, NbTableModule, NbToastrModule, NbUserModule, NbCardModule, NbCheckboxModule,
  NbIconModule, NbProgressBarModule, NbRadioModule, NbSpinnerModule, NbTooltipModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { CarouselModule } from 'primeng/carousel';
import { JwtTokenService } from '../auth/services/jwt-token.service';
import { ToastService } from '../../@core/services/toast.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TalentService } from '../talent/services/talent.service';
import { DashboardPymeComponent } from './dashboard-pyme/dashboard-pyme.component';

@NgModule({
  declarations: [PymeComponent, DashboardPymeComponent],
  imports: [
    CommonModule,
    PymeRoutingModule,
    PagesModule,
    NbUserModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbInputModule,
    NbButtonModule,
    InputTextModule,
    NbTableModule,
    DropdownModule,
    NbEvaIconsModule,
    DataViewModule,
    CardModule,
    TooltipModule,
    PaginatorModule,
    SidebarModule,
    NbToastrModule,
    CarouselModule,
    NbActionsModule,
    NbAlertModule,
    NbBadgeModule,
    NbCardModule,
    NbCheckboxModule,
    NbIconModule,
    NbProgressBarModule,
    NbRadioModule,
    NbSpinnerModule,
    NbTooltipModule,
    NbUserModule,
  ],
  providers: [
    TalentService,
    JwtTokenService,
    ToastService,
    ConfirmationService,
    MessageService,
  ],
})
export class PymeModule { }
