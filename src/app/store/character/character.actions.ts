
import { createAction, props } from '@ngrx/store';
import { Character } from '../../models/character.model';

export const loadCharacter = createAction(
    '[Character] Load Character',
    props<{ id: number }>()
);

export const loadCharacterSuccess = createAction(
    '[Character] Load Character Success',
    props<{ character: Character }>()
);

export const loadCharacterFailure = createAction(
    '[Character] Load Character Failure',
    props<{ error: string }>()
);