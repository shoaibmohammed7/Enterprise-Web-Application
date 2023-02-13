import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userSubject = new Subject<any>();

  nearStoreSubject = new Subject<any>();

  public userDetails: any;
  public nearStore: any;
  public token: any;
  public lat: any = 41.8427679;
  public lon: any = -87.6164031;

  constructor(private http: HttpClient) {
    this.loadUserState();
  }

  loadUserState() {
    this.token = localStorage.getItem('token');
    const ud = localStorage.getItem('userDetails');
    if (ud) {
      this.userDetails = JSON.parse(ud);
      this.userSubject.next(this.userDetails);
    }

    const ns = localStorage.getItem('nearMeStore');
    if (ns) {
      this.nearStore = JSON.parse(ns);
      this.nearStoreSubject.next(this.nearMeStore);
    }
  }

  get userInfo(): Observable<any> {
    return this.userSubject.asObservable();
  }

  get nearMeStore(): Observable<any> {
    return this.nearStoreSubject.asObservable();
  }

  async getNearMeStore(lat: any, lon: any) {
    this.lat = lat;
    this.lon = lon;
    const res: any = await this.http
      .get(`${environment.baseUrl}/stores/nearMe?lat=${'41.9735392'}&lon=${'-87.6682738'}`)
      .toPromise();
    this.nearStore = res;
    this.nearStoreSubject.next(res);
    return res;
  }

  setNearMeStore(store: any) {
    this.lat = store.latitude;
    this.lon = store.longitude;
    this.nearStore = store;
    this.nearStoreSubject.next(store);
  }

  saveToken(token: any) {
    localStorage.setItem('token', token);
  }

  saveUserDetails(user: any): void {
    localStorage.setItem('userDetails', user);
  }

  isLoggedIn() {
    return !!(this.token && this.userDetails);
  }

  logout() {
    this.token = null;
    this.userDetails = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    this.userSubject.next(this.userDetails);
  }

  async login({ username, password }: any) {
    const res: any = await this.http
      .post(`${environment.baseUrl}/token`, { username, password })
      .toPromise();
    this.token = res.jwttoken;
    this.userDetails = await this.http
      .get(`${environment.baseUrl}/api/user`)
      .toPromise();

    this.saveToken(res.jwttoken);
    this.saveUserDetails(JSON.stringify(this.userDetails));
    this.userSubject.next(this.userDetails);
    return true;
  }

  signup(userData: any) {
    return this.http.post(`${environment.baseUrl}/token/register`, userData);
  }
}
