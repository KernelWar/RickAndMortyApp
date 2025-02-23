
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Character } from '../../models/character.model';
import { createReducer, on } from '@ngrx/store';
import * as CharacterActions from './character.actions';

export const characterAdapter = createEntityAdapter<Character>();
export interface CharacterState extends EntityState<Character> {
  loading: boolean;
  loadedCharacters: { [page: number]: Character }
}

export const initialState: CharacterState = characterAdapter.getInitialState({
  loading: false,
  loadedCharacters: {}
});

export const singleCharacterReducer = createReducer(
  initialState,
  on(CharacterActions.loadCharacter, (state) => ({ ...state, loading: true })),
  on(CharacterActions.loadCharacterSuccess, (state, { character }) => {
    return characterAdapter.upsertOne(character, {
      ...state,
      loadedCharacters: {
        ...state.loadedCharacters,
        [character.id]: character
      },
      loading: false
    });
  }),
  on(CharacterActions.loadCharacterFailure, (state) => ({ ...state, loading: false }))
);
