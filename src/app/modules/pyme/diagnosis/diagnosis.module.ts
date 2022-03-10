import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiagnosisRoutingModule } from './diagnosis-routing.module';
import { PagesModule } from 'app/modules/pages.module';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DiagnosisRoutingModule,
    PagesModule,
    PaginatorModule,
  ],
})
export class DiagnosisModule { }
