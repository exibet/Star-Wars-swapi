import * as fromCharacters from '../actions/characters.action';
import { StoreI } from '../../services/characters.service';

export interface CharacterState {
  data: StoreI;
  loaded: boolean;
  loading: boolean;
}

export const initialState = {
  data: {
    characters: [],
    films: [],
    species: [],
    starships: []
  },
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: fromCharacters.CharactersAction): CharacterState {

  switch (action.type) {
    case fromCharacters.LOAD_CHARACTERS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromCharacters.LOAD_CHARACTERS_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data
      };
    }

    case fromCharacters.LOAD_CHARACTERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getCharactersLoading = (state: CharacterState) => state.loading;
export const getCharactersLoaded = (state: CharacterState) => state.loaded;
export const getCharacters = (state: CharacterState) => state.data;

