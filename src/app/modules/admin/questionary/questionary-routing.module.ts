import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionaryResolve } from 'app/shared/resolves/questionary.resolve';
import { QuestionaryDetailComponent } from './questionary-detail/questionary-detail.component';
import { QuestionaryFormComponent } from './questionary-form/questionary-form.component';
import { QuestionaryComponent } from './questionary.component';


const routes: Routes = [
  {
    path: '',
    component: QuestionaryComponent,
  },
  {
    path: 'new',
    component: QuestionaryFormComponent,
  },
  {
    path: ':id/view',
    component: QuestionaryDetailComponent,
    resolve: {
      questionary: QuestionaryResolve,
    },
  },
  {
    path: ':id/edit',
    component: QuestionaryFormComponent,
    resolve: {
      questionary: QuestionaryResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionaryRoutingModule { }
