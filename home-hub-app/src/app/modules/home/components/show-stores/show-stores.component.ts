import { Component, OnInit } from '@angular/core';
import { GroceriesService } from '../../../shared/shared/services/groceries.service';
import { AuthService } from '../../../shared/shared/services/auth.service';

@Component({
  selector: 'app-show-stores',
  templateUrl: './show-stores.component.html',
  styleUrls: ['./show-stores.component.scss'],
})
export class ShowStoresComponent implements OnInit {
  stores: any = [];
  clat: any;
  clon: any;
  cRadius = 1500;
  cZoom = 13;
  keyword = 'name';
  allStores: any = []
  searched: boolean = false
  searchHistory: any = []
  recomendedStores: any = []

  constructor(
    private groceryService: GroceriesService,
    private auth: AuthService
  ) {
    this.getStores();
  }

  ngOnInit(): void {
    this.auth.nearMeStore.subscribe((red) => {
      this.getStores();
    });
  }

  getStores() {
    this.groceryService
      .getAllNearMeStores(this.auth.lat, this.auth.lon)
      .subscribe((str) => {
        this.clat = this.auth.lat;
        this.clon = this.auth.lon;
        this.stores = this.prepareUnique(str);
        this.allStores = this.stores
        // this.prepareUnique(str)
        console.log('Stores', this.stores);
      });
  }

  updateLocation(st: any) {
    this.clat = st.latitude;
    this.clon = st.longitude;
  }

  changeLocation(st: any) {
    this.auth.setNearMeStore(st);
  }

  onChangeSearch(value: string) {
    this.stores = []
    console.log(value)
    if (value != '') {
      this.groceryService
        .storeAutoComplete(value)
        .subscribe((result) => {
          this.stores = result;
          // console.log(this.stores);
        });
    }
    else {
      this.stores = this.allStores
    }

  }

  prepareUnique(stores: any) {
    return [...new Map(stores.map((item: any) =>
      [item['name'], item])).values()];
  }

  selectedEvent(store: any) {
    this.stores = []
    if (store) {
      console.log(store.name.split(' '))
      this.stores.push(store)
      this.updateLocation(store)
      this.searched = true
      let sugs = store.name.split(' ')
      for(let i=0;i<sugs.length;i++){
        this.searchHistory.push(sugs[i])
      }
      this.generateRecomendations()
    }
    else {
      this.stores = this.allStores
      this.searched = false
    }
  }

  generateRecomendations() {
    console.log("this.allStores", this.allStores)
    console.log("this.searchHistory",this.searchHistory)
    this.recomendedStores = this.prepareUnique(this.allStores.filter((x: any) => this.searchHistory.some((y: any) => (x.name.includes(y)))))
  }

}
