import { AuthService } from './../../../shared/shared/services/auth.service';
import { CartService } from './../../../shared/shared/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { GroceriesService } from "../../../shared/shared/services/groceries.service";

@Component({
  selector: 'app-grocery-details',
  templateUrl: './grocery-details.component.html',
  styleUrls: ['./grocery-details.component.scss']
})
export class GroceryDetailsComponent implements OnInit {
  id: any;
  grocery: any;
  reviews: any = [];
  recomendations: any = [];
  cartMessage = "Add To Cart";
  isAddedToCart = false;

  constructor(private route: ActivatedRoute, private groceriesService: GroceriesService, private CartService: CartService, private AuthService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.groceriesService.getGrocery(this.id).subscribe(res => {
        this.grocery = res;
      })
      this.groceriesService.getRecommendedGrocery(this.id).subscribe(res => {
        this.recomendations = res;
      })
      this.groceriesService.getReviews(this.id).subscribe(res => {
        this.reviews = res;
        this.reviews.sort(function (a: any, b: any) {
          return b.rating - a.rating;
        })
      })
    });
  }

  AddToCart(grocery: any) {
    console.log("Add to cart Called");
    var price = grocery.discount != 0 ? (grocery.price - grocery.price / 100 * grocery.discount).toFixed(2) : grocery.price;
    var cartItem = { "addedOn": new Date().toISOString(), "addedBy": this.AuthService.userDetails, "grocery": grocery, "quantity": 1, price: price };
    console.log(cartItem);

    this.CartService.addGroceryToCart(cartItem).subscribe((res) => {
      var result = JSON.parse(JSON.stringify(res));
      if (result.id != null) {
        console.log("Added to Cart");
        this.cartMessage = "Added To Cart";
        this.isAddedToCart = true;
        window.setTimeout(() => {
          this.cartMessage = "Add To Cart";
          this.isAddedToCart = false;
        }, 2000);
      }
    });

  }

}
