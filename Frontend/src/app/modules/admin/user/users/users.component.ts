import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from 'app/@theme/components/header/header.service'; import { TITLE_USER } from 'app/shared/constants/title-pages.contants';

import { ModalSizeComponent } from 'app/shared/utils/classes/modal-size.component';
import { IUser } from 'app/shared/models/user.model';
import { UserListComponent } from '../user-list/user-list.component';
@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent extends ModalSizeComponent implements OnInit {
  displayCreate: boolean;
  user: IUser;
  @ViewChild(UserListComponent) userList;

  constructor(private headerService: HeaderService) {
    super();
  }

  ngOnInit(): void {
    this.headerService.setTitle(TITLE_USER);

  }
  onCreate() {
    this.displayCreate = true;
  }

  onUpdate(data: IUser) {
    this.user = data;
    this.displayCreate = true;
  }

  onSuccess() {
    this.user = null;
    this.displayCreate = false;
    this.userList.loadData();
  }

  onClose() {
    this.user = null;
    this.displayCreate = false;
  }

}
