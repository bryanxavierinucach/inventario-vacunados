import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private menuService: NbMenuService) {

  }

  ngOnInit(): void {
  }

  navigateHome() {
    this.menuService.navigateHome();
    return true;
  }
}
