import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config';
import { IOpportunityAccept } from '../models/opportunity-accept.model';
import { IOpportunity } from '../models/opportunity.model';

const BASE_URL = `${config.api.url}${config.opportunity.mainEndpoint}`;

@Injectable({
  providedIn: 'root',
})
export class OpportunityService {

  constructor(protected http: HttpClient) { }

  public create(data: IOpportunity) {
    return this.http.post(`${BASE_URL}`, data);
  }

  public update(data: IOpportunity, id: string) {
    return this.http.put(`${BASE_URL}${id}`, data);
  }

  public delete(id: string) {
    return this.http.delete(`${BASE_URL}${id}`);
  }

  public getAll(pymeId: string, limit: number, page: number,
    q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL}${config.opportunity.pyme}${pymeId}?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }

  public getAllByStatusByPyme(pymeId: string, status: string, limit: number, page: number,
    q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL}${status}/${config.opportunity.pyme}${pymeId}` +
      `?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }

  public getAllByStatusByTalent(talentId: string, status: string, limit: number, page: number,
    q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL}${status}/${config.opportunity.talent}${talentId}` +
      `?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }

  public getById(id: string) {
    return this.http.get(`${BASE_URL}${id}`);
  }

  public accept(data: IOpportunityAccept, id: string) {
    return this.http.put(`${BASE_URL}${config.opportunity.accept}${id}`, data);
  }

  public finish(id: string) {
    return this.http.put(`${BASE_URL}${config.opportunity.finish}${id}`, null);
  }
}
