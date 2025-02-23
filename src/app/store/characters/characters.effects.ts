import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';;
import * as CharacterActions from './characters.actions';
import { catchError, filter, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { CharactersService } from '../../services/characters.service';
import * as CharacterSelectors from './characters.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class CharacterEffects {
  constructor(private actions$: Actions, private characterService: CharactersService, private store: Store) { }

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharacters),
      withLatestFrom(this.store.select(CharacterSelectors.selectLoadedPages), this.store.select(CharacterSelectors.selectCount)),
      mergeMap(([action, loadedPages, count]) => {
        const cachedPage = loadedPages[action.page];
        if (cachedPage) {
          return of(
            CharacterActions.loadCharactersSuccess({
              characters: cachedPage,
              currentPage: action.page,
              count: count
            })
          );
        }
        return this.characterService.getCharacters(action.page).pipe(
          map((response) =>
            CharacterActions.loadCharactersSuccess({
              characters: response.results,
              currentPage: action.page,
              count: response.info.count
            })
          ),
          catchError((error) =>
            of(CharacterActions.loadCharactersFailure({ error: error.message }))
          )
        );

      })
    )
  );
}
