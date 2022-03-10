import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/modules/auth/services';

@Component({
  selector: 'ngx-sidebar-footer',
  templateUrl: './sidebar-footer.component.html',
  styleUrls: ['./sidebar-footer.component.scss'],
})
export class SiderbarFooterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}
