import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState, characterAdapter } from './character.reducer';

export const selectCharacterState = createFeatureSelector<CharacterState>('characters');

export const { selectAll: selectAllCharacters } = characterAdapter.getSelectors(selectCharacterState);

export const selectLoading = createSelector(selectCharacterState, (state) => state.loading);
export const selectHasMore = createSelector(selectCharacterState, (state) => state.hasMore);
export const selectCurrentPage = createSelector(selectCharacterState, (state) => state.currentPage);
