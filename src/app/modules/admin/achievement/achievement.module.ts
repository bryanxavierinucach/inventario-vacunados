import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AchievementRoutingModule } from './achievement-routing.module';
import { AchievementListComponent } from './achievement-list/achievement-list.component';
import { AchievementFormComponent } from './achievement-form/achievement-form.component';
import { PagesModule } from 'app/modules/pages.module';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { AchievementComponent } from './achievement.component';

@NgModule({
  declarations: [AchievementListComponent,
    AchievementFormComponent,
    AchievementComponent,
  ],
  imports: [
    CommonModule,
    AchievementRoutingModule,
    PagesModule,
    PaginatorModule,
    DialogModule,
    CarouselModule,
  ],
})
export class AchievementModule { }
