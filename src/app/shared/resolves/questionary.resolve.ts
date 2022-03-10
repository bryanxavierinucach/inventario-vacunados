import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { QuestionaryService } from 'app/shared/services/questionary.service';
import { EMPTY } from 'rxjs';
import { IQuestionary } from '../models/questionary.model';

@Injectable({ providedIn: 'root' })
export class QuestionaryResolve implements Resolve<IQuestionary> {
  constructor(private questionaryService: QuestionaryService,
    private router: Router) { }

  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];
    let data;
    if (id) {
      const res = await this.questionaryService.getById(id).toPromise();
      if (res) {
        data = res;
        return data;
      } else {
        this.router.navigate(['404']);
        return EMPTY;
      }
    }
    return data;
  }
}
