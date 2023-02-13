import { formatDate } from '@angular/common';
import { OrderService } from './../../../shared/shared/services/order.service';
import { AuthService } from './../../../shared/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss'],
})
export class ViewOrdersComponent implements OnInit {
  orders: any;
  downloadUrl: any;
  userDetails: any;
  constructor(
    private AuthService: AuthService,
    private OrderService: OrderService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (
      this.AuthService.isLoggedIn() &&
      this.AuthService.userDetails.role == 'Customer'
    ) {
      this.OrderService.getCustomerOrders().subscribe((res) => {
        this.orders = res;
        console.log(res);
      });
    } else {
      this.OrderService.getAllOrders().subscribe((res) => {
        this.orders = res;

        var theJSON = JSON.stringify(res);
        var uri = this.sanitizer.bypassSecurityTrustUrl(
          'data:text/json;charset=UTF-8,' + encodeURIComponent(theJSON)
        );
        this.downloadUrl = uri;
      });
    }
    this.userDetails = this.AuthService.userDetails;
    console.log(this.userDetails);
  }
  handleOrderDelete(orderId: any) {
    var remainingOrders: any[] = [];
    this.orders.forEach((order: any) => {
      if (order.id != orderId) {
        remainingOrders.push(order);
      }
    });
    this.orders = remainingOrders;
  }
  handleOrderItemDelete(orderItemDetails: any) {
    this.orders.forEach((order: any) => {
      if (orderItemDetails.orderId == order.id) {
        var itemList: any[] = [];
        order.orderDetails.forEach((item: any) => {
          if (item.id != orderItemDetails.orderItemId) {
            itemList.push(item);
          }
        });
        order.orderDetails = itemList;
      }
    });
  }
}
