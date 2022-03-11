import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { NbActionsModule, NbAlertModule, NbAutocompleteModule, NbBadgeModule, NbButtonModule,
  NbCardModule, NbCheckboxModule, NbFormFieldModule, NbIconModule,
  NbInputModule, NbLayoutModule, NbProgressBarModule, NbRadioModule,
  NbSelectModule, NbSidebarModule, NbSpinnerModule, NbTableModule,
  NbToastrModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { CardModule } from 'primeng/card';
import { ProfileTalentComponent } from 'app/modules/empleado/profile-talent/profile-talent.component';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ProfileFormPymeComponent } from './profile-form-pyme/profile-form-pyme.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ThemeModule } from 'app/@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { CarouselModule } from 'primeng/carousel';
import { RegisterRoutingModule } from '../register/register-routing.module';
import { AuthRoutingModule } from '../auth-routing.module';

@NgModule({
  declarations: [ProfileUserComponent, ProfileTalentComponent, ProfileFormPymeComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    NbCardModule,
    CardModule,
    NbUserModule,
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

    TooltipModule,
    NbTooltipModule,
    DialogModule,
    NbIconModule,
    NgxIntlTelInputModule,
    NbActionsModule,
    NbAlertModule,
    NbBadgeModule,
    NbProgressBarModule,
    NbSpinnerModule,
    NbTooltipModule,
    NbUserModule,
    NbAutocompleteModule,
  ],
})
export class ProfileModule { }
