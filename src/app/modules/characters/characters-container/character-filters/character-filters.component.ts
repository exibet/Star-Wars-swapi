import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { SpeciesI } from '../../models/species.model';
import { FilmI } from '../../models/film.model';
import { StarshipsI } from '../../services/spaceships.model';

import { IonRangeSliderCallback } from 'ng2-ion-range-slider';

export interface FiltersI {
  films: FilmI[];
  species: SpeciesI[];
  starships: StarshipsI[];
  range: { from: number, to: number };
}

@Component({
  selector: 'app-character-filters',
  templateUrl: './character-filters.component.html',
  styleUrls: ['./character-filters.component.scss']
})

export class CharacterFiltersComponent implements OnInit {

  @Input() species: SpeciesI[];
  @Input() films: FilmI[];
  @Input() starships: StarshipsI[];

  @Output() onFilter: EventEmitter<FiltersI> = new EventEmitter<FiltersI>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      species: [[]],
      films: [[]],
      starships: [[]],
      range: [],
    });

  }

  ngOnInit() {
    this.form.valueChanges.subscribe((value: FiltersI) => {
      this.onFilter.emit(value);
    });
  }

  setRange({ from, to }: IonRangeSliderCallback) {
    this.form.get('range').setValue({ from, to });
  }

}
