import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config';
import { ITemplateEmail } from '../models/template-email.model';

const BASE_URL = `${config.api.url}${config.templateEmail.mainEndpoint}`;

@Injectable({
  providedIn: 'root',
})
export class TemplateEmailService {

  constructor(protected http: HttpClient) { }

  public create(data: ITemplateEmail) {
    return this.http.post(`${BASE_URL}`, data);
  }

  public update(data: ITemplateEmail, id: string) {
    return this.http.put(`${BASE_URL}${id}`, data);
  }

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

}
