import { Component, OnInit } from '@angular/core';
import { CharactersService, StoreI } from '../services/characters.service';
import { Observable } from 'rxjs/Observable';
import { FiltersI } from './character-filters/character-filters.component';

import 'rxjs/add/operator/share';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters-container',
  templateUrl: './characters-container.component.html',
  styleUrls: ['./characters-container.component.scss']
})
export class CharactersContainerComponent implements OnInit {

  store$: Observable<StoreI>;
  filters: FiltersI;

  constructor(private charactersService: CharactersService,
              private router: Router) { }

  ngOnInit() {
    this.store$ = this.charactersService.store.share();
  }

  onFilter(value: FiltersI) {
    this.filters = value;
  }

  redirectToCharacter(url: string) {
    this.router.navigate(['characters', url.split('/')[5]]);
  }

}
