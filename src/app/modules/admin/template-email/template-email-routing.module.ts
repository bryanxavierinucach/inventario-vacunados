import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateEmailResolve } from 'app/shared/resolves/temaplate-email.resolve';
import { TemplateEmailDetailComponent } from './template-email-detail/template-email-detail.component';
import { TemplateEmailFormComponent } from './template-email-form/template-email-form.component';
import { TemplateEmailComponent } from './template-email.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateEmailComponent,
  },
  {
    path: 'new',
    component: TemplateEmailFormComponent,
  },
  {
    path: ':id/view',
    component: TemplateEmailDetailComponent,
    resolve: {
      templateEmail: TemplateEmailResolve,
    },
  },
  {
    path: ':id/edit',
    component: TemplateEmailFormComponent,
    resolve: {
      templateEmail: TemplateEmailResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplateEmailRoutingModule { }
