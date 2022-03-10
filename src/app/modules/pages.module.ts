import { NgModule } from '@angular/core';
import {
  NbAlertModule,
  NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule, NbProgressBarModule, NbRadioModule, NbSelectModule,
  NbStepperModule, NbTabsetModule, NbToggleModule, NbTooltipModule, NbUserModule,
} from '@nebular/theme';
import { SidebarModule } from 'primeng/sidebar';
import { DataViewModule } from 'primeng/dataview';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DiagnosisTodoFormComponent } from 'app/shared/components/diagnosis/diagnosis-todo-form/diagnosis-todo-form.component';
import { DiagnosisTodoListComponent } from 'app/shared/components/diagnosis/diagnosis-todo-list/diagnosis-todo-list.component';
import { DiagnosisTodoFormQuestionComponent } from 'app/shared/components/diagnosis/diagnosis-todo-form-question/diagnosis-todo-form-question.component';
import { DiagnosisDoneComponent } from 'app/shared/components/diagnosis/diagnosis-done/diagnosis-done.component';
import { DiagnosisDoneListComponent } from 'app/shared/components/diagnosis/diagnosis-done-list/diagnosis-done-list.component';
import { DiagnosisDoneReportComponent } from 'app/shared/components/diagnosis/diagnosis-done-report/diagnosis-done-report.component';
import { OpportunityListStatusComponent } from 'app/shared/components/marketplace/opportunity-list-status/opportunity-list-status.component';
import { OpportunityProposalUserComponent } from 'app/shared/components/marketplace/opportunity-proposal-user/opportunity-proposal-user.component';
import { DialogModule } from 'primeng/dialog';
import { DashboardComponent } from 'app/shared/components/dashboard/dashboard.component';
import { CoinNotationPipe } from 'app/shared/pipes/coin-notation.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { SafeHtmlPipe } from 'app/shared/pipes/safe-html.pipe';
import { AchievementFormAssignComponent } from 'app/shared/components/achievement-form-assign/achievement-form-assign.component';


const NB_MODULES = [
  NbCardModule,
  NbSelectModule,
  NbButtonModule,
  NbRadioModule,
  NbDatepickerModule,
  NbInputModule,
  NbIconModule,
  NbEvaIconsModule,
  NbFormFieldModule,
  NbStepperModule,
  NbTooltipModule,
  NbToggleModule,
  NbCheckboxModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbAlertModule,
];

const PN_MODULES = [
  SidebarModule,
  DataViewModule,
  ConfirmDialogModule,
];

const SHARED_MODULES = [
  FormsModule,
  ReactiveFormsModule,
];

const SHARED_COMPONENTS = [
  DiagnosisTodoFormComponent, DiagnosisTodoListComponent,
  DiagnosisTodoFormQuestionComponent,
  DiagnosisDoneComponent, DiagnosisDoneListComponent, DiagnosisDoneReportComponent,
  OpportunityListStatusComponent, OpportunityProposalUserComponent, DashboardComponent,
  CoinNotationPipe,
  SafeHtmlPipe,
  CoinNotationPipe,
  AchievementFormAssignComponent,
];

const MAT_MODULES = [
];
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DialogModule,
    PaginatorModule,
    ...NB_MODULES,
    ...PN_MODULES,
    ...MAT_MODULES,
    ...SHARED_MODULES],
  declarations: [PagesComponent, ...SHARED_COMPONENTS],
  exports: [
    ...NB_MODULES,
    ...PN_MODULES,
    ...MAT_MODULES,
    ...SHARED_MODULES,
    ...SHARED_COMPONENTS,
  ],
  providers: [ConfirmationService],
})
export class PagesModule { }
