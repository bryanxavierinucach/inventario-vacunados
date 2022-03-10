import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionaryService } from '../../../../shared/services/questionary.service';
import { ToastService } from 'app/@core/services/toast.service';
import { IQuestionary } from 'app/shared/models/questionary.model';
import { QuestionaryDirected } from 'app/shared/enums/questionary-directed.enum';
import { QuestionaryType } from 'app/shared/enums/questionary-type.enum';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { ISection } from 'app/shared/models/section.model';
import { ISectionBuild } from 'app/shared/models/section-build.model';
import { SectionFormService } from '../../services/section-form.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-questionary-form',
  templateUrl: './questionary-form.component.html',
  styleUrls: ['./questionary-form.component.scss'],
})
export class QuestionaryFormComponent implements OnInit {

  formQuestionary: FormGroup;
  loading: boolean;
  questionaryDirected = QuestionaryDirected;
  questionaryType = QuestionaryType;
  sections: ISection[] = [];
  sectionsBuild: ISectionBuild[] = [];
  questionary: IQuestionary;

  @Output() success = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private location: Location,
    private questionaryService: QuestionaryService, private toastService: ToastService,
    private headerService: HeaderService, private sectionFormService: SectionFormService,
    protected activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ questionary }) => (
      this.questionary = questionary
    ));
    this.formQuestionary = this.formBuilder.group({
      questionaryTitle: [this.questionary?.questionaryTitle, Validators.required],
      objective: [this.questionary?.objective, Validators.required],
      directed: [this.questionary?.directed, Validators.required],
      type: [this.questionary?.type, Validators.required],
    });
    if (this.questionary) {
      this.headerService.setTitle('Editar Cuestionario');
      this.createForm(this.questionary.sections);
    } else {
      this.headerService.setTitle('Nuevo Cuestionario');
    }
  }

  onBack() {
    this.location.back();
  }

  onClose() {
    this.formQuestionary.reset();
    this.onBack();
  }

  onChangeType(type) {
    this.sectionsBuild = [{ form: this.sectionFormService.getForm(type) }];
  }

  save() {
    const data = { questionary: this.formQuestionary.value, sections: this.getDataSections(this.sectionsBuild) };
    if (this.formQuestionary.valid) {
      this.loading = true;
      if (!this.questionary) {
        this.questionaryService.create(data).subscribe(res => {
          this.loading = false;
          this.toastService.showSuccess('Exitoso', res['message']);
          this.loading = false;
          this.onClose();
        }, err => {
          this.loading = false;
          if (err.error.message)
            this.toastService.showWarning('Atención', err.error.message);
          else
            this.toastService.showWarning('Atención', 'No se pudo ingresar');
        });
      } else {
        this.questionaryService.update(data, this.questionary.id).subscribe(res => {
          this.loading = false;
          this.toastService.showSuccess('Exitoso', res['message']);
          this.loading = false;
          this.onClose();
        }, err => {
          this.loading = false;
          if (err.error.message)
            this.toastService.showWarning('Atención', err.error.message);
          else
            this.toastService.showWarning('Atención', 'No se pudo actualizar');
        });
      }
    }
  }

  private getDataSections(sectionsBuild: ISectionBuild[]) {
    const sectionData: ISection[] = [];
    sectionsBuild.forEach(sectionForm => {
      sectionData.push(sectionForm.form.value);
    });
    return sectionData;
  }

  invalidForm() {
    let invalid = false;
    // Cuando se va actualizar
    if (this.sectionsBuild.length === 0 && this.questionary) {
      this.sectionsBuild = [{ form: this.sectionFormService.getForm(this.questionary.type) }];
      return true;
    }
    this.sectionsBuild.forEach(sectionForm => {
      if (sectionForm.form.invalid) {
        invalid = true;
        return true;
      }
    });
    return invalid;
  }

  createForm(sections: ISection[]) {
    sections.forEach(section => {
      const form = this.sectionFormService.getFormWithData(this.formQuestionary.value['type'], section);
      this.sectionsBuild.push({ form: form });
    });
  }
}
