import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'app/config';

const BASE_URL = `${config.api.url}${config.user.mainEndpoint}`;
const BASE_URL_FREE = `${config.api.remote}/${config.user.mainEndpoint}`;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  public delete(id: string) {
    return this.http.delete(`${BASE_URL}${id}`);
  }
  public getAll(limit: number, page: number,
    q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL}?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }

  public getById(id: string) {
    return this.http.get(`${BASE_URL}${id}`);
  }
  public getByIdUser(id: string) {
    return this.http.get(`${BASE_URL_FREE}find/${id}`);
  }

  public getUserKeycloak(id: string) {
    return this.http.get(`${BASE_URL}${config.register2.keycloak}${id}`);
  }
  public updateUserKeycloak(id: string, data) {
    return this.http.put(`${BASE_URL}${config.register2.keycloak}${id}`, data);
  }

}
