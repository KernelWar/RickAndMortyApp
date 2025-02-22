import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Character } from './character.model';
import { createReducer, on } from '@ngrx/store';
import * as CharacterActions from './character.actions';

export interface CharacterState extends EntityState<Character> {
    loading: boolean;
    error: string | null;
    currentPage: number;
    hasMore: boolean;
}

export const characterAdapter: EntityAdapter<Character> = createEntityAdapter<Character>({
    selectId: (character) => character.id,
});

// Estado inicial
export const initialState: CharacterState = characterAdapter.getInitialState({
    loading: false,
    error: null,
    currentPage: 1,
    hasMore: true,
});


export const characterReducer = createReducer(
    initialState,
    on(CharacterActions.loadCharacters, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(CharacterActions.loadCharactersSuccess, (state, { characters, currentPage, hasMore }) =>
        characterAdapter.addMany(characters, {
            ...state,
            loading: false,
            currentPage,
            hasMore,
        })
    ),
    on(CharacterActions.loadCharactersFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);