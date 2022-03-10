import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentRoutingModule } from './talent-routing.module';
import { TalentComponent } from './talent.component';
import { PagesModule } from '../pages.module';
import {
  NbActionsModule, NbAlertModule, NbBadgeModule, NbButtonModule,
  NbInputModule, NbTableModule, NbToastrModule, NbUserModule, NbCardModule,
  NbCheckboxModule, NbIconModule, NbProgressBarModule, NbRadioModule, NbSpinnerModule, NbTooltipModule,
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
import { TalentService } from './services/talent.service';
import { JwtTokenService } from '../auth/services/jwt-token.service';
import { ToastService } from '../../@core/services/toast.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MarketplaceTalentComponent } from './marketplace-talent/marketplace-talent.component';
import { DialogModule } from 'primeng/dialog';
import { OpportunityListCompletedComponent } from './marketplace-talent/opportunity-list-completed/opportunity-list-completed.component';
import { OpportunityRateComponent } from './marketplace-talent/opportunity-rate/opportunity-rate.component';
import { DashboardTalentComponent } from './dashboard-talent/dashboard-talent.component';
import { DashboardComponent } from 'app/shared/components/dashboard/dashboard.component';
import { OpportunityListProposalComponent } from './opportunity-list-proposal/opportunity-list-proposal.component';


@NgModule({
  declarations: [DashboardTalentComponent, OpportunityListProposalComponent],
  imports: [
    CommonModule,
    TalentRoutingModule,
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
    CommonModule,
    DialogModule,
  ],
  providers: [
    TalentService,
    JwtTokenService,
    ToastService,
    ConfirmationService,
    MessageService,
  ],
})
export class TalentModule { }
