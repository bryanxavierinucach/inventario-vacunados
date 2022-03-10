import { Injectable } from '@angular/core';
import { config } from 'app/config';
import { HttpClient } from '@angular/common/http';
import { IAchievementImage } from 'app/shared/models/achievement-image.model';


const BASE_URL = `${config.api.url}${config.achievement.mainEndpoint}`;
@Injectable({
  providedIn: 'root',
})
export class AchievementService {

  constructor(protected http: HttpClient) { }

  public create(data: any) {
    return this.http.post(`${BASE_URL}`, data);
  }

  public update(data: any, id: string) {
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

  getImages() {
    return this.http.get<any>('assets/achievement/achievement-image.json')
      .toPromise()
      .then(res => <IAchievementImage[]>res.data)
      .then(data => data);
  }
}
