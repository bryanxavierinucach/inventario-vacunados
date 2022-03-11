import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'app/modules/auth/services';
import { Router } from '@angular/router';
import { ToastService } from 'app/@core/services/toast.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ROLE_ADMIN, ROLE_PYME, ROLE_TALENT } from 'app/shared/constants/roles.constants';
import { IUser } from 'app/shared/models/user.model';
import { ModalSizeComponent } from 'app/shared/utils/classes/modal-size.component';

@Component({
  selector: 'ngx-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent extends ModalSizeComponent implements OnInit {
  user: IUser;

  formRole: FormGroup;
  public formData: FormGroup;
  public isLoaded: boolean;
  formEmail: FormGroup;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  public showLoading: boolean = false;
  showPassword = false;
  validatedUser = false;
  public loading: boolean;
  loadingSend = false;
  sendEmail = false;
  public files: any = [];
  public viewImage;
  noRole = false;
  displayWallet = false;

  Arrow = 'https://img2.freepng.es/20180402/vgw/kisspng-user-computer-icons-clip-art-administrator-5ac2ab0773a345.3567458115227072074737.jpg';
  constructor(private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer) {
      super();
    }

  ngOnInit(): void {
    this.initRegForm();
  }

  initRegForm() {
    this.formData = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      role: new FormControl('', [Validators.required]),
      // confirmPassword: new FormControl('', [Validators.required]),
      userType: new FormControl(0),
      walletAddress: new FormControl(''),
      maturity: new FormControl(''),
      avatar: new FormControl(''),
      // confirmPassword: ['', [Validators.required]],
    });
  }
  cambiarImg(event): any {
    const newFile = event.target.files[0];
    if (newFile.size > 5000000) {
      this.toast.showError('Error', 'El archivo es muy grande.');
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
  Register(): any {
    this.loading = true;
    try {
      const formularioDeDatos = new FormData();
      this.files.forEach(element => {
        formularioDeDatos.append('avatar', element);
      });
      formularioDeDatos.append('username', this.formData.value.username);
      formularioDeDatos.append('firstName', this.formData.value.firstName);
      formularioDeDatos.append('lastName', this.formData.value.lastName);
      formularioDeDatos.append('email', this.formData.value.email);
      formularioDeDatos.append('password', this.formData.value.password);
      formularioDeDatos.append('role', this.formData.value.role);
      if (formularioDeDatos != null) {
        this.authService.register(formularioDeDatos).subscribe(res => {
          this.loading = false;
          const id = res['users'].id;
          if (this.formData.value.role === 'users')
            this.router.navigate(['/auth/register/talent/' + id]);
          if (this.formData.value.role === 'pyme')
            this.router.navigate(['/auth/register/pyme/' + id]);
          this.loading = true;

        }, err => {
          this.loading = false;
          if (err.status === 500) {
            this.toast.showError('Error', err.error.message);
            this.loading = false;
          }

        });
      } else {
        this.toast.showWarning('Advertencia', 'Los datos del formulario no son validos');
        this.loading = false;
        return;
      }
    } catch (e) {
      this.toast.showError('ERROR', e);
      this.loading = false;

    }
  }

  urlLinkedin() {
    this.authService.linkedin().subscribe(res => {

    });
  }
  goPage() {
    this.loading = false;
    const isAdmin = this.authService.isExistRole(ROLE_ADMIN);
    const isPyme = this.authService.isExistRole(ROLE_PYME);
    const isTalent = this.authService.isExistRole(ROLE_TALENT);
    if (isAdmin)
      this.router.navigate(['/app/admin/dashboard']);
    if (isTalent)
      this.router.navigate(['/app/talent/dashboard']);
    if (isPyme)
      this.router.navigate(['/app/pyme/dashboard']);
  }
  // Guarda tokens y verifica wallet
  // saveAndValidate(data) {
  //   localStorage.clear();
  //   localStorage.setItem('access_token', data.access_token);
  //   localStorage.setItem('refresh_token', data.refresh_token);
  //   const idUser = this.authService.getUserIdLogin();
  //   const isPyme = this.authService.isExistRole(ROLE_PYME);
  //   const isTalent = this.authService.isExistRole(ROLE_TALENT);
  //   if (isPyme || isTalent) {
  //     this.walletService.getUserById(idUser).subscribe(res => {
  //       this.user = res;
  //       if (this.user.walletAddress) {
  //       } else
  //         this.displayWallet = true;
  //     }, (err) => {
  //       this.goPage();
  //     });
  //   } else {
  //     this.goPage();
  //   }
  // }

  saveAndValidate(data) {
    localStorage.clear();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    const idUser = this.authService.getUserIdLogin();
    const isPyme = this.authService.isExistRole(ROLE_PYME);
    const isTalent = this.authService.isExistRole(ROLE_TALENT);
    this.goPage();
    // if (isPyme || isTalent) {
    //   this.walletService.getUserById(idUser).subscribe(res => {
    //     this.user = res;
    //     if (this.user?.walletAddress) {
    //       this.goPage();
    //     } else
    //       this.displayWallet = false;
    //   }, (err) => {
    //     this.goPage();
    //   });
    // } else {

    // }
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

  onClose() {
    this.validatedUser = false;
  }


  onSuccessWallet() {
    this.displayWallet = false;
    this.goPage();
  }
  onCloseWallet() {
    this.goPage();
    this.displayWallet = false;
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
    this.showPassword = !this.showPassword;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
}
