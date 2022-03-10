import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { QuestionService } from 'app/modules/admin/services/question.service';
import { EMPTY } from 'rxjs';
import { IQuestionary } from '../models/questionary.model';

@Injectable({
  providedIn: 'root',
})
@Injectable({ providedIn: 'root' })
export class QuestionResolve implements Resolve<IQuestionary> {
  constructor(private questionService: QuestionService,
    private router: Router) { }

  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];
    let data;
    if (id) {
      const res = await this.questionService.getById(id).toPromise();
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
