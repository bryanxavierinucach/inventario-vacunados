import { Injectable } from '@angular/core';
import { config } from 'app/config';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtTokenService } from './jwt-token.service';
import { IUser } from 'app/shared/models/user.model';
const CONTENT_TYPE_JSON = 'application/json';
const BASE_URL = `${config.api.remote}`;
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private url: string = config.api.remoteAuth;

  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': CONTENT_TYPE_JSON });

  constructor(private http: HttpClient, private router: Router, private jwtTokenService: JwtTokenService) { }
  public login(datos: any) {
    const httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(
      `${this.url}/${config.api.token}`,
      datos, { headers: httpHeaders });
  }


  public loginSocial(data: any) {
    return this.http.post(
      `${config.api.remote}/${config.oauthSocial.token}`,
      data);
  }

  public createUserSocial(data: any) {
    return this.http.post(
      `${config.api.url}${config.user.mainEndpoint}${config.user.social}`,
      data);
  }

  public changePassword(data: any, userId: string) {
    return this.http.put(
      `${config.api.remote}/${config.register.mainEndpoint}${config.register.password}${userId}`,
      JSON.stringify(data),
      { headers: this.httpHeaders },
    );
  }

  public logout() {
    this.logoutKeyloak().subscribe(res => {
      window.sessionStorage.clear();
      this.router.navigate(['/auth']);
      localStorage.clear();
    }, err => {
      window.sessionStorage.clear();
      this.router.navigate(['/auth']);
      localStorage.clear();
    });
  }
  public refreshToken() {
    const params = new URLSearchParams();
    params.append('refresh_token', localStorage.getItem('refresh_token'));
    params.append('client_id', 'divergenti-api');
    params.append('grant_type', 'refresh_token');

    const headers = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' });
    return this.http.post(`${this.url}/${config.api.refresh}`,
      params.toString(), { headers: headers }).
      pipe(
        tap((data: any) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
        }),
      );
  }
  public profile() {
    this.router.navigate(['/app/profile']);
  }
  public change_password() {
    this.router.navigate(['/app/password/password_change']);
  }

  public emailVerifier(email: string) {
    return this.http.put(
      `${BASE_URL}/${config.api.sendEmail}${email}`, {});
  }

  public isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem('access_token');
      const decodeToken = this.jwtTokenService.decodeToken(token);
      return decodeToken.preferred_username !== null;
    } catch {
      this.logout();
    }
  }

  public decodeToken(): boolean {
    const token = localStorage.getItem('access_token');
    return this.jwtTokenService.decodeToken(token);
  }

  public getUserIdLogin(): string {
    const token: any = this.jwtTokenService.decodeToken(localStorage.getItem('access_token'));
    return token.sub;
  }
  public getUserKeycloak(): string {
    const token: any = this.jwtTokenService.decodeToken(localStorage.getItem('access_token'));
    return token;
  }
  public getUserRoleLogin(): string {
    const token: any = this.jwtTokenService.decodeToken(localStorage.getItem('access_token'));
    return token['realm_access'].roles;
  }

  isExistRole(role) {
    const token: any = this.jwtTokenService.decodeToken(localStorage.getItem('access_token'));
    const roles = token.realm_access.roles;
    const roleFind = roles.find(element => element === role);
    if (roleFind) return true;
    else return false;
  }
  public register(data: any) {
    return this.http.post(
      `${config.register2.url}${config.register2.mainEndpoint}${config.register2.keycloak}`, data);
  }
  public updateUser(data: IUser, id: string) {
    return this.http.put(`${config.api.url}${config.register2.mainEndpoint}${id}`, data);
  }
  public updateUserKeycloak(data: any, id: string) {
    return this.http.put(`${config.api.url}${config.register2.mainEndpoint}${config.register2.keycloak}${id}`, data);
  }

  public linkedin() {
    return this.http.get(
      `${config.register2.url}${config.register2.auth}${config.register2.linkedin}`);
  }

  public save(data: any) {
    return this.http.post(`${BASE_URL}`, data);
  }

  private logoutKeyloak() {
    const refreshToken = localStorage.getItem('refresh_token');
    const data = { refreshToken };
    return this.http.post(`${config.api.remote}/${config.api.logout}`, data);
  }

}



