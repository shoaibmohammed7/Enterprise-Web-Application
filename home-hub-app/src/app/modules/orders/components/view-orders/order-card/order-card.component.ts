import { AdminService } from './../../../../shared/shared/services/admin.service';
import { OrderService } from './../../../../shared/shared/services/order.service';
import { AuthService } from './../../../../shared/shared/services/auth.service';
import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
})
export class OrderCardComponent implements OnInit {
  @Input() order: any;
  @Input() userDetails: any;
  @Output() deleteOrderEvent = new EventEmitter<any>();
  @Output() deleteOrderitemEvent = new EventEmitter<any>();
  constructor(
    private AuthService: AuthService,
    private OrderService: OrderService,
    private AdminService: AdminService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.order.currentValue);
  }

  isCancellationValid(deliveryDate: Date) {
    return new Date(deliveryDate) > new Date();
  }
  getFormattedDate(purchaseDate: any) {
    return formatDate(purchaseDate, 'MMMM dd, YYYY', 'en-US');
  }

  deleteOrder(orderId: any) {
    this.OrderService.cancelOrder(orderId).subscribe((res) => {
      this.deleteOrderEvent.emit(orderId);
    });
  }

  deleteOrderItem(orderItemId: any, orderId: any) {
    if (this.order.orderDetails.length == 1) {
      this.deleteOrder(this.order.id);
    } else {
      this.OrderService.cancelOrderItem(orderItemId, orderId).subscribe(
        (res) => {
          this.deleteOrderitemEvent.emit({
            orderItemId: orderItemId,
            orderId: this.order.id,
          });
        }
      );
    }
  }

  get Total() {
    let total = 0;
    this.order.orderDetails.forEach((item: any) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  }

  getDeliveryDate(deliverydate: any) {
    var d = new Date(deliverydate);
    return formatDate(d, 'yyyy-MM-dd', 'en-US');
  }

  handleUpdateOrder(event: any) {
    event.preventDefault();
    var updatedDate = new Date(event.target.deliveryDate.value);
    updatedDate = new Date(
      updatedDate.getFullYear(),
      updatedDate.getMonth(),
      updatedDate.getDate() + 1
    );
    var updatedDateString = formatDate(
      updatedDate,
      'yyyy-MM-ddTHH:mm:ss',
      'en-US'
    );
    this.AdminService.updateOrderDeliveryDate(
      this.order.id,
      updatedDateString
    ).subscribe((res) => {
      console.log(res);
      this.order.deliveryDate = updatedDate;
    });
  }
  deliveryAheadOfToday(deliveryDate: any) {
    var d = new Date(deliveryDate);
    return d > new Date();
  }
}
