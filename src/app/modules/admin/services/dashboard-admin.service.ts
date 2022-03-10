import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from 'app/config';
import { OpportunityStatus } from 'app/shared/enums/opportunity-status.enum';

const BASE_URL = `${config.api.url}${config.dashboard.mainEndpoint}`;

@Injectable({
  providedIn: 'root',
})
export class DashboardAdminService {

  constructor(protected http: HttpClient) { }

  public getDashboardAdmin(status: string, userId) {
    return this.http.get(`${BASE_URL}${config.dashboard.admin}${status}/${userId}`);
  }

  public getDashboardUsers(idUser: string) {
    return this.http.get(`${BASE_URL}${config.dashboard.users}${idUser}`);
  }
}


