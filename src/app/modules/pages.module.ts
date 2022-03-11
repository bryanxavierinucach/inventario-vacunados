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
import { DialogModule } from 'primeng/dialog';
import { DashboardComponent } from 'app/shared/components/dashboard/dashboard.component';
import { CoinNotationPipe } from 'app/shared/pipes/coin-notation.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { SafeHtmlPipe } from 'app/shared/pipes/safe-html.pipe';


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
  DashboardComponent,
  CoinNotationPipe,
  SafeHtmlPipe,
  CoinNotationPipe,
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
