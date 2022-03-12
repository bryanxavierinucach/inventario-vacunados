import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelperService = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class JwtTokenService {

  constructor() { }

  public decodeToken(token: string) {
    return jwtHelperService.decodeToken(token);
  }

  public expirationDate(token: string) {
    return jwtHelperService.getTokenExpirationDate(token);
  }

  public isExpiredToken(token: string) {
    return jwtHelperService.isTokenExpired(token);
  }

}
