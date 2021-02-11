import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { User, UsersService } from './users.service';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<User> {

  constructor(private service: UsersService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<User> {
    return this.service.getUserById(route.paramMap.get('id'));
  }
}

@Injectable({ providedIn: 'root' })
export class UsersResolver implements Resolve<User[]> {

  constructor(private service: UsersService) {
    console.log('UsersResolver constructor');
  }

  resolve(route: ActivatedRouteSnapshot): Promise<User[]> {
    return this.service.getUsers();
  }
}