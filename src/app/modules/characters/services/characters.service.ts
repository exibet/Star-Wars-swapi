import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'environments/environment';

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
import { StarshipsI } from './spaceships.model';

const options = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

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

  store: Observable<StoreI>;

  constructor(private http: HttpClient) {
    this.store = this.getSWApiData();
  }

  getCharacter(id: string): Observable<CharacterI> {
    const character$: Observable<CharacterI> = this.http.get(`${environment.api + this.peopleEndpoint + id}/`)
      .map((data: CharacterI) => data);

      return combineLatest(character$, this.store).map(([character, store]) => {
        const films = this.getCharacterFilms(character, store);
        const species = this.getCharacterSpecies(character, store);
        const starships = this.getCharacterStarships(character, store);

        return { ...character, films, species, starships };
      });
  }

  private getCharacterFilms(character: CharacterI, store: StoreI): FilmI[] {
    return store.films.filter((item: FilmI) => character.films.indexOf(item.url) !== -1);
  }

  private getCharacterSpecies(character: CharacterI, store: StoreI): SpeciesI[] {
    return store.species.filter((item: SpeciesI) => character.species.indexOf(item.url) !== -1);
  }

  private getCharacterStarships(character: CharacterI, store: StoreI): StarshipsI[] {
    return store.starships.filter((item: StarshipsI) => character.starships.indexOf(item.url) !== -1);
  }


  private getSWApiData(): Observable<StoreI> {
    const characters$: Observable<CharacterI[]> = this.getListEntities(environment.api + this.peopleEndpoint);
    const species$: Observable<SpeciesI[]> = this.getListEntities(environment.api + this.speciesEndpoint);
    const films$: Observable<FilmI[]> = this.getListEntities(environment.api + this.filmsEndpoint);
    const starships$: Observable<StarshipsI[]> = this.getListEntities(environment.api + this.starshipsEndpoint);

    return combineLatest(characters$, species$, films$, starships$)
      .map(([characters, species, films, starships]) => {
        return { characters, species, films, starships };
      })
      .catch(error => Observable.throw(error));
  }

  private getListEntities(url: string): Observable<any[]> {
    return this.http.get(url, options)
      .mergeMap((res: SWApiI) => {
        return res.next
          ? this.getListEntities(res.next).map(results => res.results.concat(results))
          : Observable.of(res.results);
      })
      .catch(error => Observable.throw(error))
      .publishReplay(1).refCount();
  }

}
