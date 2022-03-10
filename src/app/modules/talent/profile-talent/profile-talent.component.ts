import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtTokenService } from 'app/modules/auth/services';
import { TalentService } from '../services/talent.service';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { UserAchievementService } from 'app/modules/admin/services/user-achievement.service';
import { ToastService } from 'app/@core/services/toast.service';
import { FormGroup, FormBuilder, Validators, FormControl, ControlContainer } from '@angular/forms';
import { PymeService } from '../../pyme/services/pyme.service';
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
    private userAchievementService: UserAchievementService,
    private formBuilder: FormBuilder, public toastService: ToastService,
    private servicePyme: PymeService,
  ) {
    super();
  }

  ngOnInit(): void {
    const token: any = this.jwtTokenService.decodeToken(localStorage.getItem('access_token'));
    this.user = token.name;
    this.idkey = token.sub;
    this.loadDataAchievements();
    this.getTalenTById(this.idkey);
    this.getInterest();
    this.formInterest = this.formBuilder.group({
      name: new FormControl(''),
      userId: this.idkey,
      interestId: new FormControl(''),
    });
    this.formTalent = this.formBuilder.group({
      name: new FormControl(''),
      userId: this.idkey,
      talentId: new FormControl(''),
    });
    this.getInterestList();
    this.getTalent();
    this.getTalentList();
  }

  // ----------------- FUNCIONES PRINCIPALES -------------------//
  getTalenTById(idKeycloak) {
    this.service.getById(idKeycloak).subscribe(res => {
      this.profile = res['data'][0];
      if (this.profile === undefined) {
        this.toast.showWarning('Atención', 'Se debe agregar información para una mejor experiencia de usuario');
        this.loading = true;
        this.router.navigate(['/auth/register/talent/' + idKeycloak]);
      }
      const json = res['data'][0].user.avatar;
      this.base64imagen = 'data:image/jpg;base64,' + json;
      this.email = res['data'][0].user.email;

    });
  }

  loadDataAchievements() {
    this.userAchievementService.getAllByUserId(this.idkey, this.limitTable,
      this.page, this.q, this.FIELD_SEARCH, this.orderBy, this.orderDirection).subscribe(res => {
        this.limitTable = res['limit'];
        this.totalRecords = res['total'];
        this.achievementUser = res['data'];
        this.isLoaded = true;
      });
    this.isLoaded = false;
  }
  onDetail(data: any) {
    this.dataAchievemet = data.achievement;
    this.displayDetail = true;
  }
  onSuccess() {
    this.displayProfileUser = false;
    this.loadDataAchievements();
    this.getTalenTById(this.idkey);
  }

  onUpdate(item) {
    this.displayProfileUser = true;
    const dataProf = item;
  }
  onClose() {
    this.displayProfileUser = false;
  }
  // ----------------- FUNCIONES INTERESES -------------------//

  save() {
    if (this.formInterest.valid) {
      this.loading = true;
      this.servicePyme.postInterest(this.formInterest.value).subscribe(res => {
        this.bolShow = false;
        this.bolShow2 = true;
        this.getInterest();
      },
        (err) => {
          this.loading = false;
          if (err.error.message)
            this.toastService.showWarning('Atención', err.error.message);
          else this.toastService.showWarning('Atención', 'No se pudo ingresar');
        },
      );
    }
  }
  getInterest() {
    this.servicePyme.getInterestById(this.idkey).subscribe((resa: any) => {
      this.interest = resa;
    });
  }
  getInterestList() {
    this.servicePyme.getInterestList().subscribe((resp: any) => {

      this.interestList = resp;
      let length;
      for (let index = 0; index < this.interestList.length; index++) {
        this.options = [this.interestList[index].name];
        this.options2 = this.interestList[index].name;
        this.filteredOptions$ = of(this.options);
        length = this.numbers.push(10);
      }
    });
  }
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

  deleteInterest(id) {
    this.loading = true;
    this.servicePyme.deleteInterest(id).subscribe(res => {
      this.getInterest();
    });
  }

  // ----------------- FUNCIONES TALENTOS -------------------//

  saveTalents() {
    if (this.formTalent.valid) {
      this.loading = true;
      this.service.postTalent(this.formTalent.value).subscribe(res => {
        this.bolShowTalent = false;
        this.bolShowTalent2 = true;
        this.getTalent();
      },
        (err) => {
          this.loading = false;
          if (err.error.message)
            this.toastService.showWarning('Atención', err.error.message);
          else this.toastService.showWarning('Atención', 'No se pudo guardar');
        },
      );
    }
  }

  getTalent() {
    this.service.getTalentById(this.idkey).subscribe((resa: any) => {
      this.talents = resa;
    });
  }
  getTalentList() {
    this.service.getTalentsList().subscribe((resp: any) => {
      this.talentList = resp;
    });
  }
  activeSpamTalent() {
    this.bolShowTalent = false;
    this.bolShowTalent2 = true;
  }

  deleteTalent(id) {
    this.loading = true;
    this.service.deleteTalent(id).subscribe(res => {
      this.getTalent();
    });
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
