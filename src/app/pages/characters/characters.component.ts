import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { Character } from '../../store/characters/character.model';
import { Store } from '@ngrx/store';
import * as CharacterSelectors from '../../store/characters/character.selectors';
import * as CharacterActions from '../../store/characters/character.actions';
import { CardCharacterComponent } from './components/card-character/card-character.component';
@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    CardCharacterComponent
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss'
})
export class CharactersComponent implements OnInit {
  characters$: Observable<Character[]>;
  loading$: Observable<boolean>;
  hasMore$: Observable<boolean>;
  currentPage: number = 1; 

  constructor(private store: Store) {
    this.characters$ = this.store.select(CharacterSelectors.selectAllCharacters);
    this.loading$ = this.store.select(CharacterSelectors.selectLoading);
    this.hasMore$ = this.store.select(CharacterSelectors.selectHasMore);
  }

  ngOnInit(): void {
    this.loadCharacters(this.currentPage);
  }

  loadCharacters(page: number): void {
    this.store.dispatch(CharacterActions.loadCharacters({ page }));
  }

  onPageChanged(event: any): void {
    this.currentPage = event.pageIndex + 1; 
    this.loadCharacters(this.currentPage);
  }

}
