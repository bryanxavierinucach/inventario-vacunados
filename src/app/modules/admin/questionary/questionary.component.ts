import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { TITLE_QUESTIONARY } from 'app/shared/constants/title-pages.contants';
import { IQuestionary } from 'app/shared/models/questionary.model';
import { ModalSizeComponent } from 'app/shared/utils/classes/modal-size.component';
import { QuestionaryListComponent } from './questionary-list/questionary-list.component';

@Component({
  selector: 'ngx-questionary',
  templateUrl: './questionary.component.html',
  styleUrls: ['./questionary.component.scss'],
})
export class QuestionaryComponent extends ModalSizeComponent implements OnInit {

  displayCreate: boolean;
  questionary: IQuestionary;

  @ViewChild(QuestionaryListComponent) questionaryList;
  constructor(private headerService: HeaderService) {
    super();
  }

  ngOnInit(): void {
    this.headerService.setTitle(TITLE_QUESTIONARY);
  }

  onCreate() {
    this.displayCreate = true;
  }

  onUpdate(data: IQuestionary) {
    this.questionary = data;
    this.displayCreate = true;
  }

  onSuccess() {
    this.questionary = null;
    this.displayCreate = false;
    this.questionaryList.loadData();
  }

  onClose() {
    this.questionary = null;
    this.displayCreate = false;
  }
}
