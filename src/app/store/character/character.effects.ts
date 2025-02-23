import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { CharactersService } from '../../services/characters.service';
import { Store } from '@ngrx/store';
import * as CharacterActions from './character.actions';
import * as CharacterSelectors from './character.selectors';
import * as CharactersSelectors from './../characters/characters.selectors'

@Injectable()
export class SingleCharacterEffects {
  constructor(private actions$: Actions, private characterService: CharactersService, private store: Store) { }

  loadCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharacter),
      mergeMap((action) =>
        this.store.select(CharacterSelectors.selectCharacterById(action.id)).pipe(
          withLatestFrom(this.store.select(CharactersSelectors.selectLoadedPages)),
          mergeMap(([character, loadedPages]) => {
            if (character) {
              return of(CharacterActions.loadCharacterSuccess({ character }));
            }
  
            const foundInPages = Object.values(loadedPages).flat().find(
              (char) => char.id === action.id
            );
  
            if (foundInPages) {
              return of(CharacterActions.loadCharacterSuccess({ character: foundInPages }));
            }
  
            return this.characterService.getCharacterById(action.id).pipe(
              map((response) =>
                CharacterActions.loadCharacterSuccess({ character: response })
              ),
              catchError((error) =>
                of(CharacterActions.loadCharacterFailure({ error: error.message }))
              )
            );
          })
        )
      )
    )
  );
  
}
