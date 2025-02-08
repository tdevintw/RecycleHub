import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs';


interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  birthDate: string;
  city : string ; 
  points? : number ; 
  photo? : string ; 

}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; 
  private router = inject(Router);
  private http = inject(HttpClient);

  register(user: User): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${user.email}`).pipe(
      map(users => users.length),
      switchMap(length => {
        if (length > 0) {
          alert("User email already exists");
          return of(false); // Return Observable<boolean> to maintain the return type
        }
        return this.http.post<User>(this.apiUrl, user).pipe(map(() => true));
      })
    );
  }
  

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`).pipe(
      map((users) => {
        const user = users.find((u) => u.password === password);
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        }

        return false;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getCurrentUser(): User | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }
}
