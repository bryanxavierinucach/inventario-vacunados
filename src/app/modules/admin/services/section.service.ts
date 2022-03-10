import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config';
import { ISection } from 'app/shared/models/section.model';

const BASE_URL = `${config.api.url}${config.section.mainEndpoint}`;

@Injectable({
  providedIn: 'root',
})
export class SectionService {

  constructor(protected http: HttpClient) { }

  public create(data: ISection) {
    return this.http.post(`${BASE_URL}`, data);
  }

  public update(data: ISection, id: string) {
    return this.http.put(`${BASE_URL}${id}`, data);
  }

  public delete(id: string) {
    return this.http.delete(`${BASE_URL}${id}`);
  }

  public getAll(questionaryId: string, limit: number, page: number,
    q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL}${config.section.questionary}${questionaryId}?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }

  public getAllComplete(questionaryId: string) {
    const query = `${BASE_URL}${config.section.questionary}${questionaryId}/${config.section.all}`;
    return this.http.get(query);
  }

  public getById(id: string) {
    return this.http.get(`${BASE_URL}${id}`);
  }
}
