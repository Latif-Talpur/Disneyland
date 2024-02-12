import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CharacterPopularity } from '../_models/characterpopularity';

const baseUrl = `${environment.apiUrl}/api/votes`;

@Injectable({
  providedIn: 'root',
})
export class VoteService {

  constructor(private http: HttpClient) { }

  addVote(params) : Observable<any>  {
    return this.http.post(`${baseUrl}/add-vote`,params);
  }

  getVotes(): Observable<CharacterPopularity> {
    return this.http.get<CharacterPopularity>(baseUrl);
  }

  getVotesReport(startDate: Date, endDate: Date): Observable<any> {
    return this.http.get<any>(`${baseUrl}/reports?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
  }

  getVotesForCharacterInPeriod(startDate: Date, endDate: Date, characterId: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/characters?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&characterId=${characterId}`);
  }

  getTop5Characters(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/top-5`);
  }

  getMostPopularCharactersInMorning(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/characters/popular-in-morning`);
  }

  getMostPopularCharactersInAfternoon(): Observable<any> {
    return this.http.get<any>(`${baseUrl}/characters/popular-in-afternoon`);
  }

  getVotesForCharacters(characterIds: number[]): Observable<any> {
    const characterIdsString = characterIds.join(',');
    return this.http.get<any>(`${baseUrl}/characters/votes?characterIds=${characterIdsString}`);
  }

  getCharacterReports(startDate: Date, endDate: Date): Observable<any> {
    return this.http.get<any>(`${baseUrl}/characters/reports?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
  }

  
}

