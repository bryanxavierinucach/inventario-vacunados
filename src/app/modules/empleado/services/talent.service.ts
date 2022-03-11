import { Injectable } from '@angular/core';
import { config } from 'app/config';
const BASE_URL_PYME = `${config.api.remote}/${config.empleado.mainEndpoint}`;
const BASE_URL_user = `${config.api.url}${config.empleado.mainEndpoint}${config.empleado.users}`;

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TalentService {

  constructor(private http: HttpClient) { }

  public save(data: any) {
    return this.http.post(`${BASE_URL_PYME}`, data);
  }

  public getById(id: string) {
    return this.http.get(`${BASE_URL_user}${id}`);
  }
}
