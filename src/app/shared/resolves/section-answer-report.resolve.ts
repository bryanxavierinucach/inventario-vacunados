import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { QuestionService } from 'app/modules/admin/services/question.service';
import { AuthService } from 'app/modules/auth/services';
import { EMPTY } from 'rxjs';
import { IQuestionary } from '../models/questionary.model';
import { ISectionAnswer } from '../models/section-answer.model';
import { SectionAnswerService } from '../services/section-answer.service';

@Injectable({
  providedIn: 'root',
})
@Injectable({ providedIn: 'root' })
export class SectionAnswerReportResolve implements Resolve<ISectionAnswer[]> {
  constructor(private sectionAnswerService: SectionAnswerService,
    private router: Router, private authService: AuthService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    try {
      const id = route.params['id'];
      const userId = route.params['userId'];
      let userOwner;
      let data;
      if (id) {
        const res = await this.sectionAnswerService.getReporByQuestionaryDone(id).toPromise();
        if (res) {
          data = res as ISectionAnswer[];
          if (userId) userOwner = userId; // cuando quiere ver el admin
          else userOwner = this.authService.getUserIdLogin(); // si ingresa desde pyme/talent
          // evita que otro usuario pueda ver (solo q esta en autenticado o en el path)
          if (data[0]?.userId === userOwner)
            return data;
          else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        } else {
          this.router.navigate(['404']);
          return EMPTY;
        }
      }
      return data;

    } catch (err) {
      this.router.navigate(['404']);
      return EMPTY;
    }
  }
}
