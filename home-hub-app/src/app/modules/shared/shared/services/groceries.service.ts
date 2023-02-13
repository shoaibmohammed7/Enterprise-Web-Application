import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GroceriesService {
  selectedStore: any;
  searchedProducts:any=[]

  constructor(private http: HttpClient, private authService: AuthService) {
    this.selectedStore = this.authService.nearStore;
    this.authService.nearMeStore.subscribe((d) => {
      this.selectedStore = d;
    });
  }

  getAllGroceries(filter: any) {
    return this.http.get(
      `${environment.baseUrl}/groceries?category=${filter.category}&sortBy=${filter.sortBy}&rating=${filter.rating}&discount=${filter.discount}&storeId=${this.authService.nearStore.id}`
    );
  }

  writeReview(review: any, id: any) {
    return this.http.post(
      `${environment.baseUrl}/groceries/${id}/review`,
      review
    );
  }

  getGrocery(id: any) {
    return this.http.get(`${environment.baseUrl}/groceries/${id}`);
  }

  groceryAutoComplete(searchText: string, storeId: any) {
    return this.http.get(
      `${environment.baseUrl}/groceries/getGroceryList/${searchText}`
    );
  }
  storeAutoComplete(searchText: string) {
    return this.http.get(
      `${environment.baseUrl}/stores/getStoresList/${searchText}`
    );
  }

  deleteGrocery(id: any) {
    return this.http.delete(`${environment.baseUrl}/groceries/${id}`);
  }

  getStores() {
    return this.http.get(`${environment.baseUrl}/stores`);
  }

  getAllNearMeStores(lat: any, lon: any) {
    return this.http.get(
      `${environment.baseUrl}/stores/allNearMe?lat=${lat}&lon=${lon}`
    );
  }

  createGrocery(grocery: any) {
    console.log(grocery);
    return this.http.post(`${environment.baseUrl}/groceries`, grocery);
  }

  getCompleteGroceries() {
    return this.http.get(`${environment.baseUrl}/groceries/getAllGroceries`)
  }
  // groceryAutoComplete(searchText: string) {
  //   return this.http.get(
  //     `${environment.baseUrl}/groceries/getGroceryList/${searchText}`
  //   );
  // }

  getReviews(id: any) {
    return this.http.get(`${environment.baseUrl}/groceries/${id}/review`);
  }

  getCountStats() {
    return this.http.get(`${environment.baseUrl}/stats/count`);
  }

  getorderTrend() {
    return this.http.get(`${environment.baseUrl}/stats/orderTrend`);
  }

  orderByPinCode() {
    return this.http.get(`${environment.baseUrl}/stats/orderByPinCode`);
  }

  topRatedProducts() {
    return this.http.get(`${environment.baseUrl}/stats/topRatedProducts`);
  }

  getRecommendedGrocery(id: any) {
    return this.http.get(`${environment.baseUrl}/orders/${id}/recommendation`);
  }

  recentlyAdded() {
    return this.http.get(`${environment.baseUrl}/groceries/recentlyAdded`);
  }

  reviewvisualisation(value: any) {
    return this.http.post(`${environment.baseUrl}/stats/reviewstats`, value);
  }

  getorderdsalesTrend() {
    return this.http.get(`${environment.baseUrl}/stats/orderSalesTrend`);
  }

  pushSearchHistory(product:any){
    this.searchedProducts.push(product)
  }
  getSearchHistory(){
    return this.searchedProducts
  }

}
