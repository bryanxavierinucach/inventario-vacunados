import { Injectable } from '@angular/core';
import { config } from 'app/config';
const BASE_URL_PYME = `${config.api.remote}/${config.profile.mainEndpoint}`;
const BASE_URL_TALENTS = `${config.api.remote}/${config.profile.mainEndpoint}${config.profile.category}`;
const BASE_URL = `${config.api.url}${config.profile.mainEndpoint}`;
const BASE_URL_user = `${config.api.url}${config.profile.mainEndpoint}${config.profile.users}`;
const COUNTRIES_URL = `${config.api.remote}/${config.profile.countries}${config.profile.profileAll}`;
const URL_TALENTS = `${config.api.remote}/${config.profile.category}`;
const URL_CATEGORY = `${config.api.url}${config.profile.mainEndpoint}${config.profile.category}`;
const URL_CATEGORY_OP = `${config.api.url}${config.opportunity.mainEndpoint}${config.opportunity.match}`;
const URL_OPPORTUNITY = `${config.api.remote}/${config.opportunity.mainEndpoint}${config.opportunity.status}`;
const URL_TALENT_LIST = `${config.api.url}${config.profile.talent}`;

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TalentService {

  constructor(private http: HttpClient) { }

  public save(data: any) {
    return this.http.post(`${BASE_URL_PYME}`, data);
  }
  public saveTalent(data: any) {
    return this.http.post(`${BASE_URL_TALENTS}`, data);
  }
  public saveCategories(data: any) {
    return this.http.post(`${URL_CATEGORY}`, data);
  }
  public getProfileCategories(id: string) {
    const query = `${URL_CATEGORY_OP}${id}`;
    return this.http.get(query);
  }

  public getAll(limit: number, page: number, q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL}?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }
  public getAllOpportunityStatusActive(limit: number, page: number, q: string,
    field: string, orderBy: string, orderDirection: string) {
    let query = `${URL_OPPORTUNITY}?page=${page}&limit=${limit}`;
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

  public getCategories() {
    return this.http.get(`${URL_TALENTS}`);
  }





  public getTalents() {
    return this.http.get(`${URL_TALENT_LIST}`);
  }
  public getTalentsList() {
    return this.http.get(`${URL_TALENT_LIST}list`);
  }

  public postTalent(data: any) {
    return this.http.post(`${URL_TALENT_LIST}`, data);
  }

  public getTalentById(id) {
    return this.http.get(`${URL_TALENT_LIST}${config.profile.users}${id}`);
  }
  public deleteTalent(id: string) {
    return this.http.delete(`${URL_TALENT_LIST}${id}`);
  }
}
