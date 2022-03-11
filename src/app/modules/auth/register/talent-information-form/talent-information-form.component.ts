import { Component, OnInit } from '@angular/core';
import { ToastService } from 'app/@core/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { JwtTokenService } from '../../services';
import { TalentService } from 'app/modules/empleado/services/talent.service';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'ngx-talent-information-form',
  templateUrl: './talent-information-form.component.html',
  styleUrls: ['./talent-information-form.component.scss'],
})
export class TalentInformationFormComponent implements OnInit {
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.Ecuador, CountryISO.Chile];

  public formData: FormGroup;
  public isLoaded: boolean;
  talentKeycloak: SelectItemGroup[] = [];
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  public pais: any = [];
  public talents: any = [];
  public loading: boolean;
  options = [];
  selected = [];
  public userId: string;

  constructor(private talentService: TalentService,
    private router: Router,
    private toast: ToastService,
    private _activatedRoute: ActivatedRoute,
    private jwtTokenService: JwtTokenService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initRegForm();
    this.getAllCountries();
    this.getAllTalents();
  }

  onChange(checked, item) {
    if (checked) {
      this.selected.push({ 'categoryId': item });
    } else {
      this.selected.splice(this.selected.indexOf(item), 1);
    }
  }

  initRegForm() {
    this._activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.formData = this.fb.group({
        userId: new FormControl(this.userId),
        country: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        city: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        linkedin: new FormControl('', [Validators.maxLength(100)]),
        instagram: new FormControl('', [Validators.maxLength(100)]),
        telephone: new FormControl(''),
        website: new FormControl('', [Validators.maxLength(50)]),
        github: new FormControl(''),
        summary: new FormControl(''),
        Category: new FormControl(this.selected),
      });
    });
  }

  public Register() {

    this.loading = true;
    try {
      if (this.formData != null) {
        this.talentService.saveTalent(this.formData.value).subscribe(res => {
          this.loading = true;
          this.toast.showPrimary('Correcto', 'Solo falta un paso para tu seguridad. Anda a tu bandeja de entrada y VERIFICA TU correo electrónico');
          this.loading = false;
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
    this.talentService.getCountries().subscribe(res => {
      this.pais = res;
    });
  }
  getAllTalents() {
    this.talentService.getCategories().subscribe(res => {
      this.talents = res;
      // console.log(res);
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

  checked(item) {
    if (this.selected.indexOf(item) !== -1) {
      return true;
    }
  }
  // when checkbox change, add/remove the item from the array
}
