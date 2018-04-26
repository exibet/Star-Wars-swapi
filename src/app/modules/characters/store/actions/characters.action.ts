import {Action} from '@ngrx/store';

import { StoreI } from '../../services/characters.service';

export const LOAD_CHARACTERS = '[Characters] Load Characters';
export const LOAD_CHARACTERS_FAIL = '[Characters] Load Characters Fail';
export const LOAD_CHARACTERS_SUCCESS = '[Characters] Load Characters Success';

export class LoadCharacters implements Action {
  readonly type = LOAD_CHARACTERS;
}

export class LoadCharactersFail implements Action {
  readonly type = LOAD_CHARACTERS_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadCharactersSuccess implements Action {
  readonly type = LOAD_CHARACTERS_SUCCESS;

  constructor(public payload: StoreI) {
  }
}

export type CharactersAction = LoadCharacters | LoadCharactersFail | LoadCharactersSuccess;
