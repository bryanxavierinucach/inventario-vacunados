import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config';
const URL_PYME = `${config.api.remote}/${config.keyloak.mainEndpoint}${config.keyloak.pyme}`;
const BASE_URL_PYME = `${config.api.remote}/${config.profile.mainEndpoint}`;
const BASE_URL = `${config.api.url}${config.profile.mainEndpoint}`;
const BASE_URL_user = `${config.api.url}${config.profile.mainEndpoint}${config.profile.users}`;
const COUNTRIES_URL = `${config.api.remote}/${config.profile.countries}${config.profile.profileAll}`;
const URL_INTEREST = `${config.api.url}${config.interest.mainEndpoint}`;

@Injectable({
  providedIn: 'root',
})
export class PymeService {

  constructor(private http: HttpClient) { }

  public save(data: any) {
    return this.http.post(`${BASE_URL_PYME}`, data);
  }
  public updateProfile(data: any, id: string) {
    return this.http.put(`${BASE_URL_user}pyme/${id}`, data);
  }

  public getAll(limit: number, page: number, q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL}?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }

  public getById(id: string) {
    return this.http.get(`${BASE_URL_user}${id}`);
  }

  public getCountries() {
    return this.http.get(`${COUNTRIES_URL}`);
  }

  public getTalents() {
    return this.http.get(`${URL_PYME}`);
  }

  public getSectorEconomic() {
    return this.http.get(`${URL_PYME}`);
  }
  public getInterest() {
    return this.http.get(`${URL_INTEREST}`);
  }
  public getInterestList() {
    return this.http.get(`${URL_INTEREST}list`);
  }

  public postInterest(data: any) {
    return this.http.post(`${URL_INTEREST}`, data);
  }

  public getInterestById(id) {
    return this.http.get(`${URL_INTEREST}${config.profile.users}${id}`);
  }
  public deleteInterest(id: string) {
    return this.http.delete(`${URL_INTEREST}${id}`);
  }
}
