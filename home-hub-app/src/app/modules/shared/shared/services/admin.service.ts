import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  createCustomerAccount(accountDetails: any) {
    return this.http.post(
      `${environment.baseUrl}/api/user/create`,
      accountDetails
    );
  }

  getCustomerSuggestions(nameInput: any) {
    return this.http.post(
      `${environment.baseUrl}/api/user/getSuggestions/`,
      nameInput
    );
  }

  getAllGroceries() {
    return this.http.get(`${environment.baseUrl}/groceries/getAllGroceries`);
  }

  updateOrderDeliveryDate(orderId: any, updatedDate: any) {
    return this.http.post(
      `${environment.baseUrl}/orders/updateOrder/${orderId}/${updatedDate}`,
      ''
    );
  }
}
