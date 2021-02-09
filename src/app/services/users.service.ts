import { Injectable } from '@angular/core';

// TODO update to be accurate according to modern standards
export enum Gender {
  M = 'Male',
  F = 'Female',
  O = 'Other'
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  sex: Gender;
  birthday: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      firstName: 'Matt',
      lastName: 'Leguizamo',
      sex: 'M' as Gender,
      birthday: new Date('1999-10-10T00:00:00.000Z')
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Wayne',
      sex: 'M' as Gender,
      birthday: new Date('1989-01-30T00:00:00.000Z')
    },
    {
      id: 3,
      firstName: 'Sally',
      lastName: 'McFredrick',
      sex: 'F' as Gender,
      birthday: new Date('1976-06-03T00:00:00.000Z')
    },
    {
      id: 4,
      firstName: 'Pat',
      lastName: 'Orielly',
      sex: 'F' as Gender,
      birthday: new Date('1956-11-22T00:00:00.000Z')
    }
  ];

  constructor() { }

  deleteUser(id: number): boolean {
    let length = this.users.length;
    this.users = this.users.filter(u => u.id !== id);
    return this.users.length !== length;
  }

  updateUser(user: User): boolean {
    if (typeof user.birthday === 'string') {
      user.birthday = new Date(user.birthday);
    }
    let success = false;
    this.users = this.users.map(u => {
      if (u.id === user.id) {
        success = true;
        return user;
      }
      return u;
    });
    return success;
  }

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number | string): User {
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }
    return this.users.find(user => user.id === id);
  }
}
