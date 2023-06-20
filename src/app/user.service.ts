import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  userDeleted = new Subject();
  userUpdated = new Subject();
  userAdded = new Subject();

  getUsers() {
    return this.http.get(
      'https://648c0b4f8620b8bae7ec1d9c.mockapi.io/users/data'
    );
  }
  getUserById(id: number) {
    return this.http.get(
      `https://648c0b4f8620b8bae7ec1d9c.mockapi.io/users/data/${id}`
    );
  }
  deleteUserById(id: number) {
    return this.http.delete(
      `https://648c0b4f8620b8bae7ec1d9c.mockapi.io/users/data/${id}`
    );
  }
  updateUserById(id: number, data: any) {
    return this.http.put(
      `https://648c0b4f8620b8bae7ec1d9c.mockapi.io/users/data/${id}`,
        data,
      data
    );
  }
  addUser(data: any) {
    return this.http.post(
      'https://648c0b4f8620b8bae7ec1d9c.mockapi.io/users/data/',
      data
    );
  }
}