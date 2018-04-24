import { Pipe, PipeTransform } from '@angular/core';

import { CharacterI } from '../../modules/characters/models/character.model';
import { FilmI } from '../../modules/characters/models/film.model';
import { SpeciesI } from '../../modules/characters/models/species.model';

@Pipe({
  name: 'charactersPipe'
})

export class CharactersPipe implements PipeTransform {

  transform(characters: CharacterI[], filter: any[], type: string): CharacterI[] {
    if (filter && filter.length > 0) {
      return characters.filter((character: CharacterI) => {
        return character[type].find((item: FilmI[] | SpeciesI[]) => filter.indexOf(item) !== -1);
      });
    }

    return characters;
  }
}
