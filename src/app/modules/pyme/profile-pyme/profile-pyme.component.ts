import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'app/@core/services/toast.service';
import { UserAchievementService } from 'app/modules/admin/services/user-achievement.service';
import { ProfileFormPymeComponent } from 'app/modules/auth/profile/profile-form-pyme/profile-form-pyme.component';
import { AuthService, JwtTokenService } from 'app/modules/auth/services';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { ConfirmationService } from 'primeng/api';
import { PymeService } from '../services/pyme.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TalentService } from '../../talent/services/talent.service';
@Component({
  selector: 'ngx-profile-pyme',
  templateUrl: './profile-pyme.component.html',
  styleUrls: ['./profile-pyme.component.scss'],
})
export class ProfilePymeComponent extends LoadDataComponent implements OnInit {
  public formInterest: FormGroup;
  public formTalent: FormGroup;
  user: any;
  public profiles: any;
  public profile: any = {};
  public achievementUser: any;
  miArray: any[] = [];
  idKeycloak;
  loading = true;
  idkey: any;
  public base64imagen;
  public email;
  public FIELD_SEARCH: string = 'requirement.economicSector';
  public dataAchievemet: any = {};
  displayDetail: boolean;
  displayProfileUser: boolean;
  bolShow: boolean;
  bolShow2 = true;
  bolShowTalent: boolean;
  bolShowTalent2 = true;
  public interest: any;
  public interestList: any;
  public talents: any;
  public talentList: any;
  valorProgress = 10;
  numItems = 10;

  @ViewChild(ProfileFormPymeComponent) profileView;

  constructor(
    private jwtTokenService: JwtTokenService,
    private service: PymeService,
    private router: Router,
    private toast: ToastService,
    private userAchievementService: UserAchievementService,
    private formBuilder: FormBuilder, public toastService: ToastService,
    private serviceTalent: TalentService,
  ) {
    super();
  }

  ngOnInit(): void {
    const token: any = this.jwtTokenService.decodeToken(
      localStorage.getItem('access_token'),
    );
    this.user = token.name;
    this.idkey = token.sub;
    this.getPymeById(this.idkey);
    this.loadDataAchievements();
    this.formInterest = this.formBuilder.group({
      name : new FormControl(''),
      userId: this.idkey,
      interestId: new FormControl(''),
    });
    this.formTalent = this.formBuilder.group({
      name : new FormControl(''),
      userId: this.idkey,
      talentId: new FormControl(''),
    });
    this.getInterest();
    this.getInterestList();
    this.getTalent();
    this.getTalentList();
  }
  // ----------------- FUNCIONES PRINCIPALES -------------------//

  loadDataAchievements() {
    this.userAchievementService
      .getAllByUserId(
        this.idkey,
        this.limitTable,
        this.page,
        this.q,
        this.FIELD_SEARCH,
        this.orderBy,
        this.orderDirection,
      )
      .subscribe((res) => {
        this.limitTable = res['limit'];
        this.totalRecords = res['total'];
        this.achievementUser = res['data'];
        this.isLoaded = true;
      });
    this.isLoaded = false;
  }
  getPymeById(idKeycloak) {
    this.service.getById(idKeycloak).subscribe((res) => {
      this.profile = res['data'][0];
      if (this.profile === undefined) {
        this.toast.showWarning(
          'Atención',
          'Se debe agregar información para una mejor experiencia de usuario',
        );
        this.loading = true;
        this.router.navigate(['/auth/register/pyme/' + idKeycloak]);
      }
      const json = res['data'][0].user.avatar;
      this.email = res['data'][0].user.email;
      this.base64imagen = 'data:image/jpg;base64,' + json;
    });
  }
  onDetail(data: any) {
    this.dataAchievemet = data.achievement;
    this.displayDetail = true;
  }
  onUpdate(item) {
    this.displayProfileUser = true;
    const dataProf = item;
  }

  onSuccess() {
    this.displayProfileUser = false;
    this.loadDataAchievements();
    this.getPymeById(this.idkey);
  }

  onClose() {
    this.displayProfileUser = false;
  }
  // ----------------- FUNCIONES INTERESES -------------------//

  save() {
    if (this.formInterest.valid) {
      this.loading = true;
      this.service.postInterest(this.formInterest.value).subscribe(res => {
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
    this.service.getInterestById(this.idkey).subscribe((resa: any) => {
      this.interest = resa;
    });
  }
  getInterestList() {
    this.service.getInterestList().subscribe((resp: any) => {
      this.interestList = resp;
    });
  }
  activeSpam() {
    this.bolShow = false;
    this.bolShow2 = true;
  }

  deleteInterest(id) {
    this.loading = true;
    this.service.deleteInterest(id).subscribe(res => {
      this.getInterest();
    });
  }
  // ----------------- FUNCIONES TALENTOS -------------------//

  saveTalents() {
    if (this.formTalent.valid) {
      this.loading = true;
      this.serviceTalent.postTalent(this.formTalent.value).subscribe(res => {
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
    this.serviceTalent.getTalentById(this.idkey).subscribe((resa: any) => {
      this.talents = resa;
    });
  }
  getTalentList() {
    this.serviceTalent.getTalentsList().subscribe((resp: any) => {
      this.talentList = resp;
    });
  }
  activeSpamTalent() {
    this.bolShowTalent = false;
    this.bolShowTalent2 = true;
  }

  deleteTalent(id) {
    this.loading = true;
    this.serviceTalent.deleteTalent(id).subscribe(res => {
      this.getTalent();
    });
  }
}
