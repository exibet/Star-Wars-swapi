import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { CharactersContainerComponent } from './characters-container/characters-container.component';
import { CharactersListComponent } from './characters-container/characters-list/characters-list.component';
import { CharacterFiltersComponent } from './characters-container/character-filters/character-filters.component';
import { CharacterComponent } from './character-container/character/character.component';

import { CharactersService } from './services/characters.service';
import { CharacterContainerComponent } from './character-container/character-container.component';

import { StoreModule } from '@ngrx/store';
import { reducers, effects} from './store';
import { EffectsModule } from '@ngrx/effects';

const charactersRoutes: Routes = [
  {path: '', component: CharactersContainerComponent},
  {path: ':id', component: CharacterContainerComponent},
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(charactersRoutes),
    StoreModule.forFeature('characters', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    CharactersContainerComponent,
    CharactersListComponent,
    CharacterComponent,
    CharacterFiltersComponent,
    CharacterContainerComponent,
  ],
  providers: [CharactersService]
})
export class CharactersModule {
}
