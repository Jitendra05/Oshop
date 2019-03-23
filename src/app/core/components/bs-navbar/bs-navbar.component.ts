import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from '../../../../../node_modules/rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(public authService: AuthService,
    private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.authService.appUser$.subscribe(user => this.appUser = user);
    this.cart$ = await this.cartService.getcart();
  }

  logout() {
    this.authService.logout();
  }

}
