import { OrdersComponent } from './components/orders/orders.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [{
  path: '', component: OrdersComponent , children:[
    {path: 'view', component: ViewOrdersComponent}
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
