import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config';

const BASE_URL = `${config.api.url}${config.proposal.mainEndpoint}`;

@Injectable({
  providedIn: 'root',
})
export class ProposalService {

  constructor(protected http: HttpClient) { }

  public getAllByOpportunity(opportunityId: string, limit: number, page: number,
    q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL}${config.proposal.opportunity}${opportunityId}` +
      `?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }

  public save(data: any) {
    return this.http.post(`${BASE_URL}`, data);
  }

}
