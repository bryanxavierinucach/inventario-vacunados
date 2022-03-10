/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbTooltipModule,
  NbWindowModule,
} from '@nebular/theme';
import { AuthModule } from './modules/auth/auth.module';
import localeEs from '@angular/common/locales/es-CL';
import { CommonModule, registerLocaleData } from '@angular/common';
import { Page404Component } from './@theme/components/page404/page404.component';
import { HeaderService } from './@theme/components/header/header.service';
import { PagesModule } from './modules/pages.module';
import { DropdownModule } from 'primeng/dropdown';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';

registerLocaleData(localeEs);

@NgModule({
  declarations: [AppComponent, Page404Component ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    AuthModule,
    CommonModule,
    PagesModule,
    NbButtonModule,
    DropdownModule,
    NbEvaIconsModule,
    DataViewModule,
    CardModule,
    TooltipModule,
    PaginatorModule,
    SidebarModule,
    NbToastrModule,
    NbBadgeModule,
    NbCardModule,
    NbIconModule,
    NbTooltipModule,
    DialogModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' },
    HeaderService,
  ],
})
export class AppModule {
}
