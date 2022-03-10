import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AchievementService } from '../../services/achievement.service';
import { ToastService } from 'app/@core/services/toast.service';
import { IAchievement } from 'app/shared/models/achievement.model';
import { UserAchievementService } from '../../services/user-achievement.service';

import { IUserAchievement } from 'app/shared/models/userAchievement.model';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-user-achieve-form',
  templateUrl: './user-achieve-form.component.html',
  styleUrls: ['./user-achieve-form.component.scss'],
})
export class UserAchieveFormComponent extends LoadDataComponent implements OnInit {
  update = false;
  formAchievement: FormGroup;
  loading: boolean;
  public FIELD_SEARCH = '';
  achievements;
  @Input() userAchievement: IUserAchievement;
  @Input() displayCreate: boolean;
  @Output() success = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private userAchieveS: UserAchievementService, private achievement: AchievementService,
    private _activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder, public toastService: ToastService) {
    super();
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      if (params['id'])
        this.formAchievement = this.formBuilder.group({
          userId: params['id'],
          achievementId: [this.userAchievement?.achievementId, Validators.required],
          score: [this.userAchievement?.score, Validators.required],
        });
      else
        this.isLoaded = false;
    });

    this.listAchivement();
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
        this.userAchieveS.create(this.formAchievement.value).subscribe(res => {
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
