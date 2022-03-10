import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config';

const BASE_URL = `${config.api.url}${config.category.mainEndpoint}`;

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(protected http: HttpClient) { }

  public getAll() {
    const query = `${BASE_URL}`;
    return this.http.get(query);
  }
}
