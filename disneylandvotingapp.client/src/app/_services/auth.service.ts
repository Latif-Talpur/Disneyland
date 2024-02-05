import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:7261/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

   
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, role: string): Observable<any> {

    const data = {'username': username, 'email': email ,'password': password, "roles": role};
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.post(AUTH_API + 'signup', {'username': username, 'email': email ,'password': password, "roles": role}, config);
  }
}
