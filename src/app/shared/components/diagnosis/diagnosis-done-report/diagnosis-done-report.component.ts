import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ISectionAnswer } from 'app/shared/models/section-answer.model';
import { HeaderService } from 'app/@theme/components/header/header.service';

@Component({
  selector: 'ngx-diagnosis-done-report',
  templateUrl: './diagnosis-done-report.component.html',
  styleUrls: ['./diagnosis-done-report.component.scss'],
})
export class DiagnosisDoneReportComponent implements OnInit {

  sectionAnswerReport: ISectionAnswer[];
  loadingData: boolean;

  constructor(private location: Location, private activatedRoute: ActivatedRoute,
    private headerService: HeaderService) {
    this.activatedRoute.data.subscribe(({ sectionAnswerReport }) => (
      this.sectionAnswerReport = sectionAnswerReport));
  }

  ngOnInit(): void {
    if (this.sectionAnswerReport[0]?.section.questionary.questionaryTitle)
      this.headerService.setTitle(this.sectionAnswerReport[0]?.section.questionary.questionaryTitle);
  }

  getWithEnterDisplay(text) {
    return text.replace('\n', '<br><br>');
  }
}
