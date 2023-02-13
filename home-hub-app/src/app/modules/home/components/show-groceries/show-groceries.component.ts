import { CartService } from './../../../shared/shared/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { GroceriesService } from "../../../shared/shared/services/groceries.service";
import { AuthService } from "../../../shared/shared/services/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-show-groceries',
  templateUrl: './show-groceries.component.html',
  styleUrls: ['./show-groceries.component.scss']
})
export class ShowGroceriesComponent implements OnInit {

  categories = [
    'Hand Tools',
    'Computer Accessories',
    'Diagnostic and Test Tools',
    'Automotive Electrical',
  ]

  groceries: any;

  filter: any = {
    category: '',
    sortBy: 'desc',
    rating: 0,
    discount: 0,
  }

  clickedGroceryId = '';

  recentlyAdded: any = [];

  reviewForm = new FormGroup({
    review: new FormControl('', Validators.required),
    rating: new FormControl(0, Validators.required),
  });

  recomendations: any = []

  constructor(private router: Router,
    private authService: AuthService,
    private groceryService: GroceriesService,
    private modalService: NgbModal,
    private CartService: CartService) {

    this.authService.nearMeStore.subscribe(d => {
      this.getGroceries();
    })

    this.groceryService.recentlyAdded().subscribe(res => {
      this.recentlyAdded = res;
    })
  }

  ngOnInit(): void {
    this.getGroceries();
  }

  getGroceries() {
    this.groceryService.getAllGroceries(this.filter).subscribe(res => {
      console.log("Res is : ")
      this.groceries = res;
      this.generateRecomentations(this.groceryService.getSearchHistory())
    })
  }

  searchByCategory(cat: string) {
    this.filter.category = cat;
    this.getGroceries();
  }

  sortBy(sort: string) {
    this.filter.sortBy = sort;
    this.getGroceries();
  }


  rating(rating: any) {
    this.filter.rating = rating;
    this.getGroceries();
  }

  discounts(discounts: any) {
    this.filter.discount = discounts;
    this.getGroceries();
  }

  viewGrocery(id: any) {
    this.router.navigate(['/home/grocery', id]);
  }

  onWriteReview() {
    this.groceryService.writeReview(this.reviewForm.value, this.clickedGroceryId).subscribe(d => {
      console.log(d);
      this.closeModals();
    })
  }

  openReviewModal(writeReview: any, id: any) {
    this.modalService.dismissAll();
    this.clickedGroceryId = id;
    this.modalService.open(writeReview, { centered: true });
  }

  closeModals() {
    this.modalService.dismissAll();
  }

  AddToCart(grocery: any, event: any) {
    console.log("Add to cart Called");
    var price = grocery.discount != 0 ? (grocery.price - grocery.price / 100 * grocery.discount).toFixed(2) : grocery.price;
    var cartItem = { "addedOn": new Date().toISOString(), "addedBy": this.authService.userDetails, "grocery": grocery, "quantity": 1, price: price };
    console.log(cartItem);

    this.CartService.addGroceryToCart(cartItem).subscribe((res) => {
      var result = JSON.parse(JSON.stringify(res));
      if (result.id != null) {
        console.log("Added to Cart");
        event.target.innerHTML = "Added to Cart";
        event.target.classList.value = "btn btn-success";
        window.setTimeout(() => {
          event.target.innerHTML = "Add +";
          event.target.classList.value = "btn btn-primary";
        }, 1000);
      }
    });
  }

  generateRecomentations(searchedProducts: any) {
    this.recomendations = this.recentlyAdded.filter((x: any) => searchedProducts.some((y: any) => (y.category === x.category)));
  }

  showRatings(){
    this.router.navigate(['/home/ratings']);

  }
  showTraining(){
    this.router.navigate(['/home/training']);
  }

}
