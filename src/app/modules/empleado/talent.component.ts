import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';

@Component({
  selector: 'ngx-talent',
  templateUrl: './talent.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./talent.component.scss'],
})
export class TalentComponent extends LoadDataComponent implements OnInit {


  constructor() {
    super();

  }

  ngOnInit(): void {


  }

}
