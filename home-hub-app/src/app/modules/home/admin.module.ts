import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ShowGroceriesComponent } from './components/show-groceries/show-groceries.component';
import { CartComponent } from './components/cart/cart.component';
import { SharedModule } from '../shared/shared/shared.module';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GroceryDetailsComponent } from './components/grocery-details/grocery-details.component';
import { ShowStoresComponent } from './components/show-stores/show-stores.component';
import { AgmCoreModule } from '@agm/core';
import { ShowRatingsComponent } from './components/show-ratings/show-ratings.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule  } from '@angular/material/icon';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TrainingComponent } from './components/training/training.component';
@NgModule({
  declarations: [
    HomeComponent,
    ShowGroceriesComponent,
    CartComponent,
    GroceryDetailsComponent,
    ShowStoresComponent,
    ShowRatingsComponent,
    TrainingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgbDropdownModule,
    NgbModule,
    AutocompleteLibModule,
    MatTableModule ,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAH3eV0VbFFCSx8x6WKCRtrgGBtKWrkyUU',
    }),
  ],
})
export class AdminModule {}
