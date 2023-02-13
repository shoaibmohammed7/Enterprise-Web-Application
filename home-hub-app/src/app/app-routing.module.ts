import { StoreManagerModule } from './modules/StoreManager/store-manager.module';
import { SalesmanModule } from './modules/Salesman/salesman.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./modules/orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'sales',
    loadChildren: () =>
      import('./modules/Salesman/salesman.module').then(
        (m) => m.SalesmanModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/StoreManager/store-manager.module').then(
        (m) => m.StoreManagerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
