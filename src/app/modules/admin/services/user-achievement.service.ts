import { Injectable } from '@angular/core';
import { config } from 'app/config';
import { HttpClient } from '@angular/common/http';
import { IUserAchievement } from 'app/shared/models/userAchievement.model';


const BASE_URL = `${config.api.url}${config.userAchievement.mainEndpoint}`;
const URL_USERS = `${config.api.url}${config.userAchievement.mainEndpoint}`;

const BASE_URL_USER = `${config.api.url}${config.userAchievement.mainEndpoint}${config.userAchievement.achievement}${config.userAchievement.user}`;

@Injectable({
  providedIn: 'root',
})
export class UserAchievementService {

  constructor(protected http: HttpClient) { }

  public create(data: IUserAchievement) {
    return this.http.post(`${BASE_URL}`, data);
  }
  public createUserAchievement(data: any, id: string) {
    return this.http.put(`${BASE_URL}opportunity/${id}`, data);
  }

  public update(data: IUserAchievement, id: string) {
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
  public getAllByUserId(userId: string, limit: number, page: number,
    q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL_USER}${userId}?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }

  public getUsuarios() {
    return this.http.get(`${URL_USERS}`);
  }

}
