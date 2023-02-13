import { Observable } from 'rxjs';
import { environment } from './../../../../../environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  addGroceryToCart(grocery:any){
    console.log("add to cart Called");
    let loggedIn = this.authService.isLoggedIn();
    if(loggedIn){
       return this.http.post(`${environment.baseUrl}/cart/addToCart`, grocery);
    } else{
      return new Observable();
    }
  }

  getCustomerCart(){
    let loggedIn = this.authService.isLoggedIn();
    if(loggedIn){
      console.log(this.authService.userDetails.id);
       return this.http.get(`${environment.baseUrl}/cart/getCartItems/${this.authService.userDetails.id}`);
    } else{
      return new Observable();
    }
  }
  removeCartItem(id: any){
    let loggedIn = this.authService.isLoggedIn();
    if(loggedIn){
      console.log(this.authService.userDetails.id);
       return this.http.delete(`${environment.baseUrl}/cart/removeCartItem/${id}`);
    } else{
      return new Observable();
    }
  }
}
