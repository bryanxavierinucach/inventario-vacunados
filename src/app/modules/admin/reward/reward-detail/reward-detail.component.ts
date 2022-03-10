import { Component, Input, OnInit } from '@angular/core';
import { IReward } from 'app/shared/models/reward.model';

@Component({
  selector: 'ngx-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss'],
})
export class RewardDetailComponent implements OnInit {

  @Input() reward: IReward;
  constructor() { }

  ngOnInit(): void {
  }

}
