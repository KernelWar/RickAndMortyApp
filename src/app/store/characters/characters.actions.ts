import { createAction, props } from '@ngrx/store';
import { Character } from '../../models/character.model';

export const loadCharacters = createAction(
  '[Characters] Load Characters',
  props<{ page: number }>()
);

export const loadCharactersSuccess = createAction(
  '[Characters] Load Characters Success',
  props<{ characters: Character[]; currentPage: number; count: number }>()
);

export const loadCharactersFailure = createAction(
  '[Characters] Load Characters Failure',
  props<{ error: string }>()
);

export const updateCurrentPage = createAction(
  '[Characters] Update Current Page',
  props<{ page: number }>()
);