import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { CharactersListComponent } from './characters/characters-container/characters-list/characters-list.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: 'characters', pathMatch: 'full' },
  { path: 'characters', loadChildren: './characters/characters.module#CharactersModule' },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
