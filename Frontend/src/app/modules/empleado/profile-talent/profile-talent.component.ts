import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtTokenService } from 'app/modules/auth/services';
import { TalentService } from '../services/talent.service';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { ToastService } from 'app/@core/services/toast.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-profile-talent',
  templateUrl: './profile-talent.component.html',
  styleUrls: ['./profile-talent.component.scss'],
})
export class ProfileTalentComponent extends LoadDataComponent implements OnInit {
  public formInterest: FormGroup;
  public formTalent: FormGroup;
  user: any;
  public profiles: any;
  public profile: any = {};
  miArray: any[] = [];
  idKeycloak;
  public base64imagen;
  public email;
  public FIELD_SEARCH: string = 'requirement.talent';
  public dataAchievemet: any = {};
  displayDetail: boolean;
  public achievementUser: any;
  idkey: any;
  loading = true;
  displayProfileUser: boolean;
  bolShow: boolean;
  bolShow2 = true;
  bolShowTalent = false;
  bolShowTalent2 = true;
  public interest: any;
  public interestList: any;
  public talents: any;
  public talentList: any;
  vacunado: string;
  nroDocisValue: string;
  dataEmpleado: any = {};
  dataEmpleado2: any = {
    "id": "",
    "userId": "",
    "fechaNacimiento": "1999-02-01",
    "domicilio": "",
    "telefono": "",
    "estadoVacunacion": undefined,
    "tipoVacuna": "",
    "fechaVacunacion": "1999-02-01",
    "nroDocis": undefined,
    "user": {
      "id": "",
      "role": "users",
      "user": "",
      "nombres": "",
      "apellidos": "",
      "email": "",
      "creation_time": null,
      "modification_time": null
    }
  };
  dataEmpleado3: any = {
    "id": "",
    "userId": "",
    "fechaNacimiento": "1999-02-01",
    "domicilio": "",
    "telefono": "",
    "estadoVacunacion": null,
    "tipoVacuna": "",
    "fechaVacunacion": "1999-02-01",
    "nroDocis": null,
    "user": {
      "id": "",
      "role": "",
      "user": "",
      "nombres": "",
      "apellidos": "",
      "email": "",
      "creation_time": null,
      "modification_time": null
    }
  };
  dataUser: any = {};
  @ViewChild('autoInput') input;
  options: string[];
  options2: [];
  filteredOptions$: Observable<string[]>;
  numbers = new Array();

  valorProgress = 10;
  numItems = 10;
  constructor(private jwtTokenService: JwtTokenService,
    private service: TalentService,
    private router: Router,
    private toast: ToastService,
    private formBuilder: FormBuilder, public toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    const token: any = this.jwtTokenService.decodeToken(localStorage.getItem('access_token'));
    this.user = token.name;
    this.idkey = token.sub;
    this.getTalenTById(this.idkey);
    this.formInterest = this.formBuilder.group({
      name: new FormControl(''),
      userId: this.idkey,
      interestId: new FormControl(''),
    });
  }

  // ----------------- FUNCIONES PRINCIPALES -------------------//
  getTalenTById(idKeycloak) {
    this.service.getById(idKeycloak).subscribe(res => {

      if (res['data'][0] != null) {
        this.dataEmpleado = res['data'][0];
        this.dataUser = this.dataEmpleado['user'];
        if (res['data'][0].estadoVacunacion === true) {
          this.vacunado = "Vacunado"
        } else { this.vacunado = "No Vacunado" }

        if (res['data'][0].nroDocis === 1) {
          this.nroDocisValue = "Primera Docis"
        } else {
          if (res['data'][0].nroDocis === 2) {
            this.nroDocisValue = "Segunda Docis"

          } else {
            if (res['data'][0].nroDocis === 3) {
              this.nroDocisValue = "Tercera Docis"
            }
          }
        }
        console.log(this.dataEmpleado);

      } else {
        this.toast.showInfo('EDITE INFORMACIÓN ADICIONAL', 'Se necesita obtener su información adicional')
      }

    });
  }

  onDetail(data: any) {
    this.dataAchievemet = data.achievement;
    this.displayDetail = true;
  }
  onSuccess() {
    this.displayProfileUser = false;
  }

  onUpdate(item) {
    this.displayProfileUser = true;
    const dataProf = item;
  }
  onClose() {
    this.displayProfileUser = false;
  }
  // ----------------- FUNCIONES INTERESES -------------------//
  activeSpam() {
    this.bolShow = false;
    this.bolShow2 = true;
  }
  activeDivInteres(): void {
    this.bolShow = true;
    this.bolShow2 = false;
    // wait 3 Seconds and hide
    setTimeout(function () {
      this.bolShow = false;
      this.bolShow2 = true;
    }.bind(this), 10000);
  }


  // ----------------- FUNCIONES TALENTOS -------------------//
  activeSpamTalent() {
    this.bolShowTalent = false;
    this.bolShowTalent2 = true;
  }
  activeDiv(): void {
    this.bolShowTalent = true;
    this.bolShowTalent2 = false;
    // wait 3 Seconds and hide
    setTimeout(function () {
      this.bolShowTalent = false;
      this.bolShowTalent2 = true;
    }.bind(this), 10000);
  }



  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }
}
