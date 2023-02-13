import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroceriesService } from './../../../shared/shared/services/groceries.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-visualisation',
  templateUrl: './review-visualisation.component.html',
  styleUrls: ['./review-visualisation.component.scss'],
})
export class ReviewVisualisationComponent implements OnInit {
  productSuggestions: any;

  reviewResp: any;

  isArray = true;

  reviewDetails = new FormGroup({
    productName: new FormControl(),
    pid: new FormControl(),
    rating: new FormControl(),
    ratingFilter: new FormControl(),
    price: new FormControl(),
    priceFilter: new FormControl(),
    city: new FormControl(),
    zipCode: new FormControl(),
    groupBy: new FormControl(),
    groupType: new FormControl(),
  });
  Array: any;
  constructor(private groceriesService: GroceriesService) {}

  ngOnInit(): void {}

  handleProductSelect(product: any) {
    this.reviewDetails.get('pid')!.setValue(product.id);
    this.reviewDetails.get('productName')?.setValue(product.name);
    this.productSuggestions = null;
  }

  getProductSuggestions(event: any) {
    if (event.target!.value != null && event.target!.value != '') {
      this.groceriesService
        .groceryAutoComplete(event.target!.value, 'RE-7fbIMVjMreVHkZip8cA')
        .subscribe((res: any) => {
          this.productSuggestions = res;
        });
    } else {
      this.productSuggestions = null;
      this.reviewDetails.get('pid')!.setValue('');
    }
  }
  handleFormClick() {
    console.log(this.reviewDetails.value);
    this.groceriesService
      .reviewvisualisation(this.reviewDetails.value)
      .subscribe((res: any) => {
        console.log(res);
        this.isArray = Array.isArray(res);
        this.reviewResp = res;
      });
  }

  isInteger(value: any) {
    return Array.isArray(value);
  }
}
