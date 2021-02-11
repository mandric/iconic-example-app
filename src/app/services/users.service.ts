import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

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
  birthday: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private keyPrefix = 'users';
  public readonly mockUsers: User[] = [
    {
      id: 1,
      firstName: 'Matt',
      lastName: 'Leguizamo',
      sex: 'M' as Gender,
      birthday: '1999-10-10T00:00:00.000Z'
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Wayne',
      sex: 'M' as Gender,
      birthday: '1989-01-30T00:00:00.000Z'
    },
    {
      id: 3,
      firstName: 'Sally',
      lastName: 'McFredrick',
      sex: 'F' as Gender,
      birthday: '1976-06-03T00:00:00.000Z'
    },
    {
      id: 4,
      firstName: 'Pat',
      lastName: 'Orielly',
      sex: 'F' as Gender,
      birthday: '1956-11-22T00:00:00.000Z'
    },
    {
      id: 5,
      firstName: 'Samantha',
      lastName: 'Smith',
      sex: 'O' as Gender,
      birthday: '1936-12-02T00:00:00.000Z'
    }
  ];

  constructor(private storage: Storage) {}

  loadMockData(): Promise<any> {
    const calls = [];
    for (const u of this.mockUsers) {
      calls.push(
        this.storage.set(this.userKey(u.id), u).catch(e => {
          alert(e);
          console.error(e);
        })
      );
    }
    return Promise.all(calls);
  }

  userKey(id: number) {
    return `${this.keyPrefix}-${id}`;
  }

  deleteUser(id: number): Promise<any> {
    return this.storage.remove(this.userKey(id));
  }

  updateUser(user: User): Promise<User> {
    return this.storage.set(this.userKey(user.id), user);
  }

  async getUsers(): Promise<User[]> {
    const keys = await this.storage.keys();
    return Promise.all(keys.map(k => this.storage.get(k)));
  }

  getUserById(id: number | string): Promise<User> {
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }
    return this.storage.get(`users-${id}`);
  }
}
