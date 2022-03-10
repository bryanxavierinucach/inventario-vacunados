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
        path: 'profile',
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
        path: 'admin/dashboard',
        loadChildren: () =>
          import('../modules/admin/dashboard-admin/dashboard-admin.module').then(m => m.DashboardAdminModule),
        canActivateChild: [GuardService],
        data: { rol: ['admin']},
      },
      {
        path: 'admin/questionary',
        loadChildren: () =>
          import('../modules/admin/questionary/questionary.module').then(m => m.QuestionaryModule),
        canActivateChild: [GuardService],
        data: { rol: ['admin'] },
      },
      {
        path: 'admin/reward',
        loadChildren: () =>
          import('../modules/admin/reward/reward.module').then(m => m.RewardModule),
        canActivateChild: [GuardService],
        data: { rol: ['admin'] },
      },
      {
        path: 'admin/questionary',
        loadChildren: () =>
          import('../modules/admin/questionary/questionary.module').then(m => m.QuestionaryModule),
        canActivateChild: [GuardService],
        data: { rol: ['admin'] },
      },
      {
        path: 'admin/achievement',
        loadChildren: () =>
          import('./admin/achievement/achievement.module').then(m => m.AchievementModule),
        canActivateChild: [GuardService],
        data: { rol: ['admin'] },
      },
      {
        path: 'admin/paymentMethod',
        loadChildren: () =>
          import('./admin/payment-method/payment-method.module').then(m => m.PaymentMethodModule),
        canActivateChild: [GuardService],
        data: { rol: ['admin'] },
      },
      {
        path: 'admin/user',
        loadChildren: () =>
          import('./admin/user/user.module').then(m => m.UserModule),
        canActivateChild: [GuardService],
        data: { rol: ['admin'] },
      },
      {
        path: 'admin/templateemail',
        loadChildren: () =>
          import('./admin/template-email/template-email.module').then(m => m.TemplateEmailModule),
        canActivateChild: [GuardService],
        data: { rol: ['admin'] },
      },
      // PYME
      {
        path: 'pyme/diagnosis',
        loadChildren: () =>
          import('../modules/pyme/diagnosis/diagnosis.module').then(m => m.DiagnosisModule),
        canActivateChild: [GuardService],
        data: { rol: ['pyme'] },
      },
      {
        path: 'pyme/marketplace',
        loadChildren: () =>
          import('./pyme/marketplace/marketplace.module').then(m => m.MarketplaceModule),
        canActivateChild: [GuardService],
        data: { rol: ['pyme'] },
      },
      {
        path: 'pyme',
        loadChildren: () =>
          import('../modules/pyme/pyme.module').then(m => m.PymeModule),
        canActivateChild: [GuardService],
        data: { rol: ['pyme'] },
      },
      // TALENT
      {
        path: 'talent/diagnosis',
        loadChildren: () =>
          import('../modules/talent/diagnosis/diagnosis.module').then(m => m.DiagnosisModule),
        canActivateChild: [GuardService],
        data: { rol: ['users'] },
      },
      {
        path: 'talent',
        loadChildren: () =>
          import('../modules/talent/talent.module').then(m => m.TalentModule),
        canActivateChild: [GuardService],
        data: { rol: ['users'] },
      },
      {
        path: 'talent/marketplace',
        loadChildren: () =>
          import('./talent/marketplace-talent/marketplace-talent.module').then(m => m.MarketplaceTalentModule),
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
