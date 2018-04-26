import { Component, OnInit } from '@angular/core';
import { CharactersService, StoreI } from '../services/characters.service';
import { Observable } from 'rxjs/Observable';
import { FiltersI } from './character-filters/character-filters.component';

import 'rxjs/add/operator/share';
import { Router } from '@angular/router';

import * as fromStore from '../store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-characters-container',
  templateUrl: './characters-container.component.html',
  styleUrls: ['./characters-container.component.scss']
})

export class CharactersContainerComponent implements OnInit {

  store$: Observable<StoreI>;
  filters: FiltersI;

  constructor(private store: Store<fromStore.CharactersState>,
              private router: Router) { }

  ngOnInit() {
    this.store$ = this.store.select(fromStore.getAllCharacters);
    this.store.dispatch(new fromStore.LoadCharacters());
  }

  onFilter(value: FiltersI) {
    this.filters = value;
  }

  redirectToCharacter(url: string) {
    this.router.navigate(['characters', url.split('/')[5]]);
  }

}
