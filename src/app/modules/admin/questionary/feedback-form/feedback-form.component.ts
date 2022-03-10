import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { SectionFormService } from '../../services/section-form.service';

@Component({
  selector: 'ngx-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit {

  @Input() formFeedback: FormGroup;
  constructor(private sectionFormService: SectionFormService) {
  }

  ngOnInit(): void {
  }

  onAdd(form: FormArray) {
    form.push(this.sectionFormService.getFormFeedback());
    form.updateValueAndValidity();
  }

  onSetValidator(event) {
    this.formFeedback.controls['rangeMax'].setValidators([Validators.required, Validators.min(event + 1)]);
  }

}

