import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroceriesService } from '../../services/groceries.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userDetails: any;
  groceryList: any;
  keyword = 'name';
  groceryServiceList: any;
  temptData: string[] = [];
  suggestions: any[] = [];

  nearByStore: any = {};

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    password2: new FormControl('', Validators.required),
    role: new FormControl('Customer'),
  });

  hyperlinks: any = {
    Customer: [{ name: 'View Orders', link: '/orders/view' }],
    Salesman: [
      { name: 'View All Orders', link: '/orders/view' },
      { name: 'Create Customer Account', link: '/sales/createUser' },
    ],
    'Store Manager': [
      { name: 'View All Orders', link: '/orders/view' },
      { name: 'Manage Products', link: '/admin/manageProducts' },
      { name: 'Review Visualisation', link: '/admin/reviewVisualisation' },
      { name: 'Inventory Visualisation', link: '/admin/inventory' },
      { name: 'Dashboard', link: '/admin/dashboard' },
    ],
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private groceryService: GroceriesService
  ) {
    this.groceryServiceList = JSON.parse(
      localStorage.getItem('groceryList') || '{}'
    );
    this.nearByStore = this.authService.nearStore;
    this.authService.nearMeStore.subscribe((d) => {
      this.nearByStore = d;
    });
    if (this.authService.isLoggedIn()) {
      this.userDetails = this.authService.userDetails;
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.authService.userInfo.subscribe((ui) => {
      console.log('here   ', ui);
      if (ui) {
        this.userDetails = ui;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  selectedEvent(event: any) {
    this.groceryService.pushSearchHistory(event)
    this.router.navigate(['/home/grocery', event!.id]);
  }

  onChangeSearch(value: string) {
    this.groceryService
      .groceryAutoComplete(value, this.nearByStore.id)
      .subscribe((result) => {
        this.groceryList = result;
        console.log(this.groceryList);
      });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }

  onSearchChanges(event: any): void {
    console.log(this.groceryServiceList);
    console.log(event.target!.value);

    console.log(this.temptData);
    this.suggestions = this.groceryServiceList.filter(
      (item: { name: string }) => item.name.startsWith(event.target!.value)
    );
    console.log(this.suggestions);
  }

  onSubmit(): void {
    console.log('on Submit Called');

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).then(
        (result) => {
          this.modalService.dismissAll();
          this.router.navigate(['home']);
        },
        (err: Error) => {
          alert('Failed to login.');
        }
      );
    }
  }

  open(login: any) {
    this.modalService.open(login, { centered: true });
  }

  submitSignup(): void {
    if (
      this.signupForm.get('password')!.value ==
      this.signupForm.get('password2')!.value
    ) {
      this.signupForm.get('password')?.setErrors(null);
      this.signupForm.get('password2')?.setErrors(null);
    }
    console.log(
      this.signupForm.get('password')!.value ==
        this.signupForm.get('password2')!.value
    );
    console.log(this.signupForm.valid);
    if (
      this.signupForm.valid &&
      this.signupForm.get('password')!.value ==
        this.signupForm.get('password2')!.value
    ) {
      this.authService.signup(this.signupForm.value).subscribe(
        (result) => {
          alert('Registration Successful.');
          this.modalService.dismissAll();
          this.router.navigate(['home']);
        },
        (err: Error) => {
          console.error(err.message);
        }
      );
    } else {
      this.signupForm.get('password')!.markAsDirty;
      this.signupForm.get('password')?.setErrors({ incorrect: true });
      this.signupForm.get('password2')?.setErrors({ incorrect: true });
      this.signupForm.get('password2')!.markAsDirty;
    }
  }
  openSignUpModal(signup: any) {
    this.modalService.dismissAll();
    this.modalService.open(signup, { centered: true });
  }

  openLoginModal(login: any) {
    this.modalService.dismissAll();
    this.modalService.open(login, { centered: true });
  }

  closeModals() {
    this.modalService.dismissAll();
  }
  clearSuggestions() {
    window.setTimeout(() => {
      this.suggestions.length = 0;
    }, 500);
  }
}
