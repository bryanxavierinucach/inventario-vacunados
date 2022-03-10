/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, HostListener, OnInit } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';
import { AuthService, JwtTokenService } from './modules/auth/services';
import { Subject } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {


  public userActivity: any;
  public userInactive: Subject<any> = new Subject();

  private TIME_INACTIVITY = 2 * 60000; // 5 Min
  public messageInactivity = 'Quieres mantener la sesión?';
  public showTime: string;
  private modalActive = false;
  public timeLeft: number = 60;
  private interval;


  constructor(private iconLibraries: NbIconLibraries, private authService: AuthService,
    private confirmationService: ConfirmationService, private jwtService: JwtTokenService) {
    this.iconLibraries.registerFontPack('font-awesome-solid', {
      packClass: 'fas',
      iconClassPrefix: 'fa',
    });
    this.iconLibraries.registerFontPack('font-awesome-regular', {
      packClass: 'far',
      iconClassPrefix: 'fa',
    });
    this.iconLibraries.registerFontPack('font-awesome-brands', {
      packClass: 'fab',
      iconClassPrefix: 'fa',
    });
    this.iconLibraries.registerFontPack('primeicons', {
      packClass: 'pi',
      iconClassPrefix: 'pi',
    });
    this.iconLibraries.registerFontPack('ionicons-md', {
      iconClassPrefix: 'ion-md',
    });
    this.iconLibraries.registerFontPack('ionicons-ios', {
      iconClassPrefix: 'ion-ios',
    });
    this.iconLibraries.registerFontPack('socicon', {
      iconClassPrefix: 'socicon',
    });
  }

  ngOnInit(): void {
    registerLocaleData( es );
    this.setTimeout();
    this.userInactive.subscribe(() => {
      if (this.authService.isAuthenticated() && !this.modalActive) {
        this.modalActive = true;
        const token = this.jwtService.decodeToken(localStorage.getItem('refresh_token'));
        let time = new Date(token.exp * 1000).getTime() - new Date().getTime();
        this.timeLeft = (time / 1000) - 60;
        if (this.timeLeft > 120) {
          time = 120;
          this.timeLeft = 120;
        }
        this.startTimer(time);
        this.confirmationService.confirm({
          header: 'Inactividad detectada',
          accept: () => {
            this.modalActive = false;
            this.authService.refreshToken();
            this.pauseTimer();
          },
          reject: () => {
            this.modalActive = false;
            this.pauseTimer();
            this.authService.logout();
          },
        });
      }
    });

  }
  /**
   * Definir tiempo de inactividad
   */
  private setTimeout(): void {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), this.TIME_INACTIVITY);
  }
  /**
      * Detectar que mause se mueve y reiniciar contar de inactividad
      */
  @HostListener('window:mousemove') refreshUserState(): void {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  /**
    * Cuenta regresiva con el tiempo que le queda al refresh token
    * @param time segundos
    */
  startTimer(time) {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = time;
      }
      const minute = Math.floor((this.timeLeft / 60) % 60);
      const showMinute = (minute < 10) ? '0' + minute : minute;
      const second = Math.floor(this.timeLeft % 60);
      const showSecond = (second < 10) ? '0' + second : second;
      this.showTime = showMinute + ':' + showSecond;
      if (this.timeLeft < 1) {
        this.confirmationService.close();
        this.modalActive = false;
        this.pauseTimer();
        this.authService.logout();
      }
    }, 1000);
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
