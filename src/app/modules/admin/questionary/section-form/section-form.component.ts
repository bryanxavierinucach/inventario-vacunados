import { Component, Input, OnChanges } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ToastService } from 'app/@core/services/toast.service';
import { QuestionaryType } from 'app/shared/enums/questionary-type.enum';
import { ISectionBuild } from 'app/shared/models/section-build.model';
import { FeedbackService } from 'app/shared/services/feedback.service';
import { QuestionService } from '../../services/question.service';
import { SectionFormService } from '../../services/section-form.service';
import { SectionService } from '../../services/section.service';

@Component({
  selector: 'ngx-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss'],
})
export class SectionFormComponent implements OnChanges {


  @Input() sectionsBuild: ISectionBuild[];
  @Input() type: QuestionaryType;

  questionaryType = QuestionaryType;

  constructor(private sectionFormService: SectionFormService, private sectionService: SectionService,
    private toastService: ToastService, private feedbackService: FeedbackService,
    private questionService: QuestionService) { }

  ngOnChanges() {
  }

  add() {
    this.sectionsBuild.push({ form: this.sectionFormService.getForm(this.type) });
  }

  onAddQuestion(form: FormArray) {
    form.push(this.sectionFormService.getFormQuestion());
    form.updateValueAndValidity();
  }

  onDeleteQuestion(form: FormArray, i: number) {
    if (form.controls[i].value.id) {
      this.questionService.delete(form.controls[i].value.id).subscribe(res => {
        form.removeAt(i);
        form.updateValueAndValidity();
      }, err => {
        this.toastService.showWarning('Atención', 'No se puede eliminar');
      });
    } else {
      form.removeAt(i);
      form.updateValueAndValidity();
    }
  }

  onDeleteFeed(form: FormArray, i: number) {
    if (form.controls[i].value.id) {
      this.feedbackService.delete(form.controls[i].value.id).subscribe(res => {
        form.removeAt(i);
        form.updateValueAndValidity();
      }, err => {
        this.toastService.showWarning('Atención', 'No se puede eliminar');
      });
    } else {
      form.removeAt(i);
      form.updateValueAndValidity();
    }
  }

  onDeleteSection(sectionsBuild: ISectionBuild[], i: number) {
    if (sectionsBuild[i].form.value.id) {
      this.sectionService.delete(sectionsBuild[i].form.value.id).subscribe(res => {
        sectionsBuild.splice(i, 1);
      }, err => {
        this.toastService.showWarning('Atención', 'No se puede eliminar');
      });
    } else {
      sectionsBuild.splice(i, 1);
    }
  }

  onAddFeedback(form: FormArray) {
    form.push(this.sectionFormService.getFormFeedback());
    form.updateValueAndValidity();
  }
}
