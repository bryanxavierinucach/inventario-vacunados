import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { QuestionService } from 'app/modules/admin/services/question.service';
import { AuthService } from 'app/modules/auth/services';
import { EMPTY } from 'rxjs';
import { IOpportunity } from '../models/opportunity.model';
import { OpportunityService } from '../services/opportunity.service';

@Injectable({
  providedIn: 'root',
})
@Injectable({ providedIn: 'root' })
export class OpportunityResolve implements Resolve<IOpportunity> {
  constructor(private opportunityService: OpportunityService,
    private router: Router, private authService: AuthService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];
    let data;
    if (id) {
      const res = await this.opportunityService.getById(id).toPromise();
      if (res) {
        data = res as IOpportunity;
        const userOwner = this.authService.getUserIdLogin();
        // solo si el usuario logeado es el mismo del pymeCreatoi
        if (data.pymeCreationId === userOwner)
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
  }
}
