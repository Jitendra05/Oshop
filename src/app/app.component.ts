import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private userService: UserService
    ) {
    this.authService.user$.subscribe(user => {
      if (!user) { return; }
      this.userService.save(user);

      const returnUrl: string = localStorage.getItem('returnUrl');
      if (!returnUrl) { return; }
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
    });
   }

  ngOnInit() {}

  ngOnDestroy(): void {}
}
