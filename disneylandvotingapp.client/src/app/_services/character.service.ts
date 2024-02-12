import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Character } from '../_models/character';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

const baseUrl = `${environment.apiUrl}/api/characters`;
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient, private toastrService: ToastrService) { }

  getAll(): Observable<any> {
    return this.http.get<Character[]>(`${baseUrl}/all`);
}


getById(id: string) {
    return this.http.get<Character>(`${baseUrl}/${id}`);
}

create(params) {
    return this.http.post(baseUrl, params);
}

update(id: string, params) {
    return this.http.put(`${baseUrl}/${id}`, params);
}

searchCharacters(term: string): Observable<Character[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Character[]>(`${baseUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found Characters matching "${term}"`) :
         this.log(`no Characters matching "${term}"`)),
      catchError(this.handleError<Character[]>('searchCharacters', []))
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
