import { CharacterI } from '../../modules/characters/models/character.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rangePipe'
})

export class RangePipePipe implements PipeTransform {

  transform(characters: CharacterI[], filter: { from: number, to: number }): CharacterI[] {
    if (filter) {
      return characters.filter((character: CharacterI) => {
        return this.parseYear(character.birth_year) >= filter.from  && this.parseYear(character.birth_year) <= filter.to;
      });
    }

    return characters;
  }

  private parseYear(year: string): number {
    if (year === 'unknown') {
      return null;
    }

    return year.endsWith('BBY') ? -year.slice(0, -3) : +year.slice(0, -3);

  }

}
