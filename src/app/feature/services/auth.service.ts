import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api';
  private loggedIn = new BehaviorSubject<boolean>(this.checkInitialAuthStatus());

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };
    return this.http.post<{ jwtToken: string }>(`${this.baseUrl}/login`, { username, password },httpOptions)
      .pipe(
        map(response => {
          localStorage.setItem('jwt_token', response.jwtToken);
          this.loggedIn.next(true);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private checkInitialAuthStatus(): boolean {
    return !!localStorage.getItem('jwt_token');
  }
}
