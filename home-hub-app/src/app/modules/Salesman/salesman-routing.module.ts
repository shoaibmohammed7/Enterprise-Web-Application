import { CreateCustomerAccountComponent } from './Components/create-customer-account/create-customer-account.component';
import { SalesmanComponent } from './Components/salesman/salesman.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: SalesmanComponent,
    children: [
      { path: 'createUser', component: CreateCustomerAccountComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesmanRoutingModule {}
