import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { IQuestionary } from '../models/questionary.model';
import { TemplateEmailService } from '../services/template-email.service';

@Injectable({ providedIn: 'root' })
export class TemplateEmailResolve implements Resolve<IQuestionary> {
  constructor(private templateEmailService: TemplateEmailService,
    private router: Router) { }

  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];
    let data;
    if (id) {
      const res = await this.templateEmailService.getById(id).toPromise();
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
