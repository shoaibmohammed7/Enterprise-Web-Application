import { FormControl, FormGroup } from '@angular/forms';
import { GroceriesService } from '../../../shared/shared/services/groceries.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private groceriesService: GroceriesService
  ) {}

  grocery: any;

  stores: any = [];

  category = [
    'Hand Tools',
    'Computer Accessories',
    'Diagnostic and Test Tools',
    'Automotive Electrical',
  ];

  createProductForm: any;

  UpdateProductForm: any;

  ngOnInit(): void {
    this.groceriesService.getStores().subscribe((str) => {
      this.stores = str;
      this.createProductForm = new FormGroup({
        name: new FormControl(),
        id: new FormControl(),
        description: new FormControl(),
        price: new FormControl(),
        category: new FormControl(this.category[0]),
        discount: new FormControl(),
        rating: new FormControl(),
        imageUrl: new FormControl(),
        parentId: new FormControl(),
        availableCount: new FormControl(),
        store: new FormGroup({ id: new FormControl(this.stores[0].id) }),
      });

      this.UpdateProductForm = new FormGroup({
        name: new FormControl(),
        id: new FormControl(),
        description: new FormControl(),
        price: new FormControl(),
        category: new FormControl(this.category[0]),
        discount: new FormControl(),
        rating: new FormControl(),
        imageUrl: new FormControl(),
        parentId: new FormControl(),
        availableCount: new FormControl(),
        store: new FormGroup({ id: new FormControl(this.stores[0].id) }),
      });
    });
  }

  handleGetProduct(prodId: any) {
    this.route.params.subscribe((params) => {
      this.groceriesService.getGrocery(prodId).subscribe((res) => {
        console.log(res);
        this.grocery = res;
        this.UpdateProductForm.patchValue(this.grocery);
      });
    });
  }

  handleProductDelete(id: any) {
    this.groceriesService.deleteGrocery(id).subscribe((d) => {
      console.log(d);
      alert('Product Deleted Successfully.');
    });
  }

  updateProduct() {
    this.groceriesService
      .createGrocery(this.UpdateProductForm.value)
      .subscribe((d) => {
        console.log(d);
        alert('Product Updated Successfully.');
      });
  }

  createNewProduct() {
    this.groceriesService
      .createGrocery(this.createProductForm.value)
      .subscribe((d) => {
        console.log(d);
        alert('Product Created Successfully.');
      });
  }
}
