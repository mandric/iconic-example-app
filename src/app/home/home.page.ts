import { Component } from '@angular/core';
import { UsersService, User } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private usersService: UsersService) {}

  getUsers(): User[] {
    return this.usersService.getUsers();
  }

}
