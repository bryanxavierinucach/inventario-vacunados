import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-option-form',
  templateUrl: './option-form.component.html',
  styleUrls: ['./option-form.component.scss'],
})
export class OptionFormComponent implements OnInit {


  @Input() formOption: FormGroup;


  constructor() { }

  ngOnInit(): void {
  }

}
