import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../store/characters/character.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  readonly apiUrl = `${environment.api}/character`;
  constructor(private http: HttpClient) { }
  getCharacters(page: number): Observable<{ results: Character[]; info: { next: string | null } }> {
    return this.http.get<{ results: Character[]; info: { next: string | null } }>(`${this.apiUrl}?page=${page}`);
  }
}
