import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCharacters from './characters.reducer';

export interface CharactersState {
  characters: fromCharacters.CharacterState;
}

export const reducers: ActionReducerMap<CharactersState> = {
  characters: fromCharacters.reducer
};

export const getCharactersState = createFeatureSelector<CharactersState>('characters');

