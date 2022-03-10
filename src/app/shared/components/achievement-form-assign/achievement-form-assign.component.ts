import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'app/@core/services/toast.service';
import { IAchievement } from 'app/shared/models/achievement.model';
import { IUserAchievement } from 'app/shared/models/userAchievement.model';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { ActivatedRoute } from '@angular/router';
import { AchievementService } from 'app/modules/admin/services/achievement.service';
import { UserAchievementService } from 'app/modules/admin/services/user-achievement.service';
@Component({
  selector: 'ngx-achievement-form-assign',
  templateUrl: './achievement-form-assign.component.html',
  styleUrls: ['./achievement-form-assign.component.scss'],
})
export class AchievementFormAssignComponent extends LoadDataComponent implements OnInit {
  update = false;
  formAchievement: FormGroup;
  loading: boolean;
  public FIELD_SEARCH = '';
  achievements;
  idOpp;
  tal;
  @Input() displayCreate: boolean;
  @Input() userAchievement: IUserAchievement;
  @Input() talento: string;
  @Input() oportunidad: string;
  @Output() success = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private userAchieveS: UserAchievementService, private achievement: AchievementService,
    private _activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, public toastService: ToastService) {
    super();
  }
  ngOnInit(): void {
    this.listAchivement();
    this.formAchievement = this.formBuilder.group({
      userId: this.talento,
      achievementId: [this.userAchievement?.achievementId, Validators.required],
      score: [this.userAchievement?.score, Validators.required],
    });
    // this.formAchievement.patchValue({ userId: this.talento });
  }
  onClose() {
    this.formAchievement.reset();
    this.closeModal.emit();
  }

  listAchivement() {
    this.achievement.getAll(this.limit,
      this.page, this.q, this.FIELD_SEARCH, this.orderBy, this.orderDirection).subscribe((res: any) => {
        this.achievements = res['data'];
      });
  }
  save() {
    if (this.formAchievement.valid) {
      this.loading = true;
      if (!this.userAchievement) {
        this.userAchieveS.createUserAchievement(this.formAchievement.value, this.oportunidad).subscribe(res => {
          this.loading = true;
          this.toastService.showSuccess('Exitoso', res['message']);
          this.loading = false;
          this.formAchievement.reset();
          this.success.emit();
        }, (err => {
          this.loading = false;
          if (err.error.message)
            this.toastService.showWarning('Atención', err.error.message);
          else
            this.toastService.showWarning('Atención', 'No se pudo ingresar');
        }));
      } else {
        this.userAchieveS.update(this.formAchievement.value, this.userAchievement.id).subscribe(res => {
          this.loading = false;
          this.toastService.showSuccess('Exitoso', res['message']);
          this.loading = false;
          this.formAchievement.reset();
          this.success.emit();
        }, (err => {
          this.loading = false;
          if (err.error.message)
            this.toastService.showWarning('Atención', err.error.message);
          else
            this.toastService.showWarning('Atención', 'No se pudo actualizar');
        }));
      }
    }
  }
}
