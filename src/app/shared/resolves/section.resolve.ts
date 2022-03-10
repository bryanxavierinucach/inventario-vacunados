import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { SectionService } from 'app/modules/admin/services/section.service';
import { EMPTY } from 'rxjs';
import { ISection } from '../models/section.model';

@Injectable({ providedIn: 'root' })
export class SectionResolve implements Resolve<ISection> {
  constructor(private sectionService: SectionService,
    private router: Router) { }

  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];
    let data;
    if (id) {
      const res = await this.sectionService.getById(id).toPromise();
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
