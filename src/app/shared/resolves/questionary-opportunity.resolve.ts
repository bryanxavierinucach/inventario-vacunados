import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { AuthService } from 'app/modules/auth/services';
import { QuestionaryService } from 'app/shared/services/questionary.service';
import { EMPTY } from 'rxjs';
import { ROLE_PYME } from '../constants/role.constants';
import { ROLE_TALENT } from '../constants/roles.constants';
import { OpportunityStatus } from '../enums/opportunity-status.enum';
import { QuestionaryDirected } from '../enums/questionary-directed.enum';
import { QuestionaryType } from '../enums/questionary-type.enum';
import { IOpportunity } from '../models/opportunity.model';
import { IQuestionaryOpportunity } from '../models/questionary-opportunity.model';
import { OpportunityService } from '../services/opportunity.service';

@Injectable({ providedIn: 'root' })
export class QuestionaryOpportunityResolve implements Resolve<IQuestionaryOpportunity> {
  constructor(private questionaryService: QuestionaryService,
    private opportunityService: OpportunityService, private authService: AuthService,
    private router: Router) { }

  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];
    let data;
    if (id) {
      const qo: IQuestionaryOpportunity = {};
      const opportunity = await this.opportunityService.getById(id).toPromise();
      if (opportunity) {
        let directedRole;
        const isPyme = this.authService.isExistRole(ROLE_PYME);
        if (isPyme) directedRole = QuestionaryDirected.PYME;
        else {
          const isTalent = this.authService.isExistRole(ROLE_TALENT);
          if (isTalent) directedRole = QuestionaryDirected.TALENT;
        }
        qo.opportunity = opportunity as IOpportunity;
        if ((qo.opportunity.pymeQuestionaryDoneId && directedRole === QuestionaryDirected.PYME) ||
          (qo.opportunity.talentQuestionaryDoneId && directedRole === QuestionaryDirected.TALENT)) {
          this.router.navigate(['404']);
          return EMPTY;
        }
        const userOwner = this.authService.getUserIdLogin();
        // solo si el usuario logeado es el mismo del pymeCreation
        if ((qo.opportunity.pymeCreationId === userOwner || qo.opportunity.talentAssignedId === userOwner)
          && qo.opportunity.status === OpportunityStatus.COMPLETED) {
          const questionaries = await this.questionaryService.getAllByType(
            QuestionaryType.OPPORTUNITY, directedRole, 1, 0, null, null, null, null).toPromise();
          if (questionaries && questionaries['data']?.length > 0) {
            const questionaryData = questionaries['data'][0];
            if (questionaryData) {
              qo.questionary = questionaryData;
              data = qo;
              return data;
            }
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        } else {
          this.router.navigate(['404']);
          return EMPTY;
        }
      } else {
        this.router.navigate(['404']);
        return EMPTY;
      }
    }
    return data;
  }
}
