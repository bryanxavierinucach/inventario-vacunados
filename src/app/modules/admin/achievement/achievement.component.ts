import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { TITLE_ACHIEVEMENT } from 'app/shared/constants/title-pages.contants';
import { IAchievement } from 'app/shared/models/achievement.model';
import { ModalSizeComponent } from 'app/shared/utils/classes/modal-size.component';
import { AchievementListComponent } from './achievement-list/achievement-list.component';

@Component({
  selector: 'ngx-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss'],
})
export class AchievementComponent extends ModalSizeComponent implements OnInit {
  displayCreate: boolean;
  achievement: IAchievement;

  @ViewChild(AchievementListComponent) achievementList;

  constructor(private headerService: HeaderService) {
    super();
    }

  ngOnInit(): void {

    this.headerService.setTitle(TITLE_ACHIEVEMENT);
  }

  onCreate() {
    this.displayCreate = true;
  }

  onUpdate(data: IAchievement) {
    this.achievement = data;
    this.displayCreate = true;
  }

  onSuccess() {
    this.achievement = null;
    this.displayCreate = false;
    this.achievementList.loadData();
  }

  onClose() {
    this.achievement = null;
    this.displayCreate = false;
  }

}
