import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AchievementService } from '../../services/achievement.service';
import { ToastService } from 'app/@core/services/toast.service';
import { IAchievement } from 'app/shared/models/achievement.model';
import { DomSanitizer } from '@angular/platform-browser';
import { IAchievementImage } from 'app/shared/models/achievement-image.model';
import { NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-achievement-form',
  templateUrl: './achievement-form.component.html',
  styleUrls: ['./achievement-form.component.scss'],
})
export class AchievementFormComponent implements OnInit {

  public formAchievement: FormGroup;
  loading: boolean;
  achievementImages: IAchievementImage[] = [];
  public viewImage;
  public files: any = [];

  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number; }[];
  private destroy$: Subject<void> = new Subject<void>();
  numVisible = 3;
  numScroll = 3;

  @Input() achievement: IAchievement;
  @Input() displayCreate: boolean;

  @Output() success = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private achievementServices: AchievementService,
    private formBuilder: FormBuilder, public toastService: ToastService,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService) {
    this.responsiveOptions = [
      {
        breakpoint: '1290px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '1290px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '576px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    const { sm } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < sm),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanSm: boolean) => {
        if (isLessThanSm) {
          this.numScroll = 1;
          this.numScroll = 1;
        }
      });
  }

  ngOnInit(): void {
    this.formAchievement = this.formBuilder.group({
      description: [this.achievement?.description, Validators.required],
      icon: [this.achievement?.icon, Validators.required],
      picture: [this.achievement?.picture, Validators.required],
    });
    this.getImages();
  }

  getImages() {
    this.achievementServices.getImages().then(res => {
      this.achievementImages = res;
      if (this.achievement) {
        this.achievementImages.forEach(element => {
          if (element.image === this.achievement.picture) {
            element.isSelect = true;
          }
        });
      }
    });
  }


  onClose() {
    this.clean();
    this.closeModal.emit();
  }

  clean() {
    this.formAchievement.markAsPristine();
    this.formAchievement.markAsUntouched();
    this.formAchievement.updateValueAndValidity();
    this.formAchievement.reset();
  }

  save() {
    if (this.formAchievement.valid) {
      this.loading = true;
      if (!this.achievement) {
        this.achievementServices.create(this.formAchievement.value).subscribe(res => {
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
            this.toastService.showWarning('Atención', 'No se pudo ingresar');
        }));

      } else {
        this.achievementServices.update(this.formAchievement.value, this.achievement.id).subscribe(res => {
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

  onSelectImage(image: IAchievementImage) {
    this.formAchievement.patchValue({
      picture: image.image,
    });
    this.achievementImages.forEach(element => {
      element.isSelect = false;
    });
    image.isSelect = true;
  }
}
