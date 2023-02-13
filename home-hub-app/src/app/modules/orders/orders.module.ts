import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SharedModule } from '../shared/shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderCardComponent } from './components/view-orders/order-card/order-card.component';

@NgModule({
  declarations: [ViewOrdersComponent, OrdersComponent, OrderCardComponent],
  imports: [CommonModule, SharedModule, OrdersRoutingModule],
})
export class OrdersModule {}
