import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config';
import { IFeedback } from 'app/shared/models/feedback.model';

const BASE_URL = `${config.api.url}${config.feedback.mainEndpoint}`;

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {

  constructor(protected http: HttpClient) { }

  public create(data: IFeedback) {
    return this.http.post(`${BASE_URL}`, data);
  }

  public update(data: IFeedback, id: string) {
    return this.http.put(`${BASE_URL}${id}`, data);
  }

  public delete(id: string) {
    return this.http.delete(`${BASE_URL}${id}`);
  }

  public getAll(sectionId: string, limit: number, page: number,
    q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL}${config.feedback.section}${sectionId}?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }

  public getByTotal(sectionId: string, totalScore: number) {
    const query = `${BASE_URL}${config.feedback.section}${sectionId}/${totalScore}`;
    return this.http.get(query);
  }
}
