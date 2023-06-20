import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logstatusChanged = new Subject();
  private registeredUsers: {
    email: string;
    password: string;
  }[] = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) {
    const token = localStorage.getItem('profanis_auth');

    const registeredUsersJson = localStorage.getItem('registeredUsers');
    if (registeredUsersJson) {
      this.registeredUsers = JSON.parse(registeredUsersJson);
    }
  }

  login(email: string, password: string) {
    return this.apiService.login(email, password).pipe(
      tap((response: any) => {
        if (response.message === 'Login Successful') {
          localStorage.setItem(email, response.token);
          localStorage.setItem('loggedin', 'true');
        }
      })
    );
  }

  register(name: string, email: string, password: string): Observable<boolean> {
    if (this.registeredUsers.includes({ email: email, password: password })) {
      return of(false);
    } else {
      const user = { name: name, email: email, password: password };
      this.registeredUsers.push(user);
      localStorage.setItem(
        'registeredUsers',
        JSON.stringify(this.registeredUsers)
      );
      return of(true);
    }
  }

  isAuthenticated(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        const isLoggedIn = localStorage.getItem('loggedin');
        resolve(isLoggedIn === 'true');
      });
    });
    return promise;
  }
}