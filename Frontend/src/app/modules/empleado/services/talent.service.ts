import { Injectable } from '@angular/core';
import { config } from 'app/config';
const BASE_URL_EMPLEADO = `${config.api.remote}${config.api.url}${config.empleado.mainEndpoint}`;
const BASE_URL_user = `${config.api.url}${config.empleado.mainEndpoint}${config.empleado.users}`;

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TalentService {

  constructor(protected http: HttpClient) { }

  public save(data: any) {
    return this.http.post(`${BASE_URL_EMPLEADO}`, data);
  }
  public saveEmpleado(data: any) {
    return this.http.post(`http://localhost:3000/api/empleado`, data);
  }
  public getById(id: string) {
    return this.http.get(`${BASE_URL_user}${id}`);
  }
}
