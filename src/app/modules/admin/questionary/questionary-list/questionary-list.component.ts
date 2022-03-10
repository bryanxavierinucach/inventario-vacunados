import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastService } from 'app/@core/services/toast.service';
import { DIRECTED_PYME_SHOW, DIRECTED_TALENT_SHOW } from 'app/shared/constants/directed.constants';
import { TYPE_DIAGNOSIS_SHOW, TYPE_OPPORTUNITY_SHOW } from 'app/shared/constants/questionary-type.constants';
import { QuestionaryDirected } from 'app/shared/enums/questionary-directed.enum';
import { QuestionaryType } from 'app/shared/enums/questionary-type.enum';
import { IQuestionary } from 'app/shared/models/questionary.model';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { ConfirmationService } from 'primeng/api';
import { QuestionaryService } from '../../../../shared/services/questionary.service';

@Component({
  selector: 'ngx-questionary-list',
  templateUrl: './questionary-list.component.html',
  styleUrls: ['./questionary-list.component.scss'],
})
export class QuestionaryListComponent extends LoadDataComponent implements OnInit {


  questionaries: IQuestionary[];
  questionaryDirected = QuestionaryDirected;
  questionaryType = QuestionaryType;
  DIRECTED_TALENT_SHOW = DIRECTED_TALENT_SHOW;
  DIRECTED_PYME_SHOW = DIRECTED_PYME_SHOW;
  TYPE_DIAGNOSIS_SHOW = TYPE_DIAGNOSIS_SHOW;
  TYPE_OPPORTUNITY_SHOW = TYPE_OPPORTUNITY_SHOW;
  private FIELD_SEARCH = 'questionaryTitle';

  @Output() updateEvent = new EventEmitter<IQuestionary>();
  constructor(private questionaryService: QuestionaryService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
    this.sortOptions = [
      { label: 'Nombre A-Z', value: 'questionaryTitle' },
      { label: 'Nombre Z-A', value: '!questionaryTitle' },
    ];
  }

  loadData() {
    this.isLoaded = false;
    this.questionaryService.getAll(this.limitTable,
      this.page, this.q, this.FIELD_SEARCH, this.orderBy, this.orderDirection).subscribe(res => {
        this.questionaries = res['data'];
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

  onConfirmDelete(data: IQuestionary) {
    this.confirmationService.confirm({
      key: 'cddelete',
      message: '¿Quiere eliminar ' + data.questionaryTitle + '?',
      header: 'Confimar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(data.id);
      },
    });
  }

  delete(id: string) {
    this.isLoaded = false;
    this.questionaryService.delete(id).subscribe(res => {
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
