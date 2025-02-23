import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState, characterAdapter } from './characters.reducer';

export const selectCharacterState = createFeatureSelector<CharacterState>('characters');

export const { selectAll: selectAllCharacters } = characterAdapter.getSelectors(selectCharacterState);

export const selectLoading = createSelector(selectCharacterState, (state) => state.loading);
export const selectCurrentPage = createSelector(selectCharacterState, (state) => state.currentPage);
export const selectCount = createSelector(selectCharacterState, (state) => state.count);

export const selectLoadedPages = createSelector(selectCharacterState, (state) => state.loadedPages);

export const selectCharactersByPage = (page: number) =>
    createSelector(selectLoadedPages, (loadedPages) => loadedPages[page] || []);
