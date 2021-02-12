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
  birthday: string; // valid ISO 8601 datetime string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private seq = 1;
  private readonly seqKey: string;
  private readonly keyPrefix = 'users';

  public readonly mockUsers: User[] = [
    {
      id: 1,
      firstName: 'Matt',
      lastName: 'Leguizamo',
      sex: 'M' as Gender,
      birthday: '1999-10-10'
    },
    {
      id: 2,
      firstName: 'John',
      lastName: 'Wayne',
      sex: 'M' as Gender,
      birthday: '1989-01-30'
    },
    {
      id: 3,
      firstName: 'Sally',
      lastName: 'McFredrick',
      sex: 'F' as Gender,
      birthday: '1976-06-03'
    },
    {
      id: 4,
      firstName: 'Pat',
      lastName: 'Orielly',
      sex: 'F' as Gender,
      birthday: '1956-11-22'
    },
    {
      id: 5,
      firstName: 'Samantha',
      lastName: 'Smith',
      sex: 'O' as Gender,
      birthday: '1936-12-02'
    }
  ];

  constructor(private storage: Storage) {
    this.seqKey = `${this.keyPrefix}-seq`;
    this.storage.get(this.seqKey).then(seq => {
      this.seq = seq ? seq : this.seq;
    });
  }

  loadMockData(): Promise<any> {
    return Promise.all(
      this.mockUsers.map(u => this.createUser(u))
    );
  }

  userKey(id: number) {
    return `${this.keyPrefix}-${id}`;
  }

  deleteUser(id: number): Promise<any> {
    return this.storage.remove(this.userKey(id));
  }

  createUser(user: User): Promise<[User,any]> {
    const id = user.id || ++this.seq;
    user.id = id;
    if (id > this.seq) {
      this.seq = id;
    }
    return Promise.all([
      this.storage.set(this.userKey(id), user),
      this.storage.set(this.seqKey, this.seq)
    ]);
  }

  updateUser(user: User): Promise<User> {
    return this.storage.set(this.userKey(user.id), user);
  }

  getUsers(): Promise<User[]> {
    return this.storage.keys().then(keys => {
      return Promise.all(keys.map(k => this.storage.get(k)));
    });
  }

  getUserById(id: number | string): Promise<User> {
    if (typeof id === 'string') {
      id = parseInt(id, 10);
    }
    return this.storage.get(`users-${id}`);
  }
}
