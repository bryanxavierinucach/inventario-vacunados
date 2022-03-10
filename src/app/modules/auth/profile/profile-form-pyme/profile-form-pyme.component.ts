import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'app/@core/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { JwtTokenService } from '../../services';
import { PymeService } from 'app/modules/pyme/services/pyme.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-profile-form-pyme',
  templateUrl: './profile-form-pyme.component.html',
  styleUrls: ['./profile-form-pyme.component.scss'],
})
export class ProfileFormPymeComponent implements OnInit {
  loading = false;
  @Output() success = new EventEmitter<void>();
  @Input() displayProfileUser: boolean;
  @Output() closeModal = new EventEmitter<void>();
  @Input() dataProfile: any;
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Ecuador, CountryISO.Chile];
  avatarUser;
  imgUser = 'https://img2.freepng.es/20180402/vgw/kisspng-user-computer-icons-clip-art-administrator-5ac2ab0773a345.3567458115227072074737.jpg';
  public files: any = [];
  public viewImage;
  public formData: FormGroup;
  public isLoaded: boolean;
  talentKeycloak: SelectItemGroup[] = [];
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  public pais: any = [];
  public sectorEconomic: any = [
    { name: 'Pesca' },
    { name: 'Explotación de minas y canteras' },
    { name: 'Secundario (Industrial)' },
    { name: 'Industrias manufactureras no metálicas' },
    { name: 'Industrias manufactureras metálicas' },
    { name: 'Suministro de electricidad' },
    { name: 'Construción Terciario (Servicios)' },
    { name: 'Comercio al por mayor y menor' },
    { name: 'Trasporte' },
    { name: 'Intermediación financiera' },
    { name: 'Act. inmobiliarias' },
    { name: 'Adm. pública y defensa' },
    { name: 'Servicios sociales y de salud' },
    { name: 'Otras actividades de servicios' },
    { name: 'Consejo de adm. de edificios y condominios' },
    { name: 'Organizaciones y órganos extraterritoriales ' },
  ];
  public userId: string;
  constructor(private pymeService: PymeService,
    private router: Router,
    private toast: ToastService,
    private _activatedRoute: ActivatedRoute,
    private jwtTokenService: JwtTokenService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initRegForm();
    this.getAllCountries();
  }
  initRegForm() {
    this.avatarUser = 'data:image/jpg;base64,' + this.dataProfile?.user.avatar;
    if (this.dataProfile?.user.avatar === null || this.dataProfile?.user.avatar === undefined) {
      this.avatarUser = this.imgUser;
    }

    this.formData = this.fb.group({
      avatar: new FormControl(''),
      userId: [this.dataProfile?.userId],
      country: [this.dataProfile?.country, Validators.required],
      city: [this.dataProfile?.city, Validators.required],
      economicSector: [this.dataProfile?.economicSector],
      linkedin: [this.dataProfile?.linkedin],
      instagram: [this.dataProfile?.instagram],
      website: [this.dataProfile?.website],
      telephone: [this.dataProfile?.telephone],
      summary: [this.dataProfile?.summary, Validators.required],
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
  public Register() {
    const formularioData = new FormData();
    if (this.files) {
      this.files.forEach(element => {
        formularioData.append('avatar', element);
      });
    }
    formularioData.append('avatar', this.dataProfile?.user.avatar);
    formularioData.append('country', this.formData.value.country);
    formularioData.append('city', this.formData.value.city);
    formularioData.append('economicSector', this.formData.value.economicSector);
    formularioData.append('linkedin', this.formData.value.linkedin);
    formularioData.append('instagram', this.formData.value.instagram);
    formularioData.append('website', this.formData.value.website);
    formularioData.append('telephone', this.formData.value.telephone);
    formularioData.append('summary', this.formData.value.summary);
    if (formularioData != null)
      this.loading = true;

      this.pymeService.updateProfile(formularioData, this.dataProfile?.user.id).subscribe(res => {
        this.toast.showSuccess('Exitoso', res['message']);
        this.loading = true;
        this.success.emit();
        window.location.reload();
      }, (err => {
        this.loading = false;
        if (err.error.message)
          this.toast.showWarning('Atención', err.error.message);
        else
          this.toast.showWarning('Atención', 'No se pudo actualizar');
      }));

  }
  getAllCountries() {
    this.pymeService.getCountries().subscribe(res => {
      this.pais = res;

    });
  }
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.Ecuador, CountryISO.Chile];
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
  onClose() {
    this.closeModal.emit();
    this.displayProfileUser = false;
  }

}
