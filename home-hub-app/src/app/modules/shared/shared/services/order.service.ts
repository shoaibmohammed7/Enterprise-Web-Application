import { environment } from './../../../../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createOrder(orderDetails: any) {
    console.log('add to cart Called');
    let loggedIn = this.authService.isLoggedIn();
    console.log(orderDetails);

    if (loggedIn) {
      return this.http.post(`${environment.baseUrl}/orders`, orderDetails);
    } else {
      return new Observable();
    }
  }

  getCustomerOrders() {
    let loggedIn = this.authService.isLoggedIn();
    if (loggedIn) {
      return this.http.get(
        `${environment.baseUrl}/orders/viewCustomerOrders/${this.authService.userDetails.id}`
      );
    } else {
      return new Observable();
    }
  }

  getAllOrders() {
    let loggedIn = this.authService.isLoggedIn();
    if (loggedIn) {
      return this.http.get(`${environment.baseUrl}/orders`);
    } else {
      return new Observable();
    }
  }

  cancelOrder(orderId: any) {
    let loggedIn = this.authService.isLoggedIn();
    if (loggedIn) {
      return this.http.post(
        `${environment.baseUrl}/orders/${orderId}/cancel`,
        ''
      );
    } else {
      return new Observable();
    }
  }

  cancelOrderItem(orderItemId: any, orderId: any) {
    let loggedIn = this.authService.isLoggedIn();
    if (loggedIn) {
      return this.http.post(
        `${environment.baseUrl}/orders/cancelOrderGrocery/${orderItemId}/${orderId}`,
        ''
      );
    } else {
      return new Observable();
    }
  }
}
