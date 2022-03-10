import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { PagesModule } from 'app/modules/pages.module';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { NbUserModule } from '@nebular/theme';
import { UserAchieveListComponent } from './user-achieve-list/user-achieve-list.component';
import { UserAchieveFormComponent } from './user-achieve-form/user-achieve-form.component';
import { DiagnosisUserComponent } from './diagnosis-user/diagnosis-user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [UserComponent, UserListComponent, UserAchieveListComponent,
    UserAchieveFormComponent, DiagnosisUserComponent, UserFormComponent, UsersComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    PagesModule,
    PaginatorModule,
    DialogModule,
    NbUserModule,
  ],
})
export class UserModule { }
