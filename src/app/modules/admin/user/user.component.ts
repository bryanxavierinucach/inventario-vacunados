import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { TITLE_ACHIEVEMENT_USER } from 'app/shared/constants/title-pages.contants';
import { IUserAchievement } from 'app/shared/models/userAchievement.model';
import { ModalSizeComponent } from 'app/shared/utils/classes/modal-size.component';
import { Location } from '@angular/common';
@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent extends ModalSizeComponent implements OnInit {
  displayCreate: boolean;
 userAchievement: IUserAchievement;
  constructor(private headerService: HeaderService, private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.headerService.setTitle(TITLE_ACHIEVEMENT_USER);
  }
  onCreate() {
    this.displayCreate = true;
  }

  onUpdate(data: IUserAchievement) {
    this.userAchievement = data;
    this.displayCreate = true;
  }

  onSuccess() {
    this.userAchievement = null;
    this.displayCreate = false;
  }

  onClose() {
    this.userAchievement = null;
    this.displayCreate = false;
  }
  onBack() {
    this.location.back();
  }
}
