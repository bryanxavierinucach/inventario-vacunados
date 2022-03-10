import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { AuthService } from 'app/modules/auth/services';
import { EMPTY } from 'rxjs';
import { OpportunityStatus } from '../enums/opportunity-status.enum';
import { IOpportunity } from '../models/opportunity.model';
import { OpportunityService } from '../services/opportunity.service';

@Injectable({
  providedIn: 'root',
})
@Injectable({ providedIn: 'root' })
export class OpportunityRateResolve implements Resolve<IOpportunity> {
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
        // solo si el usuario logeado es el mismo del pymeCreation
        if (data.pymeCreationId === userOwner && data.status === OpportunityStatus.COMPLETED)
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
