import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character, ResultPaginatorCharacter } from '../models/character.model';
import { environment } from '../../environments/environment';
import { Cacheable } from 'ts-cacheable';
@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  readonly apiUrl = `${environment.api}/character`;

  constructor(private http: HttpClient) { }

  getCharacters(page: number): Observable<ResultPaginatorCharacter> {
    return this.http.get<ResultPaginatorCharacter>(`${this.apiUrl}?page=${page}`);
  }

  @Cacheable({
    maxAge: 36000000
  })
  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }  
}
