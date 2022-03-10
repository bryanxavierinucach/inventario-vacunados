import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'app/@core/services/toast.service';
import { AuthService, JwtTokenService } from '../../services';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {


  public formData: FormGroup;
  public isLoaded: boolean;
  registrationForm: FormGroup;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  public updateToken: any = null;
  public uri = window.location.href;
  public userid: string;
  public modal: any;
  public description: string = '';
  public mail: string = '';
  public title: string;
  loading = false;

  constructor(

    private dialogService: NbDialogService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private _activatedRoute: ActivatedRoute,
    private jwtTokenService: JwtTokenService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initRegForm();

  }

  initRegForm() {

    if (this.uri.includes('token')) {
      const token = (this.uri.split('token=')[1]).split('&id=')[0];
      this.userid = this.uri.split('&id=')[1];
      this.updateToken = token;

      this.formData = this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      });
    } else {
      this.formData = this.fb.group({
        username: ['', Validators.required],
      });
    }
  }

  public ResetPassword() {
    if (this.updateToken === null) {
      if (this.formData.valid) {
        this.loading = true;
        this.authService.changePassword(this.formData.value, this.formData.value.username).subscribe((res) => {
          this.description = res['message'];
          this.mail = res['mail'];
          this.loading = false;
          this.dialogService.open(this.modal);
          this.loading = false;

          // localStorage.clear();
          // this.toast.showSuccess('Correcto', 'Se ha enviado el email. Revise su bandeja de entrada.');

        }, err => {
          this.toast.showError('Error', err.error.message);
          this.loading = false;

        });
      }
    } else {
      this.formData.value.userid = false;
      this.loading = true;

      this.authService.changePassword(this.formData.value, this.userid).subscribe(() => {
        this.loading = false;
        this.router.navigate(['/auth']);
        this.toast.showSuccess('Correcto', 'Se ha cambiado la contraseña correctamente');

      }, err => {
        this.loading = false;

        this.toast.showError('Error', err.error.message);
      });
    }
  }

  open(dialog: TemplateRef<any>) {
    this.modal = dialog;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

}
