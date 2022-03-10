import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ToastService } from 'app/@core/services/toast.service';
import { OptionService } from '../../services/option.service';
import { SectionFormService } from '../../services/section-form.service';

@Component({
  selector: 'ngx-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {


  @Input() formQuestion: FormGroup;
  constructor(private sectionFormService: SectionFormService, private optionService: OptionService,
    private toastService: ToastService) {


  }

  ngOnInit(): void {
  }

  onAdd(form: any) {
    form.push(this.sectionFormService.getFormOption());
    form.updateValueAndValidity();
  }

  onDeleteOption(form: FormArray, i: number) {
    if (form.controls[i].value.id) {
      this.optionService.delete(form.controls[i].value.id).subscribe(res => {
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

}
