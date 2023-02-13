import {InventoryVisualisationComponent} from './Components/inventory-visualisation/inventory-visualisation.component';
import {ReviewVisualisationComponent} from './Components/review-visualisation/review-visualisation.component';
import {StoreManagerComponent} from './Components/store-manager/store-manager.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageProductsComponent} from './Components/manage-products/manage-products.component';
import {AdminDashboardComponent} from "./Components/admin-dashboard/admin-dashboard.component";
import {DataFilterComponent} from "./Components/data-filter/data-filter.component";

const routes: Routes = [
  {
    path: '',
    component: StoreManagerComponent,
    children: [
      {path: 'reviewVisualisation', component: ReviewVisualisationComponent},
      {path: 'manageProducts', component: ManageProductsComponent},
      {path: 'inventory', component: InventoryVisualisationComponent},
      {path: 'dashboard', component: AdminDashboardComponent},
      {path: 'dataFilter', component: DataFilterComponent},
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreManagerRoutingModule {
}
