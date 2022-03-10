import { Component, OnInit } from '@angular/core';
import { JwtTokenService } from '../../../modules/auth/services/jwt-token.service';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
<nb-layout windowMode>
      <nb-layout-header class="header" fixed style="background-color:#1c1920">
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar id="menu-sidebar" class="menu-sidebar" tag="menu-sidebar" [containerFixed]="false">

        <ngx-sidebar-header>
        </ngx-sidebar-header>
        <div class="menu-page" style="height=100%">
          <ng-content select="nb-menu"></ng-content>
        </div>

        <ngx-sidebar-footer>
        </ngx-sidebar-footer>


      </nb-sidebar>


      <nb-layout-column
      [ngClass]="{'color-admin':index==1,'color-pyme':index==2,'color-users':index==3}" >
       <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

     <!-- <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
       -->
    </nb-layout>

  `,
})
export class OneColumnLayoutComponent implements OnInit {
  public token: any;
  public rol: any;
  public rolPyme: any;
  public rolTalent;
  public rolAdmin;
  public index: number;
  updateDialog: boolean;
  constructor(public jwtTokenService: JwtTokenService) {
  }
  ngOnInit(): void {
    this.index = 0;
    this.profile();
  }
  public profile() {
    this.token = this.jwtTokenService.decodeToken(localStorage.getItem('access_token'));
    const nameRol = this.token['realm_access'].roles;
    for (const i of nameRol) {
      if (i === 'users') {
        this.rolTalent = 'users';
        this.index = 3;
      } else if (i === 'pyme') {
        this.rolPyme = 'pyme';
        this.index = 2;
      } else if (i === 'admin') {
        this.rolAdmin = 'admin';
        this.index = 1;
      }
    }
  }
  onUpdate() {
    this.updateDialog = true;
  }
}

