import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Character } from '../../models/character.model';
import { createReducer, on } from '@ngrx/store';
import * as CharacterActions from './characters.actions';

export const characterAdapter = createEntityAdapter<Character>();
export interface CharacterState extends EntityState<Character> {
  loading: boolean;
  currentPage: number;
  count: number;
  loadedPages: { [page: number]: Character[] }
}

export const initialState: CharacterState = characterAdapter.getInitialState({
  loading: false,
  currentPage: 1,
  count: 100,
  loadedPages: {},
});

export const characterReducer = createReducer(
  initialState,
  on(CharacterActions.loadCharacters, (state) => ({ ...state, loading: true })),
  on(CharacterActions.loadCharactersSuccess, (state, { characters, currentPage, count }) => {    
    const updatedPages = {
      ...state.loadedPages,
      [currentPage]: characters,
    };
    return characterAdapter.setAll(characters, {
      ...state,
      loading: false,
      currentPage,
      count,
      loadedPages: updatedPages,
    });
  }),
  on(CharacterActions.loadCharactersFailure, (state) => ({ ...state, loading: false })),
  on(CharacterActions.updateCurrentPage, (state, { page }) => ({
    ...state,
    currentPage: page,
  }))
);