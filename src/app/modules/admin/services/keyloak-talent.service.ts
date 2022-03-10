import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config';

const BASE_URL = `${config.api.url}${config.keyloak.mainEndpoint}`;

@Injectable({
  providedIn: 'root',
})

export class KeyloakTalentService {

  constructor(protected http: HttpClient) { }

  public getAll() {
    const query = `${BASE_URL}${config.keyloak.talent}`;
    return this.http.get(query);
  }
}
