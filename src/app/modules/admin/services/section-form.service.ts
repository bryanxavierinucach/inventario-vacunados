import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { QuestionaryType } from 'app/shared/enums/questionary-type.enum';
import { IFeedback } from 'app/shared/models/feedback.model';
import { IOption } from 'app/shared/models/option.model';
import { IQuestion } from 'app/shared/models/question.model';
import { ISection } from 'app/shared/models/section.model';

@Injectable({
  providedIn: 'root',
})
export class SectionFormService {

  constructor(private formBuilder: FormBuilder) { }

  getForm(type: QuestionaryType) {
    if (type === QuestionaryType.OPPORTUNITY) {
      return this.formBuilder.group({
        sectionName: [null, Validators.required],
        questions: new FormArray([this.getFormQuestion()]),
      });
    } else {
      return this.formBuilder.group({
        sectionName: [null, Validators.required],
        questions: new FormArray([this.getFormQuestion()]),
        feedbacks: new FormArray([this.getFormFeedback()]),
      });
    }
  }

  getFormWithData(type: QuestionaryType, section: ISection) {
    if (type === QuestionaryType.OPPORTUNITY) {
      return this.formBuilder.group({
        id: [section?.id],
        sectionName: [section.sectionName, Validators.required],
        questions: this.getFormQuestions(section.questions),
      });
    } else {
      return this.formBuilder.group({
        id: [section?.id],
        sectionName: [section.sectionName, Validators.required],
        questions: this.getFormQuestions(section.questions),
        feedbacks: this.getFormFeedbacks(section.feedbacks),
      });
    }
  }

  private getFormQuestions(questions: IQuestion[]) {
    const formQuestions: FormArray = new FormArray([]);
    questions.forEach(question => {
      formQuestions.push(this.getFormQuestion(question));
    });
    return formQuestions;
  }

  private getFormFeedbacks(feedbacks: IFeedback[]) {
    const formFeedbacks: FormArray = new FormArray([]);
    feedbacks.forEach(feedback => {
      formFeedbacks.push(this.getFormFeedback(feedback));
    });
    return formFeedbacks;
  }

  getFormQuestion(question?: IQuestion) {
    const formOptions: FormArray = new FormArray([]);
    if (question) {
      question.options.forEach(option => {
        formOptions.push(this.getFormOption(option));
      });
    } else {
      formOptions.push(this.getFormOption());
    }
    formOptions.updateValueAndValidity();
    return this.formBuilder.group({
      id: [question?.id],
      question: [question?.question, Validators.required],
      options: formOptions,
    });
  }

  getFormOption(option?: IOption) {
    return this.formBuilder.group({
      id: [option?.id],
      answer: [option?.answer, Validators.required],
      score: [option?.score, [Validators.required, Validators.min(1)]],
    });
  }

  getFormFeedback(feedback?: IFeedback) {
    return this.formBuilder.group({
      id: [feedback?.id],
      sectionId: [feedback?.sectionId],
      rangeMin: [feedback?.rangeMin, [Validators.required, Validators.min(1)]],
      rangeMax: [feedback?.rangeMax, [Validators.required, Validators.min(1)]],
      level: [feedback?.level, Validators.required],
      recommendation: [feedback?.recommendation, Validators.required],
    });
  }
}
