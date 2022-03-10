import { Component, Input, OnInit } from '@angular/core';
import { ICategoryProfile } from 'app/shared/models/profile-category.model';

@Component({
  selector: 'ngx-match-form',
  templateUrl: './match-form.component.html',
  styleUrls: ['./match-form.component.scss'],
})
export class MatchFormComponent implements OnInit {
  @Input() categoryProfile: ICategoryProfile;

  constructor() { }

  ngOnInit(): void {
  }

}
