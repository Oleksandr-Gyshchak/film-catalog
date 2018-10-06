import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './shared/guards/auth-guard.service';
import { FilmsListComponent } from './film-catalog/films-list/films-list.component';
import { ActorsListComponent } from './film-catalog/actors-list/actors-list.component';
import { MainComponent } from './film-catalog/main/main.component';

import { FilmDetailComponent } from './film-catalog/film-detail/film-detail.component';

import { FavoritesListComponent } from './film-catalog/favorites-list/favorites-list.component';
import { SearchMovieComponent } from './film-catalog/searchBlock/searchMovie/searchMovie.component';
import { SearchActorComponent } from './film-catalog/searchBlock/searchActor/searchActor.component';
import { ActorDetailComponent } from './film-catalog/actor-detail/actor-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'search',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full'
      },
      {
        path: 'actors',
        component: SearchActorComponent
      },
      {
        path: 'movies',
        component: SearchMovieComponent
      },

    ]
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'movies',
    component: FilmsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'movie/:id',
    component: FilmDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'actors',
    component: ActorsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'actor/:id',
    component: ActorDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'favorites',
    component: FavoritesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
