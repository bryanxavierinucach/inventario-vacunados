import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { IQuestionary } from 'app/shared/models/questionary.model';
import { QuestionaryDirected } from 'app/shared/enums/questionary-directed.enum';
import { QuestionaryType } from 'app/shared/enums/questionary-type.enum';
import { DIRECTED_PYME_SHOW, DIRECTED_TALENT_SHOW } from 'app/shared/constants/directed.constants';
import { TYPE_DIAGNOSIS_SHOW, TYPE_OPPORTUNITY_SHOW } from 'app/shared/constants/questionary-type.constants';

@Component({
  selector: 'ngx-questionary-detail',
  templateUrl: './questionary-detail.component.html',
  styleUrls: ['./questionary-detail.component.scss'],
})
export class QuestionaryDetailComponent implements OnInit {

  questionary: IQuestionary;
  questionaryDirected = QuestionaryDirected;
  questionaryType = QuestionaryType;
  DIRECTED_TALENT_SHOW = DIRECTED_TALENT_SHOW;
  DIRECTED_PYME_SHOW = DIRECTED_PYME_SHOW;
  TYPE_DIAGNOSIS_SHOW = TYPE_DIAGNOSIS_SHOW;
  TYPE_OPPORTUNITY_SHOW = TYPE_OPPORTUNITY_SHOW;

  constructor(protected activatedRoute: ActivatedRoute, private headerService: HeaderService,
    private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ questionary }) => (
      this.questionary = questionary
    ));
    this.headerService.setTitle(this.questionary.questionaryTitle);
  }

  onBack() {
    this.location.back();
  }

  getWithEnterDisplay(objective) {
    return objective.replace('\n', '<br><br>');
  }

}

