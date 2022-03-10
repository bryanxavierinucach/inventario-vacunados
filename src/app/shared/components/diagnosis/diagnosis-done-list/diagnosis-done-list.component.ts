import { Component, Input, OnInit } from '@angular/core';
import { IQuestionaryDone } from 'app/shared/models/questionary-done.model';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { SectionAnswerService } from 'app/shared/services/section-answer.service';
import { AuthService } from 'app/modules/auth/services';

@Component({
  selector: 'ngx-diagnosis-done-list',
  templateUrl: './diagnosis-done-list.component.html',
  styleUrls: ['./diagnosis-done-list.component.scss'],
})
export class DiagnosisDoneListComponent extends LoadDataComponent implements OnInit {

  questionaries: IQuestionaryDone[] = [];
  private FIELD_SEARCH = 'dateCreation';
  limitTable = 6;
  rol;
  @Input() userId: string;

  constructor(private sectionAnswerService: SectionAnswerService, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
    this.sortOptions = [
      { label: 'Antiguos', value: 'dateCreation' },
      { label: 'Recientes', value: '!dateCreation' },
    ];
    this.profile();
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
  loadData() {
    this.isLoaded = false;
    if (!this.userId) this.userId = this.authService.getUserIdLogin();
    this.sectionAnswerService.getQuestionaries(this.userId, this.limitTable,
      this.page, this.q, this.FIELD_SEARCH, this.orderBy, this.orderDirection).subscribe(res => {
        this.questionaries = res['data'];
        this.limitTable = res['limit'];
        this.totalRecords = res['total'];
        this.isLoaded = true;
      });
  }

  onPaginate(event) {
    this.paginate(event);
    this.loadData();
  }

  onSortChange(event) {
    this.sortChange(event);
    this.loadData();
  }

}
