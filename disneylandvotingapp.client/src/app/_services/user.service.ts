import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Role, User } from '../_models';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, delay, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

const baseUrl = `${environment.apiUrl}/api/users`;

@Injectable({ providedIn: 'root' })
export class UserService {
  id  :string
  constructor(
        private http: HttpClient,
        private toastrService: ToastrService,
        ) { }

    getAll(): Observable<any> {
        return this.http.get<User[]>(`${baseUrl}/all`);
    }


    getById(id: string) {
        return this.http.get<User>(`${baseUrl}/${id}`);
    }

    create(params) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params) {
       const modifiedParams = this.modifyParams(params);
        return this.http.put(`${baseUrl}/${id}`, modifiedParams);
    }

    modifyParams(params: any): any {
      params.id = '';
      params.ConfirmPassword= '';
      return params;
  }
   
    searchUsers(term: string): Observable<User[]> {
        if (!term.trim()) {
          return of([]);
        }
        return this.http.get<User[]>(`${baseUrl}/?name=${term}`).pipe(
          tap(x => x.length ?
             this.log(`found Users matching "${term}"`) :
             this.log(`no Users matching "${term}"`)),
          catchError(this.handleError<User[]>('searchUsers', []))
        );
      }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); 
      this.toastrService.error(`CharacterService: ${`${operation} failed: ${error.message}`}`);
      return of(result as T);
    };
    }
    
    private log(message: string) {
    this.toastrService.info(`CharacterService: ${message}`);
    }
}