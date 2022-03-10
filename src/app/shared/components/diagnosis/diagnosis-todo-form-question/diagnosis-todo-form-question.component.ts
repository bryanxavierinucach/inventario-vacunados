import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBuild } from 'app/shared/models/question-build.model';

@Component({
  selector: 'ngx-diagnosis-todo-form-question',
  templateUrl: './diagnosis-todo-form-question.component.html',
  styleUrls: ['./diagnosis-todo-form-question.component.scss'],
})
export class DiagnosisTodoFormQuestionComponent implements OnInit {

  @Input() question: QuestionBuild<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
  constructor() { }

  ngOnInit(): void {
  }

}
