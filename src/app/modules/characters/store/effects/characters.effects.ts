import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import * as characterActions from '../actions/characters.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CharactersService } from '../../services/characters.service';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CharactersEffects {

  constructor(private actions$: Actions,
              private charactersService: CharactersService) {
  }

  @Effect()
  loadCharacters$ = this.actions$
    .ofType(characterActions.LOAD_CHARACTERS)
    .pipe(
      switchMap(() => {
        return this.charactersService.getSWApiData().pipe(
          map(characters => new characterActions.LoadCharactersSuccess(characters)),
          catchError(error => of(new characterActions.LoadCharactersFail(error)))
        );
      })
    );
}
