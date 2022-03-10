import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { TITLE_REWARD } from 'app/shared/constants/title-pages.contants';
import { IReward } from 'app/shared/models/reward.model';
import { ModalSizeComponent } from 'app/shared/utils/classes/modal-size.component';
import { RewardListComponent } from './reward-list/reward-list.component';

@Component({
  selector: 'ngx-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss'],
})
export class RewardComponent extends ModalSizeComponent implements OnInit {

  displayCreate: boolean;
  reward: IReward;

  @ViewChild(RewardListComponent) rewardList;
  constructor(private headerService: HeaderService) {
    super();
  }

  ngOnInit(): void {
    this.headerService.setTitle(TITLE_REWARD);
  }

  onCreate() {
    this.displayCreate = true;
  }

  onUpdate(data: IReward) {
    this.reward = data;
    this.displayCreate = true;
  }

  onSuccess() {
    this.reward = null;
    this.displayCreate = false;
    this.rewardList.loadData();
  }

  onClose() {
    this.reward = null;
    this.displayCreate = false;
  }
}
