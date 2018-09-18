import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild, SimpleChanges } from '@angular/core';

import { FilmApiService } from '../../shared/services/services/film.api.service';
import { Film } from '../../shared/models/film';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.css']
})
export class FilmItemComponent implements OnInit {
  @Input() film: Film;
  @Output() favorite = new EventEmitter<Film>();


  toolTipLabels = {
    add: 'Добавить в избранное',
    remove: 'Удалить из избранного'
  };


  constructor(
    public filmsService: FilmApiService,
    public router: Router
  ) {
  }

  ngOnInit() {
  }

  getImgUrl(url): string {
    return this.filmsService.getFilmImgUrl(url);
  }

  startFilm(film: Film): void {
    this.favorite.emit(film);
  }


  openFilmById(film: Film) {
    this.router.navigate(['/movie', film.id]);
  }

  getButtonColour(): string {
    return this.film.isFavorite ? 'accent' : 'primary';
  }

  getToolTipLabel(): string {
    return this.film.isFavorite ? this.toolTipLabels.remove : this.toolTipLabels.add;
  }

}
