import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UserService } from 'app/shared/services/user.service';
import { EMPTY } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserResolve implements Resolve<IUser> {
  constructor(private userService: UserService,
    private router: Router) { }

  async resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['id'];
    let data;
    if (id) {
      const res = await this.userService.getByIdUser(id).toPromise();
      if (res === true) {
        data = res;
        return data;
      } else {
        this.router.navigate(['/404']);
        return EMPTY;
      }
    }
    return data;
  }
}
