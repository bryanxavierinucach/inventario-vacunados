import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
})
export class Page404Component implements OnInit {

  constructor(private menuService: NbMenuService) { }

  ngOnInit(): void {
  }
  navigateHome() {
    this.menuService.navigateHome();
    return true;
  }

}
