import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastService } from 'app/@core/services/toast.service';
import { IReward } from 'app/shared/models/reward.model';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { ConfirmationService } from 'primeng/api';
import { RewardService } from '../../services/reward.service';

@Component({
  selector: 'ngx-reward-list',
  templateUrl: './reward-list.component.html',
  styleUrls: ['./reward-list.component.scss'],
})
export class RewardListComponent extends LoadDataComponent implements OnInit {

  rewards: IReward[];
  private FIELD_SEARCH = 'path';
  rewardDetail: IReward;
  displayDetail: boolean;

  @Output() updateEvent = new EventEmitter<IReward>();
  constructor(private rewardService: RewardService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
    this.sortOptions = [
      { label: 'Path A-Z', value: 'path' },
      { label: 'Path Z-A', value: '!path' },
      { label: 'Descripción  A-Z', value: 'description' },
      { label: 'Descripción  Z-A', value: '!description' },
    ];
  }

  loadData() {
    this.isLoaded = false;
    this.rewardService.getAll(this.limitTable,
      this.page, this.q, this.FIELD_SEARCH, this.orderBy, this.orderDirection).subscribe(res => {
        this.rewards = res['data'];
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

  onUpdate(data: IReward) {
    this.updateEvent.emit(data);
  }

  onConfirmDelete(data: IReward) {
    this.confirmationService.confirm({
      key: 'cddelete',
      message: '¿Quiere eliminar ' + data.path + '?',
      header: 'Confimar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(data.id);
      },
    });
  }

  delete(id: string) {
    this.isLoaded = false;
    this.rewardService.delete(id).subscribe(res => {
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

  onDetail(data: IReward) {
    this.rewardDetail = data;
    this.displayDetail = true;
  }
}
