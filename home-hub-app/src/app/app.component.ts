import { Component } from '@angular/core';
import { AuthService } from './modules/shared/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Grocery Hub';

  constructor(private authService: AuthService) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);

      this.authService
        .getNearMeStore(position.coords.latitude, position.coords.longitude)
        .then((d) => {
          console.log(d);
        });
    });
  }
}
