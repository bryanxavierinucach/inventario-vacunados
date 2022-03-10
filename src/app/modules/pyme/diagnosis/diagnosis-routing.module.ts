import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionaryResolve } from 'app/shared/resolves/questionary.resolve';
import { SectionAnswerReportResolve } from 'app/shared/resolves/section-answer-report.resolve';
import { DiagnosisDoneComponent } from '../../../shared/components/diagnosis/diagnosis-done/diagnosis-done.component';
import { DiagnosisTodoFormComponent } from '../../../shared/components/diagnosis/diagnosis-todo-form/diagnosis-todo-form.component';
import { DiagnosisTodoListComponent } from 'app/shared/components/diagnosis/diagnosis-todo-list/diagnosis-todo-list.component';
import { DiagnosisDoneReportComponent } from 'app/shared/components/diagnosis/diagnosis-done-report/diagnosis-done-report.component';

const routes: Routes = [
  {
    path: '',
    component: DiagnosisTodoListComponent,
  },
  {
    path: ':id/todo',
    component: DiagnosisTodoFormComponent,
    resolve: {
      questionary: QuestionaryResolve,
    },
  },
  {
    path: 'done',
    component: DiagnosisDoneComponent,
  },
  {
    path: 'done/:id/report',
    component: DiagnosisDoneReportComponent,
    resolve: {
      sectionAnswerReport: SectionAnswerReportResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosisRoutingModule { }
