import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Film } from '../../shared/models/film';
import { FilmService } from '../../shared/services/services/film.service';
import { FilmApiService } from '../../shared/services/services/film.api.service';


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
    public service: FilmApiService
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
    this.filmsService.addOrRemoveFromFavorite(film);
  }


}
