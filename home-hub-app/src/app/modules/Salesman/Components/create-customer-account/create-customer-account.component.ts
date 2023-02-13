import { AdminService } from './../../../shared/shared/services/admin.service';
import { AuthService } from './../../../shared/shared/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-customer-account',
  templateUrl: './create-customer-account.component.html',
  styleUrls: ['./create-customer-account.component.scss'],
})
export class CreateCustomerAccountComponent implements OnInit {
  public customerUser = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl('Customer', Validators.required),
  });
  constructor(
    private AuthService: AuthService,
    private AdminService: AdminService
  ) {}

  ngOnInit(): void {}

  handleFormSubmit() {
    //If this does not work check if you're logged in as a customer or a salesman
    if (
      this.customerUser.valid &&
      this.AuthService.userDetails.role != 'Customer'
    ) {
      this.AdminService.createCustomerAccount(
        this.customerUser.value
      ).subscribe((res) => {
        console.log(res);
        alert('Account Created Successfully.');
      });
    }
  }
}
