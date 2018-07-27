import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
    this.authService.user$.subscribe(user => {
     if (user) {
      this.userService.save(user);
      const returnUrl: string = localStorage.getItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
     }
    });
  }
}