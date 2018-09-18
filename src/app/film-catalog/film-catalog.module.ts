import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FilmItemComponent } from './film-item/film-item.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { SharedModule } from '../shared/shared.module';
import { CONFIG_API, configApi } from '../shared/services/services/config.api';
import { ActorsListComponent } from './actors-list/actors-list.component';
import { ActorItemComponent } from './actor-item/actor-item.component';
import { MainComponent } from './main/main.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';

import { FavoritesListComponent } from './favorites-list/favorites-list.component';
import { SearchMovieComponent } from './searchBlock/searchMovie/searchMovie.component';
import { SearchActorComponent } from './searchBlock/searchActor/searchActor.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    FilmsListComponent,
    FilmItemComponent,
    ActorsListComponent,
    ActorItemComponent,
    MainComponent,
    FilmDetailComponent,
    SearchMovieComponent,
    FavoritesListComponent,
    SearchActorComponent
  ],
  providers: [
    {
      provide: CONFIG_API, useValue: configApi
    }
  ]
})
export class FilmCatalogModule {
}
