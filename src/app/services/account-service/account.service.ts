import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Credentials } from 'src/app/models/credentials';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSubject.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
    const tokken = localStorage.getItem('token');
    this.isLoggedInSubject.next(!!tokken);
  }

  login(dataLogin: Credentials) {
    return this.httpClient.post('/server/api/v1/login', dataLogin).pipe(
      map((token) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', JSON.stringify(token));
        this.isLoggedInSubject.next(true);
        return token;
      })
    );
  }

  logout() {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
  }

  register(dataRegister: Credentials) {
    return this.httpClient.post('/server/api/v1/register', dataRegister);
  }
}
