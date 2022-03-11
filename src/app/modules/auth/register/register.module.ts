import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from '../auth-routing.module';
import { ThemeModule } from 'app/@theme/theme.module';
import {
  NbActionsModule, NbAlertModule, NbBadgeModule, NbButtonModule, NbCardModule,
  NbCheckboxModule, NbFormFieldModule,
  NbIconModule, NbInputModule,
  NbLayoutModule, NbProgressBarModule,
  NbRadioModule, NbSelectModule, NbSidebarModule,
  NbSpinnerModule, NbTableModule, NbToastrModule, NbTooltipModule, NbUserModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { authInterceptorProviders, AuthService, GuardService, JwtTokenService } from '../services';
import { LoginForm } from '../models/login.form';
import { TalentInformationFormComponent } from './talent-information-form/talent-information-form.component';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { CarouselModule } from 'primeng/carousel';
import { TalentService } from 'app/modules/empleado/services/talent.service';
import { SocialRedirectUriComponent } from './social-redirect-uri/social-redirect-uri.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [RegisterFormComponent, TalentInformationFormComponent,
    SocialRedirectUriComponent,
    ChangePasswordComponent],

  imports: [
    CommonModule,
    RegisterRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ThemeModule,
    FormsModule,
    NbFormFieldModule,
    NbIconModule,
    NbEvaIconsModule,
    NbInputModule,
    NbButtonModule,
    InputTextModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCheckboxModule,
    NbSelectModule,
    NbCardModule,
    DialogModule,
    NbRadioModule,
    NbTableModule,
    DropdownModule,
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
    NbIconModule,
    NbProgressBarModule,
    NbSpinnerModule,
    NbTooltipModule,
    NbUserModule,
    NgxIntlTelInputModule,
  ],
  providers: [
    AuthService,
    authInterceptorProviders,
    JwtTokenService,
    GuardService,
    LoginForm,
    TalentService,
  ],
})
export class RegisterModule { }
