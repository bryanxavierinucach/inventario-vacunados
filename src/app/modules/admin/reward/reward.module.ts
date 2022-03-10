import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardRoutingModule } from './reward-routing.module';
import { RewardComponent } from './reward.component';
import { PagesModule } from 'app/modules/pages.module';
import { RewardFormComponent } from './reward-form/reward-form.component';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { RewardListComponent } from './reward-list/reward-list.component';
import { RewardDetailComponent } from './reward-detail/reward-detail.component';


@NgModule({
  declarations: [RewardComponent, RewardFormComponent, RewardListComponent, RewardDetailComponent],
  imports: [
    CommonModule,
    RewardRoutingModule,
    PagesModule,
    PaginatorModule,
    DialogModule,
  ],
})
export class RewardModule { }
