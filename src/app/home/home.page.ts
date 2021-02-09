import { Component } from '@angular/core';
import { UsersService, User, Gender } from '../services/users.service';

interface FilterInput {
  label: string,
  val: Gender,
  isChecked: boolean
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  users: User[] = [];
  filterForm: FilterInput[] = [];

  constructor(private usersService: UsersService) {
    for (const g in Gender) {
      this.filterForm.push({
        label: Gender[g],
        isChecked: true,
        val: g as Gender
      })
    }
  }

  ionViewWillEnter() {
    this.init();
  }

  init() {
    this.users = this.getUsers();
  }

  getUsers(): User[] {
    const genders = new Map();
    for (const f of this.filterForm) {
      if (f.isChecked) {
        genders.set(f.val, true);
      }
    }
    const filter = (u: User) => {
      return genders.has(u.sex);
    };
    return this.usersService.getUsers().filter(filter);
  }

  onFilterChange() {
    this.init();
  }

}
