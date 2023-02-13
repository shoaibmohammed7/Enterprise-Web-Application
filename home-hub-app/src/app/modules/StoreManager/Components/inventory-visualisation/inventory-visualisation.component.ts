import { AdminService } from './../../../shared/shared/services/admin.service';
import { AuthService } from './../../../shared/shared/services/auth.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-visualisation',
  templateUrl: './inventory-visualisation.component.html',
  styleUrls: ['./inventory-visualisation.component.scss'],
})
export class InventoryVisualisationComponent implements OnInit, AfterViewInit {
  productsList: any;
  saleProductList: any[] = [];
  chartData: any[] = [];
  test: any;
  constructor(
    private AuthService: AuthService,
    private AdminService: AdminService
  ) {}

  ngOnInit(): void {
    //if (this.AuthService.userDetails.role == 'Store Manager') {
    this.AdminService.getAllGroceries().subscribe((res: any) => {
      //console.log(res);
      this.productsList = res;
      this.productsList.forEach((product: any) => {
        this.chartData.push({
          name: product.name,
          value: product.price.toFixed(0),
        });
        if (product.discount != 0) {
          this.saleProductList.push(product);
        }
      });
      console.log(this.chartData);
    });
    //}
    //this.chartData = [{ name: 'Product Name', series: this.chartData }];
  }

  ngAfterViewInit() {}
}
