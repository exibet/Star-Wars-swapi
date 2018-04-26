import { createSelector } from '@ngrx/store';

import { CharactersState, getCharactersState } from '../reducers';
import * as fromCharacters from '../reducers/characters.reducer';

export const getCharacterState = createSelector(getCharactersState, (state: CharactersState) => state.characters);

export const getAllCharacters = createSelector(getCharacterState, fromCharacters.getCharacters);

export const getCharactersLoading = createSelector(getCharacterState, fromCharacters.getCharactersLoading);

export const getCharactersLoaded = createSelector(getCharacterState, fromCharacters.getCharactersLoaded);

export const getCharactersEntities = createSelector(getCharacterState, fromCharacters.getEntities);
