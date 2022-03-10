import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionaryRoutingModule } from './questionary-routing.module';
import { PagesModule } from 'app/modules/pages.module';
import { QuestionaryComponent } from './questionary.component';
import { QuestionaryFormComponent } from './questionary-form/questionary-form.component';
import { QuestionaryListComponent } from './questionary-list/questionary-list.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { SectionFormComponent } from './section-form/section-form.component';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { OptionFormComponent } from './option-form/option-form.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { QuestionaryDetailComponent } from './questionary-detail/questionary-detail.component';


@NgModule({
  declarations: [QuestionaryComponent, QuestionaryFormComponent,
    QuestionaryListComponent, QuestionFormComponent,
     SectionFormComponent, OptionFormComponent,
      FeedbackFormComponent, QuestionaryDetailComponent],
  imports: [
    CommonModule,
    QuestionaryRoutingModule,
    PagesModule,
    PaginatorModule,
    DialogModule,
  ],
})
export class QuestionaryModule { }
