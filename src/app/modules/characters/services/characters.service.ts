import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/publishReplay';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { CharacterI } from '../models/character.model';
import { FilmI } from '../models/film.model';
import { SpeciesI } from '../models/species.model';
import { StarshipsI } from '../models/spaceships.model';

export interface SWApiI {
  count: number;
  next: string;
  previous: string;
  results: any[];
}

export interface StoreI {
  characters: CharacterI[];
  species: SpeciesI[];
  films: FilmI[];
  starships: StarshipsI[];
}

@Injectable()
export class CharactersService {

  private peopleEndpoint = 'people/';
  private filmsEndpoint = 'films/';
  private speciesEndpoint = 'species/';
  private starshipsEndpoint = 'starships/';

  private store: Observable<StoreI>;

  constructor(private http: HttpClient) {
    this.store = this.getSWApiData();
  }

  getSWApiData(): Observable<StoreI> {
    const characters$: Observable<CharacterI[]> = this.getListEntities(environment.api + this.peopleEndpoint);
    const species$: Observable<SpeciesI[]> = this.getListEntities(environment.api + this.speciesEndpoint);
    const films$: Observable<FilmI[]> = this.getListEntities(environment.api + this.filmsEndpoint);
    const starships$: Observable<StarshipsI[]> = this.getListEntities(environment.api + this.starshipsEndpoint);

    return combineLatest(characters$, species$, films$, starships$)
      .map(([charactersApi, speciesApi, filmsApi, starshipsApi]) => {

        const characters = charactersApi.map((character: CharacterI) => {

          const films = this.getCharacterByFilter(filmsApi, character, 'films');
          const species = this.getCharacterByFilter(speciesApi, character, 'species');
          const starships = this.getCharacterByFilter(starshipsApi, character, 'starships');

          return { ...character, films, species, starships };
        });

        return { characters, species: speciesApi, films: filmsApi, starships: starshipsApi };

      })
      .catch(error => Observable.throw(error));
  }

  getCharacterByFilter(filter: any[], character: CharacterI, type: string): FilmI[] | SpeciesI[] | StarshipsI[] {
    return filter.filter((item: FilmI) => character[type].indexOf(item.url) !== -1);
  }

  private getListEntities(url: string): Observable<any[]> {
    return this.http.get(url)
      .mergeMap((res: SWApiI) => {
        return res.next
          ? this.getListEntities(res.next).map(results => res.results.concat(results))
          : Observable.of(res.results);
      })
      .catch(error => Observable.throw(error))
      .publishReplay(1).refCount();
  }

}
