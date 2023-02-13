import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/shared/services/auth.service";
import {GroceriesService} from "../../../shared/shared/services/groceries.service";

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.scss']
})
export class DataFilterComponent implements OnInit {

  groceries: any;

  filter: any = {
    category: '',
    sortBy: 'desc',
    rating: 0,
    discount: 0,
  }

  constructor(private router: Router,
              private authService: AuthService,
              private groceryService: GroceriesService) {

    this.authService.nearMeStore.subscribe(d => {
      this.getGroceries();
    })
  }

  ngOnInit(): void {
    this.getGroceries();
  }

  getGroceries() {
    this.groceryService.getAllGroceries(this.filter).subscribe(res => {
      this.groceries = res;
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
}
