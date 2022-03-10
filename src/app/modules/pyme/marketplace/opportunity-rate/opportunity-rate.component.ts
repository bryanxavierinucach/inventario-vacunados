import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { IOpportunity } from 'app/shared/models/opportunity.model';
import { SectionService } from 'app/modules/admin/services/section.service';
import { SectionAnswerService } from 'app/shared/services/section-answer.service';
import { QuestionControlService } from '../../services/question-control.service';
import { IQuestionary } from 'app/shared/models/questionary.model';
import { ToastService } from 'app/@core/services/toast.service';
import { QuestionaryMakeComponent } from 'app/shared/utils/classes/questionary-make.component';
import { FeedbackService } from 'app/shared/services/feedback.service';
import { QuestionaryService } from 'app/shared/services/questionary.service';

@Component({
  selector: 'ngx-opportunity-rate',
  templateUrl: './opportunity-rate.component.html',
  styleUrls: ['./opportunity-rate.component.scss'],
  providers: [QuestionControlService],
})
export class OpportunityRateComponent extends QuestionaryMakeComponent implements OnInit {

  opportunity: IOpportunity;
  questionary: IQuestionary;


  constructor(private headerService: HeaderService, private activatedRoute: ActivatedRoute,
    private location: Location, public sectionService: SectionService,
    public sectionAnswerService: SectionAnswerService, public questionControlService: QuestionControlService,
    public toastService: ToastService, public feedbackService: FeedbackService,
    public questionaryService: QuestionaryService) {
    super(sectionService, feedbackService, sectionAnswerService, questionControlService,
      toastService, questionaryService,
    );
  }

  ngOnInit(): void {
    this.headerService.setTitle('Calificar talento');
    this.activatedRoute.data.subscribe(({ questionaryOpportunity }) => {
      this.opportunity = questionaryOpportunity.opportunity;
      this.questionary = questionaryOpportunity.questionary;
      this.getSections(this.questionary.id);
    });
  }

  onBack() {
    this.location.back();
  }



}
