import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { IUser } from 'app/shared/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-diagnosis-user',
  templateUrl: './diagnosis-user.component.html',
  styleUrls: ['./diagnosis-user.component.scss'],
})
export class DiagnosisUserComponent implements OnInit {

  user: IUser;
  constructor(private location: Location, private headerService: HeaderService,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe(({ user }) => (
      this.user = user));
  }

  ngOnInit(): void {
    this.headerService.setTitle('Diagnósticos ' + this.user.user);
  }

  onBack() {
    this.location.back();
  }
}
