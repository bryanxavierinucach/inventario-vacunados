import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosisRoutingModule } from './diagnosis-routing.module';
import { PagesModule } from 'app/modules/pages.module';
import { PaginatorModule } from 'primeng/paginator';
import { DiagnosisDoneComponent } from '../../../shared/components/diagnosis/diagnosis-done/diagnosis-done.component';
import { DiagnosisTodoListComponent } from 'app/shared/components/diagnosis/diagnosis-todo-list/diagnosis-todo-list.component';
import { DiagnosisTodoFormComponent } from 'app/shared/components/diagnosis/diagnosis-todo-form/diagnosis-todo-form.component';
import { DiagnosisTodoFormQuestionComponent } from 'app/shared/components/diagnosis/diagnosis-todo-form-question/diagnosis-todo-form-question.component';
import { DiagnosisDoneReportComponent } from 'app/shared/components/diagnosis/diagnosis-done-report/diagnosis-done-report.component';
import { DiagnosisDoneListComponent } from 'app/shared/components/diagnosis/diagnosis-done-list/diagnosis-done-list.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DiagnosisRoutingModule,
    PagesModule,
    PaginatorModule,
  ],
})
export class DiagnosisModule { }
