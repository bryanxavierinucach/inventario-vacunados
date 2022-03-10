import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config';
import { IQuestionary } from 'app/shared/models/questionary.model';
import { QuestionaryDirected } from '../enums/questionary-directed.enum';
import { QuestionaryType } from '../enums/questionary-type.enum';


const BASE_URL = `${config.api.url}${config.questionary.mainEndpoint}`;
const BASE_URL_COMPLETE = `${config.api.url}${config.questionary.complete}`;

@Injectable({
  providedIn: 'root',
})
export class QuestionaryService {

  constructor(protected http: HttpClient) { }

  public create(data: any) {
    return this.http.post(`${BASE_URL_COMPLETE}`, data);
  }

  public update(data: any, id: string) {
    return this.http.put(`${BASE_URL_COMPLETE}${id}`, data);
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

  public getAllByType(type: QuestionaryType, role: QuestionaryDirected, limit: number, page: number,
    q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL}${type}/${role}?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }


  public getById(id: string) {
    return this.http.get(`${BASE_URL}${id}`);
  }

}
