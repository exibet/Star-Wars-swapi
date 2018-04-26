import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCharacters from './characters.reducer';

export interface CharactersState {
  characters: fromCharacters.CharacterState;
}

export const reducers: ActionReducerMap<CharactersState> = {
  characters: fromCharacters.reducer
};

export const getCharactersState = createFeatureSelector<CharactersState>('characters');

export const getCharacterState = createSelector(getCharactersState, (state: CharactersState) => state.characters);

export const getAllCharacters = createSelector(getCharacterState, fromCharacters.getCharacters);
export const getCharactersLoading = createSelector(getCharacterState, fromCharacters.getCharactersLoading);
export const getCharactersLoaded = createSelector(getCharacterState, fromCharacters.getCharactersLoaded);
