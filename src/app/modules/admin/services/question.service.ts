import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config';
import { IQuestion } from 'app/shared/models/question.model';

const BASE_URL = `${config.api.url}${config.question.mainEndpoint}`;

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  constructor(protected http: HttpClient) { }

  public create(data: IQuestion) {
    return this.http.post(`${BASE_URL}`, data);
  }

  public update(data: IQuestion, id: string) {
    return this.http.put(`${BASE_URL}${id}`, data);
  }

  public delete(id: string) {
    return this.http.delete(`${BASE_URL}${id}`);
  }

  public getAll(questionaryId: string, limit: number, page: number,
    q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL}${config.question.questionary}${questionaryId}?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }

  public getById(id: string) {
    return this.http.get(`${BASE_URL}${id}`);
  }
}
