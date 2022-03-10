import { Injectable } from '@angular/core';
import { config } from 'app/config';
import { HttpClient } from '@angular/common/http';
import { IPaymentMethod } from 'app/shared/models/payment-method.model';
const BASE_URL = `${config.api.url}${config.paymentMethod.mainEndpoint}`;
@Injectable({
  providedIn: 'root',
})
export class PaymentMethodService {

  constructor(protected http: HttpClient) { }


  public create(data: IPaymentMethod) {
    return this.http.post(`${BASE_URL}`, data);
  }

  public update(data: IPaymentMethod, id: string) {
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
}
