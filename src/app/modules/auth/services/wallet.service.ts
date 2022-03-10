import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config';

const BASE_URL = `${config.api.url}`;

@Injectable({
  providedIn: 'root',
})
export class WalletService {

  constructor(protected http: HttpClient) { }

  getUserById(id: string) {
    return this.http.get(`${BASE_URL}${config.wallet.user}${id}`);
  }

  validateAddress(walletAddress) {
    return this.http.get(`${BASE_URL}${config.wallet.mainEndpoint}${config.wallet.validateaddress}${walletAddress}`);
  }

  public update(data: any, id: string) {
    return this.http.put(`${BASE_URL}${config.wallet.user}${id}`, data);
  }
}
