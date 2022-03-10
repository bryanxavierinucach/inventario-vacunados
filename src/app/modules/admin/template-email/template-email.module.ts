import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateEmailRoutingModule } from './template-email-routing.module';
import { TemplateEmailComponent } from './template-email.component';
import { TemplateEmailFormComponent } from './template-email-form/template-email-form.component';
import { TemplateEmailListComponent } from './template-email-list/template-email-list.component';
import { TemplateEmailDetailComponent } from './template-email-detail/template-email-detail.component';
import { PagesModule } from 'app/modules/pages.module';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [TemplateEmailComponent, TemplateEmailFormComponent, TemplateEmailListComponent,
    TemplateEmailDetailComponent],
  imports: [
    CommonModule,
    TemplateEmailRoutingModule,
    PagesModule,
    PaginatorModule,
    DialogModule,
  ],
})
export class TemplateEmailModule { }
