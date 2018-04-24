import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { CharactersPipe } from './pipes/characters.pipe';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { RangePipePipe } from './pipes/rangePipe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IonRangeSliderModule,
  ],
  declarations: [CharactersPipe, RangePipePipe],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IonRangeSliderModule,

    CharactersPipe,
    RangePipePipe
  ]
})
export class SharedModule { }
