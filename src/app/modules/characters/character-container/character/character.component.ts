import { Component, Input, OnInit } from '@angular/core';
import { CharacterI } from '../../models/character.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input() character: CharacterI;

  constructor() { }

  ngOnInit() {
  }

}
