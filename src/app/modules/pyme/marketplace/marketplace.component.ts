import { Component, OnInit, ViewChild } from '@angular/core';
import { NbTabComponent } from '@nebular/theme';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { OpportunityStatus } from 'app/shared/enums/opportunity-status.enum';
import { ModalSizeComponent } from 'app/shared/utils/classes/modal-size.component';

@Component({
  selector: 'ngx-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss'],
})
export class MarketplaceComponent extends ModalSizeComponent implements OnInit {

  opportunityStatus = OpportunityStatus;
  tabActive: string;
  constructor(private headerService: HeaderService) {
    super();
  }

  ngOnInit(): void {
    this.headerService.setTitle('Marketplace');
  }

  onChangeTab(tab: NbTabComponent) {
    this.tabActive = tab.tabId;
  }
}

