import { ExtraOptions, Resolve, Router, RouterModule, Routes } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import {
} from '@nebular/auth';
import { AuthService, GuardService } from './modules/auth/services';
import { HomeComponent } from './@theme/components/home/home.component';
import { MarketplaceHomeComponent } from './@theme/components/marketplace-home/marketplace-home.component';
import { EMPTY } from 'rxjs';
import { MENU_ITEMS_ADMIN, MENU_ITEMS_PYME, MENU_ITEMS_TALENT } from './modules/pages-menu';
import { Page404Component } from './@theme/components/page404/page404.component';

@Injectable({ providedIn: 'root' })
export class MenuResolve implements Resolve<any> {
  constructor(private authService: AuthService, private router: Router) { }

  async resolve() {
    if (this.authService.isAuthenticated()) {
      const decodeToken = this.authService.decodeToken();
      const roles: [] = decodeToken['realm_access']['roles'];
      for (let i = 0; i < roles.length; i++) {
        const role = roles[i];
        switch (role) {
          case 'pyme':
            return MENU_ITEMS_PYME;
          case 'admin':
            return MENU_ITEMS_ADMIN;
          case 'users':
            return MENU_ITEMS_TALENT;
        }
      }
      this.router.navigate(['404']);
      return EMPTY;
    } else {
      this.router.navigate(['404']);
      return EMPTY;
    }
  }
}


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '404',
    component: Page404Component,
    pathMatch: 'full',
  },
  {
    path: 'market',
    component: MarketplaceHomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./modules/pages.module').then(m => m.PagesModule),
    canActivate: [GuardService],
    resolve: {
      menu: MenuResolve,
    },
  },
  {
    path: 'auth',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
  // { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
