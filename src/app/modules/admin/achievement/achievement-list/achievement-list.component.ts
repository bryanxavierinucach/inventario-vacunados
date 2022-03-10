import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastService } from 'app/@core/services/toast.service';
import { IAchievement } from 'app/shared/models/achievement.model';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { ConfirmationService } from 'primeng/api';
import { AchievementService } from '../../services/achievement.service';

@Component({
  selector: 'ngx-achievement-list',
  templateUrl: './achievement-list.component.html',
  styleUrls: ['./achievement-list.component.scss'],
})
export class AchievementListComponent extends LoadDataComponent implements OnInit {
  achievements: IAchievement[];
  private FIELD_SEARCH = 'description';
  @Output() updateEvent = new EventEmitter<IAchievement>();
  constructor(private achievementService: AchievementService, private confirmationService: ConfirmationService,
    private toastService: ToastService) {
    super();
   }

  ngOnInit(): void {
    this.loadData();
    this.sortOptions = [
      { label: 'Descripción A-Z', value: 'description' },
      { label: 'Descripción Z-A', value: '!description' },
    ];
  }

  loadData() {
    this.isLoaded = false;
    this.achievementService.getAll(this.limitTable,
      this.page, this.q, this.FIELD_SEARCH, this.orderBy, this.orderDirection).subscribe(res => {
        this.achievements = res['data'];
        this.limitTable = res['limit'];
        this.totalRecords = res['total'];
        this.isLoaded = true;
      });
  }

  onSearch(event) {
    this.search(event);
    this.loadData();
  }
  onPaginate(event) {
    this.paginate(event);
    this.loadData();
  }

  onSortChange(event) {
    this.sortChange(event);
    this.loadData();
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
    this.achievementService.delete(id).subscribe(res => {
      this.isLoaded = true;
      this.loadData();
      this.toastService.showSuccess('Eliminado', res['message']);
    }, err => {
      this.isLoaded = true;
      if (err.error.message)
        this.toastService.showWarning('Atención', err.error.message);
      else
        this.toastService.showWarning('Atención', 'No se pudo eliminar');
    });
  }

}
