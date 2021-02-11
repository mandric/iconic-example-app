import { Component } from '@angular/core';
import { UsersService, User, Gender } from '../services/users.service';

interface FilterInput {
  label: string,
  val: Gender,
  isChecked: boolean
}

interface AgeStats {
  oldest: number,
  youngest: number,
  average: number
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  stats: AgeStats;
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
    this.usersService.getUsers().then(users => {
      this.users = this.filteredUsers(users);
      this.stats  = this.getStats(this.users);
    });
  }

  getStats(users: User[]): AgeStats {
    if (!users.length) {
      return;
    }
    let count = 0;
    let total = 0;
    let oldest = users[0].birthday;
    let youngest = users[0].birthday;
    for (const u of users) {
      count++;
      total += new Date(u.birthday).valueOf();
      if (u.birthday < oldest) {
        oldest = u.birthday;
      } else if (u.birthday > youngest) {
        youngest = u.birthday;
      }
    }
    return {
      oldest: this.getAge(oldest),
      youngest: this.getAge(youngest),
      average: this.getAge(new Date(Math.round(total/count)))
    }
  }

  getAge(birthday: Date | string): number {
    if (typeof birthday === 'string') {
      birthday = new Date(birthday);
    }
    const now = new Date();
    const diff = new Date(now.valueOf() - birthday.valueOf());
    return Math.abs(diff.getUTCFullYear() - 1970);
  }

  filteredUsers(users: User[]): User[] {
    const genders = new Map();
    for (const f of this.filterForm) {
      if (f.isChecked) {
        genders.set(f.val, true);
      }
    }
    const filter = (u: User) => {
      return genders.has(u.sex);
    };
    return users.filter(filter);
  }

  onUserDelete(id: number) {
    this.usersService.deleteUser(id)
      .then(() => this.init())
      .catch(e => {
        alert(e);
        console.error(e);
      });
  }

  onFilterChange() {
    this.init();
  }

  async loadMockData() {
    await this.usersService.loadMockData();
    window.location.reload();
  }

}
