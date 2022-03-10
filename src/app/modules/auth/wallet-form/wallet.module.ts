import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletFormComponent } from './wallet-form.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbCheckboxModule,
  NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule,
  NbRadioModule, NbSelectModule, NbSidebarModule, NbTooltipModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { authInterceptorProviders, AuthService, GuardService, JwtTokenService } from '../services';
import { LoginForm } from '../models/login.form';



@NgModule({
  declarations: [WalletFormComponent],
  imports: [
    CommonModule,
    ThemeModule,
    ReactiveFormsModule,
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
  exports: [WalletFormComponent],
  providers: [
    AuthService,
    authInterceptorProviders,
    JwtTokenService,
    GuardService,
    LoginForm,
  ],

})
export class WalletModule { }
