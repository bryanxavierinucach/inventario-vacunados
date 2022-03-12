import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { PagesModule } from 'app/modules/pages.module';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { NbUserModule } from '@nebular/theme';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [UserComponent, UserListComponent, UserFormComponent, UsersComponent],
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
