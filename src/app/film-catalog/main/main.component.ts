import { Component, OnInit } from '@angular/core';
import { MainService } from './main.service';
import { Router } from '@angular/router';
import { Film } from '../../shared/models/film';
import { Actor } from '../../shared/models/actor';
import { MessagesService } from '../../shared/services/messages.service';
import { FilmService } from '../../shared/services/services/film.service';
import { FavoriteServer } from '../../shared/models/favoriteServer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  preload = true;
  filmsList: Film;
  actorsList: Actor;
  msg: string;

  constructor(
    public mainService: MainService,
    public router: Router,
    private messagesService: MessagesService,
    public filmsService: FilmService
  ) { }


  ngOnInit() {
    this.mainService.getFilmsAndActors().subscribe(
      (data: any) => {
        console.log(data);
        this.filmsList = data[0].results.slice(0, 4);
        this.actorsList = data[1].results.slice(0, 4);
        this.preload = false;
      },
      err => {
        console.log('error', err);
      });
  }

  redirectToFilms() {
    this.router.navigate(['/movies']);
  }

  redirectToActors() {
    this.router.navigate(['/actors']);
  }

  addToFavorite(film: Film): void {
    this.filmsService.addOrRemoveFromFavorite(film);
  }


}
