import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../services/characters.service';
import { ActivatedRoute } from '@angular/router';
import { CharacterI } from '../models/character.model';

@Component({
  selector: 'app-character-container',
  templateUrl: './character-container.component.html',
  styleUrls: ['./character-container.component.scss']
})
export class CharacterContainerComponent implements OnInit {

  character: CharacterI;

  constructor(private charactersService: CharactersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.charactersService.getCharacter(this.route.snapshot.params['id']).subscribe((value: CharacterI) => {
      this.character = value;
      console.log(value);
    });
  }

}
