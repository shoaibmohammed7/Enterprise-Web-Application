import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ShowGroceriesComponent } from './components/show-groceries/show-groceries.component';
import { HomeComponent } from './components/home/home.component';
import { GroceryDetailsComponent } from './components/grocery-details/grocery-details.component';
import { ShowStoresComponent } from './components/show-stores/show-stores.component';
import { ShowRatingsComponent } from './components/show-ratings/show-ratings.component';
import { TrainingComponent } from './components/training/training.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ShowGroceriesComponent },
      { path: 'cart', component: CartComponent },
      { path: 'grocery', component: ShowGroceriesComponent },
      { path: 'grocery/:id', component: GroceryDetailsComponent },
      { path: 'stores', component: ShowStoresComponent },
      { path: 'ratings', component: ShowRatingsComponent },
      { path: 'training', component: TrainingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgbModule],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
