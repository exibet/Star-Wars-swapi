import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CharacterI } from '../../models/character.model';
import { FiltersI } from '../character-filters/character-filters.component';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  @Input() characters: CharacterI[];
  @Input() filters: FiltersI;

  @Output() redirect: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onRedirect(data: CharacterI) {
    this.redirect.emit(data.url);
  }


}
