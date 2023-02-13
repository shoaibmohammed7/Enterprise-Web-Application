import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared/shared.module';
import { SalesmanRoutingModule } from './salesman-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesmanComponent } from './Components/salesman/salesman.component';
import { CreateCustomerAccountComponent } from './Components/create-customer-account/create-customer-account.component';

@NgModule({
  declarations: [SalesmanComponent, CreateCustomerAccountComponent],
  imports: [
    CommonModule,
    SalesmanRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class SalesmanModule {}
