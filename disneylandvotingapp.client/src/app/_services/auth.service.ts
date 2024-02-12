import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const AUTH_API = `${environment.apiUrl}/api/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any> {
  const data = 
    { 
       'username': username, 
       'password': password, 
    };

    return this.http.post(AUTH_API + '/signin', data);
  }

  register(username: string, email: string, password: string, role: string ,confirmpassword:string): Observable<any> {

    const data = 
    { 
       'firstname': username, 
       'email': email, 
       'password': password, 
       "role": role,
       "title" :"",
        "lastname" :username,
        "confirmpassword": confirmpassword
      };

    return this.http.post(AUTH_API + '/signup', data);
  }
}
