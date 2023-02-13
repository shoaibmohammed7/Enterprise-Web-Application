import {Component, OnInit} from '@angular/core';
import {GroceriesService} from "../../../shared/shared/services/groceries.service";
import {LegendPosition} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {


  orderTrendData: any = [];
  orderSalesTrendData: any = [];
  ordersByPinCode: any = [];
  totalOrdersOverview: any = [];

  pos = LegendPosition.Right;

  countStats: any = {};
  topRatedProducts: any = [];

  constructor(private groceriesService: GroceriesService) {
  }

  ngOnInit(): void {
    this.groceriesService.getCountStats().subscribe(res => {
      this.countStats = res;
    })
    this.groceriesService.getorderTrend().subscribe((res: any) => {
      this.orderTrendData = [{
        "name": "Orders",
        "series": res
      }];

      this.ordersByPinCode = [...res];
    })

    this.groceriesService.getorderdsalesTrend().subscribe((res: any) => {
      this.orderSalesTrendData = [{
        "name": "Sales",
        "series": res
      }];
    })


    this.groceriesService.orderByPinCode().subscribe((res: any) => {
      this.ordersByPinCode = res;
      this.totalOrdersOverview = res.slice(0, 4);
    })
    this.groceriesService.topRatedProducts().subscribe((res: any) => {
      this.topRatedProducts = res;
    })
  }

}
