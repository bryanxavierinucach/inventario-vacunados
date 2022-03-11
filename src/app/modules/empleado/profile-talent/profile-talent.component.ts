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
      this.profile = res['data'][0];
      this.email = res['data'][0].user.email;
    });
  }

  onDetail(data: any) {
    this.dataAchievemet = data.achievement;
    this.displayDetail = true;
  }
  onSuccess() {
    this.displayProfileUser = false;
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
