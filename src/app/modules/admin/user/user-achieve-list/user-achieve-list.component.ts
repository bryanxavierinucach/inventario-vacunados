import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { UserAchievementService } from '../../services/user-achievement.service';
import { SelectItem, ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserAchievement } from '../../../../shared/models/userAchievement.model';
import { IAchievement } from '../../../../shared/models/achievement.model';
import { ToastService } from 'app/@core/services/toast.service';

@Component({
  selector: 'ngx-user-achieve-list',
  templateUrl: './user-achieve-list.component.html',
  styleUrls: ['./user-achieve-list.component.scss'],
})
export class UserAchieveListComponent extends LoadDataComponent implements OnInit {

  public FIELD_SEARCH = 'achievement.description';
  achievementUser: any;
  @Output() updateEvent = new EventEmitter<IAchievement>();
  displayCreate: boolean;

  constructor(private userAchievementService: UserAchievementService,
    private _activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private toastService: ToastService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.loadDataAchieveUser();
    this.sortOptions = [
      { label: 'Descripción A-Z', value: 'achievement.description' },
      { label: 'Descripción Z-A', value: 'achievement.description' },
    ];
  }

  loadDataAchieveUser() {
    this._activatedRoute.params.subscribe(params => {
      if (params['id'])
        this.userAchievementService.getAllByUserId(params['id'], this.limit,
          this.page, this.q, this.FIELD_SEARCH, this.orderBy, this.orderDirection).subscribe(res => {
            this.limit = res['limit'];
            this.totalRecords = res['total'];
            this.achievementUser = res['data'];
            this.isLoaded = true;
          });
      else
        this.isLoaded = false;
    });
  }
  onSearch(event) {
    this.search(event);
    this.loadDataAchieveUser();
  }
  onPaginate(event) {
    this.paginate(event);
    this.loadDataAchieveUser();
  }

  onSortChange(event) {
    this.sortChange(event);
    this.loadDataAchieveUser();
  }

  onUpdate(data: IAchievement) {
    this.updateEvent.emit(data);
  }

  onConfirmDelete(data: IAchievement) {
    this.confirmationService.confirm({
      key: 'cddelete',
      message: '¿Quiere eliminar?',
      header: 'Confimar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(data.id);
      },
    });
  }
  delete(id: string) {
    this.isLoaded = false;
    this.userAchievementService.delete(id).subscribe(res => {
      this.isLoaded = true;
      this.loadDataAchieveUser();
      this.toastService.showSuccess('Eliminado', res['message']);
    }, err => {
      this.isLoaded = true;
      if (err.error.message)
        this.toastService.showWarning('Atención', err.error.message);
      else
        this.toastService.showWarning('Atención', 'No se pudo eliminar');
    });
  }

  onBack() {
    this.router.navigate(['./app/admin/user']);
  }
  onCreate() {
    this.displayCreate = true;
  }
}
