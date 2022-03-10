import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'app/shared/models/user.model';

@Component({
  selector: 'ngx-opportunity-proposal-user',
  templateUrl: './opportunity-proposal-user.component.html',
  styleUrls: ['./opportunity-proposal-user.component.scss'],
})
export class OpportunityProposalUserComponent implements OnInit {

  @Input() user: IUser;
  constructor() { }

  ngOnInit(): void {
    this.user = this.user;
  }

  onGoLink(link) {
    let url = link;
    if (link.indexOf('http') === -1) {
      url = 'https://' + link;
    }
    window.open(url, '_blank');
  }
}
