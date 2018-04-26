import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { CharacterI } from '../models/character.model';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';

@Component({
  selector: 'app-character-container',
  templateUrl: './character-container.component.html',
  styleUrls: ['./character-container.component.scss']
})
export class CharacterContainerComponent implements OnInit {

  character: CharacterI;

  constructor(private store: Store<fromStore.CharactersState>,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.store.select(fromStore.getCharactersEntities).subscribe(data => {
      if (data) {
        this.character = data[this.route.snapshot.params['id']];
      } else {
        this.router.navigate(['characters']);
      }
    });
  }

}
