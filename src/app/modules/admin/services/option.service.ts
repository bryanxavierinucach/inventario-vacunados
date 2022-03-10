import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config';
import { IOption } from 'app/shared/models/option.model';

const BASE_URL = `${config.api.url}${config.option.mainEndpoint}${config.option.answer}`;
const BASE_URL_QUESTION = `${config.api.url}${config.option.mainEndpoint}${config.option.question}`;

@Injectable({
  providedIn: 'root',
})
export class OptionService {

  constructor(protected http: HttpClient) { }

  public create(data: IOption) {
    return this.http.post(`${BASE_URL}`, data);
  }

  public update(data: IOption, id: string) {
    return this.http.put(`${BASE_URL}${id}`, data);
  }

  public delete(id: string) {
    return this.http.delete(`${BASE_URL}${id}`);
  }

  public getAll(questionId: string, limit: number, page: number,
    q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL_QUESTION}${questionId}?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }

}
