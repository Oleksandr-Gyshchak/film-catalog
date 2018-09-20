import { Injectable, Inject } from '@angular/core';
import { Observable, throwError, Subject, ReplaySubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { FilmApiService } from './film.api.service';
import { Film } from '../../models/film';
import { FavoriteServer } from '../../models/favoriteServer';
import { MessagesService } from '../messages.service';


@Injectable({
  providedIn: 'root'
})

export class FilmService {
  constructor(
    private filmApiService: FilmApiService,
    private messagesService: MessagesService
  ) {
  }

  getFilmList(page: number): Observable<Film> {
    return this.filmApiService.getFilms(page).pipe(
      map((data): any => {
        return this.buildFavoriteInfo(data);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  searchFilm(query: string, page?: number): Observable<Film> {
    return this.filmApiService.searchFilm(query, page).pipe(
      map((data): any => {
        return this.buildFavoriteInfo(data);
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }


  getFilmById(id: number): Observable<any> {
    return this.filmApiService.getFilmById(id)
      .pipe(
        map((data): any => {
          return this.buildFavoriteInfo(
            { 'results': [data] }
          );
        }),
        catchError(err => {
          return throwError(err);
        })
      );
  }


  private buildFavoriteInfo(data: any): Observable<any> {
    this.filmApiService.getFavoriteList()
      .subscribe((favoritesList: any) => {
        this.buildFavorite(favoritesList, data);
      });
    return data;
  }

  private buildFavorite(favoritesList: any, data: any) {
    const favoritelist = favoritesList.results.map(film => film.id);
    data.results.map(film => {
      film.isFavorite = favoritelist.indexOf(film.id) > -1;
    });
  }

  favoriteCheck(film: Film): Observable<any> {
    return (!film.isFavorite)
      ? this.filmApiService.addOrRemovefavorite(film.id, true)
      : this.filmApiService.addOrRemovefavorite(film.id, false)
      ;
  }

  addOrRemoveFromFavorite(film: Film): void {
    this.favoriteCheck(film).subscribe(
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
      err => {
        console.log('error', err);
      }
    );
  }




}
