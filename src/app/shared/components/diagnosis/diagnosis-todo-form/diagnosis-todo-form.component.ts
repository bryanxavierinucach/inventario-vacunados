import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { IQuestionary } from 'app/shared/models/questionary.model';
import { SectionService } from 'app/modules/admin/services/section.service';
import { QuestionControlService } from '../../../../modules/pyme/services/question-control.service';
import { FeedbackService } from 'app/shared/services/feedback.service';
import { SectionAnswerService } from 'app/shared/services/section-answer.service';
import { ToastService } from 'app/@core/services/toast.service';
import { QuestionaryMakeComponent } from 'app/shared/utils/classes/questionary-make.component';
import { QuestionaryService } from 'app/shared/services/questionary.service';

@Component({
  selector: 'ngx-diagnosis-todo-form',
  templateUrl: './diagnosis-todo-form.component.html',
  styleUrls: ['./diagnosis-todo-form.component.scss'],
  providers: [QuestionControlService],
})
export class DiagnosisTodoFormComponent extends QuestionaryMakeComponent implements OnInit {

  questionary: IQuestionary;
  nextQuestionary: boolean;
  enabledQuestionary: boolean;
  buttonsTexts: Array<string> = [];
  finished: boolean;

  constructor(protected activatedRoute: ActivatedRoute, private headerService: HeaderService,
    private location: Location, public sectionService: SectionService,
    public questionControlService: QuestionControlService, public feedbackService: FeedbackService,
    public sectionAnswerService: SectionAnswerService, public toastService: ToastService,
    public questionaryService: QuestionaryService, private router: Router) {
    super(sectionService, feedbackService, sectionAnswerService, questionControlService,
      toastService, questionaryService,
    );
    this.activatedRoute.data.subscribe(({ questionary }) => (this.questionary = questionary));
  }

  ngOnInit(): void {
    this.headerService.setTitle('Coeficiente Tx');
  }

  onBack() {
    this.location.back();
  }

  getWithEnterDisplay(objective) {
    return objective.replace('\n', '<br><br>');
  }

  toggle(event) {
    this.nextQuestionary = event;
  }

  async onEnabledQuestionary() {
    this.enabledQuestionary = true;
    await this.getSections(this.questionary.id);
  }

  onBackSection(i: number) {
    this.finished = false;
    if (i === 0) {
      this.enabledQuestionary = false;
      this.showSection = null;
      this.buildSections = [];
      this.nextQuestionary = false;
    } else {
      this.showSection = this.buildSections[i - 1];
    }
  }

}
