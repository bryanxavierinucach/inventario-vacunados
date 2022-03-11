import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ToastService } from 'app/@core/services/toast.service';
import { AuthService } from 'app/modules/auth/services';
import { IUser } from 'app/shared/models/user.model';

@Component({
  selector: 'ngx-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  update = false;
  public viewImage;
  public formUser: FormGroup;
  loading: boolean;
  public files: any = [];
  showPassword = false;
  idUserkey: string;
  @Input() user: IUser;
  @Input() displayCreate: boolean;
  @Output() success = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();
  constructor(private userService: AuthService,
    private formBuilder: FormBuilder,
    public toastService: ToastService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router) { }


  ngOnInit(): void {

    this.idUserkey = this.user?.id;
    this.formUser = this.formBuilder.group({
      username: [this.user?.username, [Validators.maxLength(10), Validators.required]],
      firstName: [this.user?.firstName, [Validators.maxLength(50), Validators.required]],
      lastName: [this.user?.lastName, [Validators.maxLength(50), Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.maxLength(50), Validators.email]],
      password: [this.user?.password, Validators.required]
    });
  }

  cambiarImg(event): any {
    const newFile = event.target.files[0];
    if (newFile.size > 5000000) {
      this.toastService.showError('Error', 'El archivo es muy grande.');
    } else {
      const prubase64image = this.extraerBase64(newFile).then((imagen: any) => {
        this.viewImage = imagen.base;
      });
    }
    this.files.push(newFile);
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result,
        });
      };
      reader.onerror = error => {
        resolve({
          base: null,
        });
      };

    } catch (e) {
      return null;
    }
  })

  save() {
    if (this.formUser.valid) {
      this.loading = true;
      if (!this.user) {

        const formularioDeDatos = new FormData();
        formularioDeDatos.append('cedula', this.formUser.value.username);
        formularioDeDatos.append('firstName', this.formUser.value.firstName);
        formularioDeDatos.append('lastName', this.formUser.value.lastName);
        formularioDeDatos.append('email', this.formUser.value.email);
        formularioDeDatos.append('password', this.formUser.value.password);
        if (formularioDeDatos != null) {
          this.authService.register(formularioDeDatos).subscribe(res => {
            this.loading = false;
            this.toastService.showSuccess('Exitoso', res['message']);
            this.loading = false;
            this.formUser.reset();
            this.success.emit();
          }, (err => {
            this.loading = false;
            if (err.error.message)
              this.toastService.showWarning('Atención', err.error.message);
          }));
        }

      } else {
        const formularioData = new FormData();
        formularioData.append('cedula', this.formUser.value.username);
        formularioData.append('firstName', this.formUser.value.firstName);
        formularioData.append('lastName', this.formUser.value.lastName);
        formularioData.append('email', this.formUser.value.email);
        if (formularioData != null)
          this.userService.updateUserKeycloak(formularioData, this.user.id).subscribe(res => {
            this.loading = false;
            this.toastService.showSuccess('Exitoso', res['message']);
            this.loading = false;
            this.formUser.reset();
            this.success.emit();
          }, (err => {
            this.loading = false;
            if (err.error.message)
              this.toastService.showWarning('Atención', err.error.message);
            else
              this.toastService.showWarning('Atención', 'No se pudo actualizar');
          }));
      }
    }
  }

  onClosed() {
    this.clean();
    this.closeModal.emit();
  }

  clean() {
    this.formUser.markAsPristine();
    this.formUser.markAsUntouched();
    this.formUser.updateValueAndValidity();
    this.formUser.reset();
  }
  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
