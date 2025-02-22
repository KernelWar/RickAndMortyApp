import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';;
import * as CharacterActions from './character.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CharactersService } from '../../services/characters.service';

@Injectable()
export class CharacterEffects {
  constructor(private actions$: Actions, private characterService: CharactersService) {}

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharacters),
      mergeMap((action: { page: number }) =>
        this.characterService.getCharacters(action.page).pipe(
          map((response) =>
            CharacterActions.loadCharactersSuccess({
              characters: response.results,
              currentPage: action['page'],
              hasMore: !!response.info.next,
            })
          ),
          catchError((error) => of(CharacterActions.loadCharactersFailure({ error: error.message })))
        )
      )
    )
  );
}
