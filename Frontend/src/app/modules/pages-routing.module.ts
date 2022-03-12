import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { GuardService } from './auth/services';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'talent/profile',
        loadChildren: () =>
          import('../modules/auth/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'password',
        loadChildren: () =>
          import('../modules/auth/register/change-password/change-password.module').then(m => m.ChangePasswordModule),
      },
      // Admin module
      {
        path: 'admin/user',
        loadChildren: () =>
          import('./admin/user/user.module').then(m => m.UserModule),
        canActivateChild: [GuardService],
        data: { rol: ['admin'] },
      },
      // TALENT
      {
        path: 'talent',
        loadChildren: () =>
          import('./empleado/talent.module').then(m => m.TalentModule),
        canActivateChild: [GuardService],
        data: { rol: ['users'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
