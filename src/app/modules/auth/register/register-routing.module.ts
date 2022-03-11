import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SocialRedirectUriComponent } from './social-redirect-uri/social-redirect-uri.component';
import { TalentInformationFormComponent } from './talent-information-form/talent-information-form.component';
import { UserResolve } from '../../../shared/resolves/user.resolve';


const routes: Routes = [
  {
    path: '',
    component: RegisterFormComponent,
  },
  {
    path: 'talent/:id',
    component: TalentInformationFormComponent,
    resolve: {
      user: UserResolve,
    },
  },
  {
    path: 'social',
    component: SocialRedirectUriComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule { }
