import { Component, OnInit } from '@angular/core';
import { QuestionaryService } from 'app/shared/services/questionary.service';
import { IQuestionary } from 'app/shared/models/questionary.model';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { AuthService } from 'app/modules/auth/services';
import { ROLE_PYME, ROLE_TALENT } from 'app/shared/constants/roles.constants';
import { QuestionaryDirected } from 'app/shared/enums/questionary-directed.enum';
import { QuestionaryType } from 'app/shared/enums/questionary-type.enum';

@Component({
  selector: 'ngx-diagnosis-todo-list',
  templateUrl: './diagnosis-todo-list.component.html',
  styleUrls: ['./diagnosis-todo-list.component.scss'],
})
export class DiagnosisTodoListComponent extends LoadDataComponent implements OnInit {

  questionaries: IQuestionary[] = [];
  limitTable = 6;
  directedRole: QuestionaryDirected;
  rol;

  constructor(private questionaryService: QuestionaryService, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.directedRole = this.getRole();
    this.loadData();
    this.profile();
  }

  loadData() {
    this.isLoaded = false;
    this.questionaryService.getAllByType(QuestionaryType.DIAGNOSIS, this.directedRole, this.limitTable,
      this.page, this.q, null, this.orderBy, this.orderDirection).subscribe(res => {
        this.questionaries = res['data'];
        this.limitTable = res['limit'];
        this.totalRecords = res['total'];
        this.isLoaded = true;
      });
  }

  public profile() {
    const token = this.authService.getUserRoleLogin();

    for (const i of token) {
      if (i === 'users') {
        this.rol = 'users';
      } else if (i === 'pyme') {
        this.rol = 'pyme';
      } else if (i === 'admin') {
        this.rol = 'admin';
      }
    }

  }
  onPaginate(event) {
    this.paginate(event);
    this.loadData();
  }

  onSortChange(event) {
    this.sortChange(event);
    this.loadData();
  }

  getRole() {
    const isPyme = this.authService.isExistRole(ROLE_PYME);
    if (isPyme) return QuestionaryDirected.PYME;
    else {
      const isTalent = this.authService.isExistRole(ROLE_TALENT);
      if (isTalent) return QuestionaryDirected.TALENT;
      else null;
    }
  }

}
