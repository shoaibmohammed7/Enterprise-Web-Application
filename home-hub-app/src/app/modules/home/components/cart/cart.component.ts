import { AdminService } from './../../../shared/shared/services/admin.service';
import { AuthService } from './../../../shared/shared/services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from './../../../shared/shared/services/order.service';
import { CartService } from './../../../shared/shared/services/cart.service';
import { AbstractControl, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userDetails: any;
  selectedCustomer: any;
  customerSuggestionsList: any;
  cityList = [
    'Aurora',
    'Joliet',
    'Naperville',
    'Rockford',
    'Elgin',
    'Springfield',
    'Peoria',
    'Waukegan',
    'Champaign',
    'Cicero',
    'Schaumburg',
    'Bloomington',
    'Evanston',
    'Arlington Heights',
    'Bolingbrook',
    'Decatur',
    'Palatine',
    'Skokie',
    'Des Plaines',
  ];
  constructor(
    private CartService: CartService,
    private OrderService: OrderService,
    private AuthService: AuthService,
    private Router: Router,
    private AdminService: AdminService
  ) {
    this.userDetails = this.AuthService.userDetails;
    this.selectedCustomer = this.AuthService.userDetails;
  }

  checkoutform = new FormGroup({
    customerName: new FormControl(''),
    addressLine1: new FormControl('', Validators.required),
    addressLine2: new FormControl(''),
    city: new FormControl('Chicago', Validators.required),
    state: new FormControl('Illinois (IL)', Validators.required),
    zipCode: new FormControl('', Validators.required),
    paymentMethod: new FormControl('Credit Card', Validators.required),
    cardHolderName: new FormControl('', Validators.required),
    cardNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(19),
      Validators.maxLength(19),
    ]),
    cardExpiry: new FormControl('', [
      Validators.required,
      Validators.maxLength(5),
      this.cardExpiryValidator,
    ]),
    cardCvv: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
    ]),
    deliveryType: new FormControl('Home Delivery', Validators.required),
  });

  ngOnInit(): void {
    this.CartService.getCustomerCart().subscribe((res) => {
      var result: any = res;
      result.forEach((cartItem: any) => {
        this.cartItems.push(cartItem);
      });
      console.log(this.cartItems);
    });
  }

  createOrder(event: any): void {
    //console.table(this.checkoutform.controls);
    if (
      this.AuthService.userDetails.role != 'Customer' &&
      this.selectedCustomer.role != 'Customer'
    ) {
      this.checkoutform.get('customerName')?.setErrors({ selectUser: true });
    } else {
      this.checkoutform.get('customerName')?.setErrors(null);
    }
    if (this.checkoutform.valid) {
      event.target.innerHTML =
        "<span class='spinner-border text-warning'><span class='sr-only'>Loading...</span></span>";
      event.target.disabled = true;
      var data = this.checkoutform.value;
      data.orderedBy = this.selectedCustomer;
      data.purchasedDate = new Date().toISOString();
      data.orderStatus = 'ORDERED';
      data.totalPrice = this.Total;
      data.deliveryDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() + 2
      );
      var orderitems: any = [];
      this.cartItems.forEach((item) => {
        var order = {
          grocery: item.grocery,
          price: item.price * item.quantity,
          quantity: item.quantity,
        };
        orderitems.push(order);
      });
      data.orderDetails = orderitems;
      this.OrderService.createOrder(data).subscribe((res) => {
        console.log('Order Created successfully');
        this.Router.navigate(['/orders/view']);
      });
    }
  }

  updateCardNumberFormat() {
    console.log('Update Format Method Called');

    var cNumber = this.checkoutform.get('cardNumber')?.value;
    if (cNumber.length < 19) {
      cNumber = cNumber.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
      this.checkoutform.get('cardNumber')?.setValue(cNumber);
    }
  }
  formatString() {
    var expiryString = this.checkoutform
      .get('cardExpiry')
      ?.value.replace(/^([1-9]\/|[2-9])$/g, '0$1/')
      .replace(/^(0[1-9]|1[0-2])$/g, '$1/')
      .replace(/^1([3-9])$/g, '01/$1')
      .replace(/^0\/|0+$/g, '0')
      .replace(/[^\d|^\/]*/g, '')
      .replace(/\/\//g, '/');
    this.checkoutform.get('cardExpiry')?.setValue(expiryString);
  }

  cardExpiryValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    var currentMonth = parseInt(formatDate(new Date(), 'MM', 'en-US'));
    var currentYear = parseInt(formatDate(new Date(), 'YY', 'en-US'));
    var userValue = control.value;
    userValue = userValue.split('/');
    userValue[0] = parseInt(userValue[0]);
    userValue[1] = parseInt(userValue[1]);
    if (
      (userValue[0] > currentMonth && userValue[1] == currentYear) ||
      userValue[1] > currentYear
    )
      return null;
    else return { expired: true };
  }

  get Total() {
    var total = 0;
    this.cartItems.forEach(function (item) {
      total += (item.quantity == undefined ? 1 : item.quantity) * item.price;
    });
    return total.toFixed(2);
  }

  removeItem(id: any) {
    this.CartService.removeCartItem(id).subscribe((res) => {
      var updateCart: any[] = [];
      this.cartItems.forEach(function (item, index) {
        if (item.id != id) {
          updateCart.push(item);
        }
      });
      this.cartItems = updateCart;
    });
  }

  searchCustomerAccount(event: any) {
    console.log(event.target.value);
    if (event.target.value != '' && event.target.value != undefined) {
      this.AdminService.getCustomerSuggestions(event.target.value).subscribe(
        (res) => {
          this.customerSuggestionsList = res;
        }
      );
    } else {
      this.customerSuggestionsList = null;
      this.selectedCustomer = null;
    }
  }

  handleCustomerSelect(c: any) {
    console.log(c);
    this.selectedCustomer = c;
    this.checkoutform.get('customerName')!.setValue(c.name);
    this.customerSuggestionsList = null;
  }
}
