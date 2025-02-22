import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Character } from './character.model';
import { createReducer, on } from '@ngrx/store';
import * as CharacterActions from './character.actions';

export const characterAdapter = createEntityAdapter<Character>();
export interface CharacterState extends EntityState<Character> {
  loading: boolean;
  currentPage: number;
  hasMore: boolean;
}

export const initialState: CharacterState = characterAdapter.getInitialState({
  loading: false,
  currentPage: 1,
  hasMore: true,
});

export const characterReducer = createReducer(
  initialState,
  on(CharacterActions.loadCharacters, (state) => ({ ...state, loading: true })),
  on(CharacterActions.loadCharactersSuccess, (state, { characters, currentPage, hasMore }) => {
    return characterAdapter.setAll(characters, {
      ...state,
      loading: false,
      currentPage,
      hasMore,
    });
  }),
  on(CharacterActions.loadCharactersFailure, (state) => ({ ...state, loading: false })),
);