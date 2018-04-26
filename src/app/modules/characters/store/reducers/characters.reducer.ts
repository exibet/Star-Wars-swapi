import * as fromCharacters from '../actions/characters.action';
import { StoreI } from '../../services/characters.service';
import { CharacterI } from '../../models/character.model';

export interface CharacterState {
  data: StoreI;
  loaded: boolean;
  loading: boolean;
  entities: { [id: number]: CharacterI };
}

export const initialState = {
  data: {
    characters: [],
    films: [],
    species: [],
    starships: []
  },
  loaded: false,
  loading: false,
  entities: {}
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

      const entities = data.characters.reduce((entities: { [id: number]: CharacterI }, character: CharacterI) => {
        const id: number = +character.url.split('/')[5];

        return { ...entities, [id]: character };

      }, { ...state.entities });

      return {
        ...state,
        loading: false,
        loaded: true,
        data,
        entities
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
export const getEntities = (state: CharacterState) => state.entities;

