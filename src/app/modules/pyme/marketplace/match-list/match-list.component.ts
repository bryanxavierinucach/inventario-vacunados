import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { TalentService } from 'app/modules/talent/services/talent.service';
import { ICategoryProfile } from 'app/shared/models/profile-category.model';
import { IProfile } from 'app/shared/models/profile.model';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';

@Component({
  selector: 'ngx-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent extends LoadDataComponent implements OnInit {
  profileCategory: ICategoryProfile[];
  profile: ICategoryProfile;
  displayDetail: boolean;
  FIELD_SEARCH = '';

  @Output() updateEvent = new EventEmitter<ICategoryProfile>();

  constructor(private talentService: TalentService, private _activatedRoute: ActivatedRoute,
    private headerService: HeaderService, private location: Location) {
    super();
  }

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Usuario A-Z', value: 'user' },
      { label: 'Usuario Z-A', value: '!user' },
    ];
    this.loadData();
    this.headerService.setTitle('Match talentos');

  }

  loadData() {
    this._activatedRoute.paramMap.subscribe(params => {
      const userId = params.get('id');
      this.talentService.getProfileCategories(userId).subscribe((res: any) => {
        this.isLoaded = true;
        this.profileCategory = res;
      });
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
  }

  onDetail(data: IProfile) {
    this.profile = data;
    this.displayDetail = true;
  }
  onBack() {
    this.location.back();
  }
}
