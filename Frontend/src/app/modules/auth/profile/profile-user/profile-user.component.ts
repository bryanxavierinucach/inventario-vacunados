import { Component, OnInit } from '@angular/core';
import { JwtTokenService } from '../../services';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'ngx-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss'],
})
export class ProfileUserComponent implements OnInit {

  public token: any;
  public rol: any;
  public rolPyme: any;
  public rolTalent;
  updateDialog: boolean;

  constructor(public jwtTokenService: JwtTokenService) {

  }

  ngOnInit(): void {

    this.profile();

  }

  public profile() {
    this.token = this.jwtTokenService.decodeToken(localStorage.getItem('access_token'));
    const nameRol = this.token['realm_access'].roles;


    for (const i of nameRol) {
      if (i === 'users') {
        this.rolTalent = 'users';
      } else if (i === 'pyme') {
        this.rolPyme = 'pyme';
      }
    }

  }

  onUpdate() {
    this.updateDialog = true;
  }

}
