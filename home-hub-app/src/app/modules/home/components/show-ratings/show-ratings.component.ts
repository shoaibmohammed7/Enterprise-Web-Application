import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/shared/shared/services/auth.service';
import { GroceriesService } from 'src/app/modules/shared/shared/services/groceries.service';
import { CartService } from './../../../shared/shared/services/cart.service';
import { OrderService } from './../../../shared/shared/services/order.service';

@Component({
  selector: 'app-show-ratings',
  templateUrl: './show-ratings.component.html',
  styleUrls: ['./show-ratings.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ShowRatingsComponent implements OnInit {
  groceries: any = []
  columnsToDisplay = ['name', 'rating'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any;
  topProducts: any = []
  topProductsByZip: any = []
  ratings: any = []
  orders: any = []
  displayedColumns: string[] = ['name', 'count'];
  allProducts:any = []
  topProductsBysale:any = []

  constructor(private groceryService: GroceriesService,
    private router: Router,
    private CartService: CartService,
    private authService: AuthService,
    private OrderService: OrderService,
  ) {
  }

  ngOnInit(): void {
    this.getGroceries();
    this.getAllOrders()


  }

  getGroceries() {
    this.groceryService.getCompleteGroceries().subscribe(res => {
      console.log("Res is : ")
      this.groceries = res;
      for (let i = 0; i < this.groceries.length; i++) {
        if (!this.groceries[i].rating) {
          this.groceries[i].rating = 0.0
        }
        this.groceries[i].rating = (Math.round(this.groceries[i].rating * 100) / 100)
      }
      this.deriveTopProducts()
    })
  }

  getAllOrders() {
    this.OrderService.getAllOrders().subscribe((res) => {
      this.orders = res;
      // console.log("this.orders", this.orders)


      var p = this.orders.reduce((counts:any, res:any) => {
        var zipCode = res.zipCode;
        if (!counts.hasOwnProperty(zipCode)) {
          counts[zipCode] = 0;
        }
        counts[zipCode]++;
        return counts;
      }, {});

      this.topProductsByZip = Object.keys(p).map(k => {
        return { name: k, count: p[k] };
      });
      this.topProductsByZip=this.topProductsByZip.slice(0,5)
      // console.log(this.topProductsByZip);
      let orderedProducts=[]
      for(let i=0;i<this.orders.length;i++){
        // console.log(this.orders[i].orderDetails)
      for(let j=0;j<this.orders[i].orderDetails.length;j++){
        // console.log(this.orders[i].orderDetails[j].grocery)
        orderedProducts.push(this.orders[i].orderDetails[j].grocery)
      }
        // orderedProducts
      }
      // console.log(orderedProducts)

      var p = orderedProducts.reduce((counts:any, orderedProducts:any) => {
        var id = orderedProducts.name;
        if (!counts.hasOwnProperty(id)) {
          counts[id] = 0;
        }
        counts[id]++;
        return counts;
      }, {});

      this.topProductsBysale = Object.keys(p).map(k => {
        return { name: k, count: p[k] };
      });
      
      this.topProductsBysale.sort(function (a: any, b: any) {
        return b.count - a.count;
      })
      this.topProductsBysale = this.topProductsBysale.slice(0,5)
      console.log(this.topProductsBysale);




    });
  }

  viewGrocery(id: any) {
    this.router.navigate(['/home/grocery', id]);
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

  deriveTopProducts() {
    this.topProducts = this.groceries

    this.topProducts.sort(function (a: any, b: any) {
      return b.rating - a.rating;
    })

    this.topProducts = this.topProducts.slice(0, 5)

    this.ratings.push({ name: "Best Products", data: this.topProducts })

    // this.ratings.push({ name: "Most Sold Product by ZIPcode", data: this.topProductsByZip })
  }

}