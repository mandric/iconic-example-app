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
  public users: User[] = [
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

  public deleteUser(id: number): User {
    for (const i in this.users) {
      if (this.users[i].id === id) {
        return this.users.splice(parseInt(i,10), 1)[0];
      }
    }
    //return this.users.(user => user.id === id);
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getUserById(id: number): User {
    return this.users.find(user => user.id === id);
  }
}
