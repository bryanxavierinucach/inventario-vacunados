import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'app/@core/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { JwtTokenService } from '../../services';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { DomSanitizer } from '@angular/platform-browser';
import { TalentService } from '../../../empleado/services/talent.service';
import { AuthService } from '../../services/auth.service';

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
  constructor(
    private talentService: TalentService,
    private authService: AuthService,
    private toast: ToastService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initRegForm();
  }
  initRegForm() {
    this.formData = this.fb.group({
      fechaNacimiento: [this.dataProfile?.fechaNacimiento],
      domicilio: [this.dataProfile?.domicilio, Validators.required],
      telefono: [this.dataProfile?.telefono],
      estadoVacunacion: [this.dataProfile?.estadoVacunacion],
      tipoVacuna: [this.dataProfile?.tipoVacuna],
      fechaVacunacion: [this.dataProfile?.fechaVacunacion],
      nroDocis: [this.dataProfile?.nroDocis],
    });

  }

  public Register() {
    const decodeToken = this.authService.decodeToken();
    const user = decodeToken['sub'];
    const formularioData = new FormData();
    formularioData.append('userId', user);
    formularioData.append('fechaNacimiento', this.formData.value.fechaNacimiento);
    formularioData.append('domicilio', this.formData.value.domicilio);
    formularioData.append('telefono', this.formData.value.telefono);
    formularioData.append('estadoVacunacion', this.formData.value.estadoVacunacion);
    formularioData.append('tipoVacuna', this.formData.value.tipoVacuna);
    formularioData.append('fechaVacunacion', this.formData.value.fechaVacunacion);
    formularioData.append('nroDocis', this.formData.value.nroDocis);
    if (formularioData != null) {
      this.talentService.saveEmpleado(formularioData).subscribe(res => {
        this.loading = true;
        this.success.emit();
        window.location.reload();
      }), (err => {
        this.loading = false;
        if (err.error.message)
          this.toast.showWarning('Atención', err.error.message);
        else
          this.toast.showWarning('Atención', 'No se pudo actualizar');
      });

    }


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
