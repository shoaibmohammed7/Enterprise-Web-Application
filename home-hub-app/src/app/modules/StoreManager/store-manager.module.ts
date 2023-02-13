import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreManagerRoutingModule } from './store-manager-routing.module';
import { SharedModule } from './../shared/shared/shared.module';
import { CommonModule } from '@angular/common';
import { StoreManagerComponent } from './Components/store-manager/store-manager.component';
import { ReviewVisualisationComponent } from './Components/review-visualisation/review-visualisation.component';
import { InventoryVisualisationComponent } from './Components/inventory-visualisation/inventory-visualisation.component';
import { NgModule } from '@angular/core';
import { ManageProductsComponent } from './Components/manage-products/manage-products.component';
import { SalesVisualisationComponent } from './Components/sales-visualisation/sales-visualisation.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { DataFilterComponent } from './Components/data-filter/data-filter.component';

@NgModule({
  declarations: [
    StoreManagerComponent,
    ReviewVisualisationComponent,
    InventoryVisualisationComponent,
    ManageProductsComponent,
    AdminDashboardComponent,
    SalesVisualisationComponent,
    DataFilterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreManagerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgbDropdownModule,
    NgbModule,
    NgxChartsModule,
  ],
})
export class StoreManagerModule {}
