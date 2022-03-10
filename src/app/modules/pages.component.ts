import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem } from '@nebular/theme';


@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu: NbMenuItem[];
  constructor(protected activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe(({ menu }) => {
      this.menu = menu;
    });
  }

}
