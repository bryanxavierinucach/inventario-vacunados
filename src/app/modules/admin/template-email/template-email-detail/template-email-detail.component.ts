import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { ITemplateEmail } from 'app/shared/models/template-email.model';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-template-email-detail',
  templateUrl: './template-email-detail.component.html',
  styleUrls: ['./template-email-detail.component.scss'],
})
export class TemplateEmailDetailComponent implements OnInit {

  templateEmail: ITemplateEmail;

  constructor(protected activatedRoute: ActivatedRoute, private headerService: HeaderService,
    private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ templateEmail }) => (
      this.templateEmail = templateEmail
    ));
    this.headerService.setTitle(this.templateEmail.code);
  }

  onBack() {
    this.location.back();
  }

}
