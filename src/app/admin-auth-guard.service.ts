import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/map';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService) { }

    canActivate(): Observable<boolean> {
      return this.authService.appUser$
      .map( appUser => appUser.isAdmin);
    }
  }
