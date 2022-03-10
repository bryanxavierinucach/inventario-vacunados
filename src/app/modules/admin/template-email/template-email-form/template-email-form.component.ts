import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'app/@core/services/toast.service';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { ITemplateEmail } from 'app/shared/models/template-email.model';
import { TemplateEmailService } from 'app/shared/services/template-email.service';

@Component({
  selector: 'ngx-template-email-form',
  templateUrl: './template-email-form.component.html',
  styleUrls: ['./template-email-form.component.scss'],
})
export class TemplateEmailFormComponent implements OnInit {

  formTemplate: FormGroup;
  loading: boolean;
  templateEmail: ITemplateEmail;

  constructor(private formBuilder: FormBuilder,
    private templateEmailService: TemplateEmailService, private toastService: ToastService,
    private headerService: HeaderService, protected activatedRoute: ActivatedRoute,
    protected location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ templateEmail }) => (
      this.templateEmail = templateEmail
    ));
    this.formTemplate = this.formBuilder.group({
      code: [this.templateEmail?.code, Validators.required],
      description: [this.templateEmail?.description, Validators.required],
      templateHtml: [this.templateEmail?.templateHtml, Validators.required],
    });
    if (this.templateEmail) {
      this.headerService.setTitle('Editar Plantilla');
    } else {
      this.headerService.setTitle('Nuevo Plantilla');
    }
  }

  onBack() {
    this.location.back();
  }

  onClose() {
    this.formTemplate.reset();
    this.onBack();
  }

  save() {
    if (this.formTemplate.valid) {
      this.loading = true;
      if (!this.templateEmail) {
        this.templateEmailService.create(this.formTemplate.value).subscribe(res => {
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
        this.templateEmailService.update(this.formTemplate.value, this.templateEmail.id).subscribe(res => {
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
}
