import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService, JwtTokenService } from 'app/modules/auth/services';
import { HeaderService } from './header.service';
import { IUser } from 'app/shared/models/user.model';
import { UserService } from 'app/shared/services/user.service';
import { ROLE_ADMIN, ROLE_ADMIN_SHOW, ROLE_PYME_SHOW, ROLE_USER, ROLE_USERS_SHOW } from 'app/shared/constants/role.constants';
import { ROLE_PYME } from 'app/shared/constants/roles.constants';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: IUser;
  nameUser: string;
  roleShow = 'Bienvenido';
  selectTitle: string;
  subscription;
  subscriptionToogle;

  userMenu = [
    { title: 'Cambiar Contraseña', icon: 'lock-outline' },
    { title: 'Cerrar sesión', icon: 'unlock-outline' }];
  toogleSidebar: boolean;
  noneSidebar: boolean;

  constructor(
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private jwtTokenService: JwtTokenService,
    private authService: AuthService, private headerService: HeaderService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.menuService.onItemClick().subscribe((event) => {
      if (this.noneSidebar) this.toggle();
      this.menuItemSelection(event.item.title);
      if (event.item.title !== 'Cerrar sesión') {
        this.selectTitle = event.item.title;
        if (event.item.parent) {
          if (event.item.parent.title === 'Diagnóstico') this.selectTitle = event.item.parent.title;
          else this.selectTitle = event.item.parent.title + ' - ' + this.selectTitle;
        }
      }
    });

    this.menuService.onItemSelect().subscribe((event) => {
      if (event.item.title !== 'Cerrar sesión') {
        this.selectTitle = event.item.title;
        if (event.item.parent) {
          if (event.item.parent.title === 'Diagnóstico') this.selectTitle = event.item.parent.title;
          else this.selectTitle = event.item.parent.title + ' - ' + this.selectTitle;
        }
      }
    });

    this.subscription = this.headerService.title.subscribe(data => {
      this.selectTitle = data;
    });

    this.subscriptionToogle = this.headerService.togleSidebar.subscribe(data => {
      this.toogleSidebar = data;
    });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    const { sm } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < sm),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanSm: boolean) => {
        if (isLessThanSm) {
          this.toogleSidebar = true;
          document.getElementById('menu-sidebar').style.display = 'none';
        }
        this.noneSidebar = isLessThanSm;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscription.unsubscribe();
    this.subscriptionToogle.unsubscribe();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  /**
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }
*/

onClickProfile() {
  this.authService.profile();
}

  private menuItemSelection(title: string) {
    if (title === 'Cerrar sesión') {
      this.authService.logout();
    } if (title === 'Perfil') {
      this.authService.profile();
    } if (title === 'Cambiar Contraseña') {
      this.authService.change_password();
    }
  }

  // getAccount() {
  //   const token: any = this.jwtTokenService.decodeToken(localStorage.getItem('access_token'));
  //   this.nameUser = token.name;
  //   const userId = this.authService.getUserIdLogin();
  //   this.userService.getById(userId).subscribe(res => {
  //     this.user = res as IUser;
  //     if (this.user.role === ROLE_ADMIN) {
  //       this.userMenu = [
  //         { title: 'Cambiar Contraseña', icon: 'lock-outline' },
  //         { title: 'Cerrar sesión', icon: 'unlock-outline' }];
  //     } else {
  //       this.userMenu = [{ title: 'Perfil', icon: 'person-outline' },
  //       { title: 'Cambiar Contraseña', icon: 'lock-outline' },
  //       { title: 'Cerrar sesión', icon: 'unlock-outline' }];
  //     }
  //     if (this.user.role === ROLE_PYME) this.roleShow = ROLE_PYME_SHOW;
  //     if (this.user.role === ROLE_USER) this.roleShow = ROLE_USERS_SHOW;
  //     if (this.user.role === ROLE_ADMIN) this.roleShow = ROLE_ADMIN_SHOW;
  //     this.roleShow += ' - ' + this.user.user;
  //   });
  // }

  toggle(): boolean {
    this.toogleSidebar = !this.toogleSidebar;
    document.getElementById('menu-sidebar').style.display = this.toogleSidebar ? 'none' : 'block';
    this.headerService.setToogleSidebar(this.toogleSidebar);
    return false;
  }
}
