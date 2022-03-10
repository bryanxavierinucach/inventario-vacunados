import { Component, OnInit } from '@angular/core';
import { ToastService } from 'app/@core/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { JwtTokenService } from '../../services';
import { PymeService } from 'app/modules/pyme/services/pyme.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
@Component({
  selector: 'ngx-pyme-information-form',
  templateUrl: './pyme-information-form.component.html',
  styleUrls: ['./pyme-information-form.component.scss'],
})
export class PymeInformationFormComponent implements OnInit {
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Ecuador, CountryISO.Chile];
  public loading: boolean;

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
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initRegForm();
    this.getAllCountries();
  }
  initRegForm() {
    this._activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.formData = this.fb.group({
        userId: new FormControl(this.userId),
        country: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        city: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        economicSector: new FormControl('', [Validators.required, Validators.maxLength(200)]),
        linkedin: new FormControl('', [Validators.maxLength(100)]),
        instagram: new FormControl('', [Validators.maxLength(100)]),
        website: new FormControl('', [Validators.maxLength(100)]),
        telephone: new FormControl('', [Validators.maxLength(10)]),
        summary: new FormControl(''),
      });
    });
  }

  public Register() {
    this.loading = true;
    try {
      if (this.formData != null) {
        this.pymeService.save(this.formData.value).subscribe(() => {
          this.loading = true;
          this.toast.showPrimary('Correcto', 'Solo falta un paso para tu seguridad. Anda a tu bandeja de entrada y VERIFICA TU correo electrónico');
          this.loading = true;
        }, err => {
          if (err.status === 400)
            this.toast.showError('Error', 'Form Incorrecto');
        });
        this.router.navigate(['/auth']);

      } else {
        this.toast.showWarning('Advertencia', 'Los datos del formulario no son validos');
        return;
      }
    } catch (e) {
      this.toast.showError('ERROR', e);
      this.loading = false;
    }

  }

  getAllCountries() {
    this.pymeService.getCountries().subscribe(res => {
      this.pais = res;

    });
  }
  // getAllTalents() {
  //   this.pymeService.getSectorEconomic().subscribe(res => {
  //     this.sectorEconomic = res['subGroups'];
  //   });
  // }

  changePreferredCountries() {
    this.preferredCountries = [CountryISO.Ecuador, CountryISO.Chile];
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
}
