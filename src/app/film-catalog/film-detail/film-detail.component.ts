import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Film } from '../../shared/models/film';
import { FilmService } from '../../shared/services/services/film.service';
import { FilmApiService } from '../../shared/services/services/film.api.service';
import { FavoriteServer } from '../../shared/models/favoriteServer';
import { MessagesService } from '../../shared/services/messages.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
  film: Film;
  id: number;
  toolTipLabels = {
    add: 'Добавить в избранное',
    remove: 'Удалить из избранного'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    public filmsService: FilmService,
    public service: FilmApiService,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      this.filmsService.getFilmById(this.id)
        .subscribe((filmItem: any) => {
          if (filmItem) {
            this.film = filmItem.results[0];
            console.log(filmItem.results);
          }
        });
    });
  }

  getButtonColour(): string {
    return this.film.isFavorite ? 'accent' : 'primary';
  }

  getToolTipLabel(): string {
    return this.film.isFavorite ? this.toolTipLabels.remove : this.toolTipLabels.add;
  }

  addToFavorite(film: Film): void {
    this.filmsService.favoriteCheck(film).subscribe(
      (data: FavoriteServer) => {
        if (data.status_code === 1) {
          this.messagesService.setMessage({
            type: 'success',
            body: ` Фильм ${film.title}, успешно добавлен в избранное`,
            action: 'success'
          });
        } else if (data.status_code === 13) {
          this.messagesService.setMessage({
            type: 'warning',
            body: ` Фильм ${film.title}, удален из избранного`,
            action: 'warning'
          });
        }
        film.isFavorite = !film.isFavorite;
      },
      (err: HttpErrorResponse) => {
        console.log('error', err);
        this.messagesService.setMessage({
          type: 'warning',
          body: ` ${err.error.status_message}`,
          action: 'warning'
        });
      }
    );
  }


}
