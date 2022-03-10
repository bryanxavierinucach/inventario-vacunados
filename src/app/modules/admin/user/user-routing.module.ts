import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { DiagnosisUserComponent } from './diagnosis-user/diagnosis-user.component';
import { UserResolve } from 'app/shared/resolves/user.resolve';
import { DiagnosisDoneReportComponent } from 'app/shared/components/diagnosis/diagnosis-done-report/diagnosis-done-report.component';
import { SectionAnswerReportResolve } from 'app/shared/resolves/section-answer-report.resolve';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: ':id/achievement',
    component: UserComponent,
  },
  {
    path: ':id/diagnosis',
    component: DiagnosisUserComponent,
    resolve: {
      user: UserResolve,
    },
  },
  {
    path: ':userId/diagnosis/:id/report',
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
export class UserRoutingModule { }
