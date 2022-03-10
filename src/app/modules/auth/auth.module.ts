import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { ThemeModule } from 'app/@theme/theme.module';
import {
  NbInputModule, NbButtonModule, NbSidebarModule, NbLayoutModule,
  NbFormFieldModule, NbIconModule, NbCheckboxModule, NbSelectModule,
  NbCardModule,
  NbTooltipModule,
  NbRadioModule,
} from '@nebular/theme';
import { InputTextModule } from 'primeng/inputtext';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from './services/auth-interceptor.service';
import { GuardService, JwtTokenService } from './services';
import { LoginForm } from './models/login.form';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DialogModule } from 'primeng/dialog';
import { WalletModule } from './wallet-form/wallet.module';
import { ResetPasswordComponent } from './register/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent, ResetPasswordComponent,
  ],
  imports: [
    WalletModule,
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
    NbTooltipModule,
    NbRadioModule,
  ],
  providers: [
    AuthService,
    authInterceptorProviders,
    JwtTokenService,
    GuardService,
    LoginForm,
  ],
})
export class AuthModule { }
