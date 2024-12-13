import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private apiUrlAuthRegister = `${environment.apiUrl}/auth/register`;
  private apiUrlAuthLogin = `${environment.apiUrl}/auth/login`;

  constructor(private router: Router) {}

  register(payload: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrlAuthRegister, payload);
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient
      .post<any>(this.apiUrlAuthLogin, { email, password })
      .pipe(
        map((response) => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.user.id.toString());
          }
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['auth/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  redirectIfLoggedIn() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['auth/login']);
    }
  }
}
