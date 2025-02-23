import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState } from './character.reducer';

export const selectCharacterState = createFeatureSelector<CharacterState>('singleCharacters');

export const selectLoading = createSelector(selectCharacterState, (state) => state.loading);

export const selectCharacterById = (id: number) => createSelector(
    selectCharacterState,
    (state: CharacterState) => {
        return state.loadedCharacters[id]
    }
);  
