import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FilmService } from '../../../shared/services/services/film.service';
import { Film } from '../../../shared/models/film';
import { FavoriteServer } from '../../../shared/models/favoriteServer';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagesService } from '../../../shared/services/messages.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-searchMovie',
  templateUrl: './searchMovie.component.html',
  styleUrls: ['./searchMovie.component.css']
})
export class SearchMovieComponent implements OnInit {
  query: any;
  preload: boolean = true;

  filmsList: Film;
  page: number = 1;
  // tslint:disable-next-line:no-inferrable-types
  lastPage: number = 1;

  errors: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public filmsService: FilmService,
    private router: Router,
    private messagesService: MessagesService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe((queryParams: any) => {
        this.errors = '';
        this.query = queryParams['query'];
        this.searchFilms(this.query);
      });
  }

  searchFilms(query: string, page: number = 1): void {
    this.errors = '';
    this.filmsService.searchFilm(query, page).subscribe(
      (data: any) => {
        console.log(data);
        this.saveData(data);
        this.preload = false;
      },
      err => {
        console.log('error', err);
      }
    );
  }

  saveData(serverData): void {
    this.page = serverData.page;
    this.lastPage = serverData.total_pages;
    this.filmsList = serverData.results;
  }

  searchArtors(value: string): void {
    this.router.navigate(['/search', 'actors'], {
      queryParams: {
        'query': this.query
      }
    });
  }

  getMoreItem(page: number): void {
    this.searchFilms(this.query, page);
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

  isEmptySearchResult(list): boolean {
    return list.length ? false : true;
  }
}
