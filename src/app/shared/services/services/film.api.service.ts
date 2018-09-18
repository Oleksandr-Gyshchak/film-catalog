import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG_API } from './config.api';

@Injectable({
  providedIn: 'root'
})


export class FilmApiService {
  constructor(
    private http: HttpClient,
    @Inject(CONFIG_API) public configApi
  ) { }

  getFilms(page?: number): Observable<any> {
    return this.http.get(`${this.configApi.movieUrl}/popular?page=${page}${this.configApi.params}`);
  }

  searchFilm(query: string, page?: number): Observable<any> {
    return this.http.get(`${this.configApi.searchUrl}/movie?page=${page}${this.configApi.params}&query=${query}`);
  }

  getFilmImgUrl(url: string): string {
    const imgUrl: string = (url) ? 'https://image.tmdb.org/t/p/w500'
      + url : 'https://ps.w.org/page-loading-effects/assets/screenshot-2.png?rev=1429753';
    return imgUrl;
  }


  get favoriteApiUrl(): string {
    const sessionID = localStorage.getItem('sessionID');
    const userID = localStorage.getItem('userInfo');

    return `${this.configApi.apiUrl}/account/${userID}/favorite?api_key=${this.configApi.apiKey}&session_id=${sessionID}`;
  }

  addOrRemovefavorite(id: number, isFavorite: boolean): Observable<any> {
    const options = {
      'media_type': 'movie',
      'media_id': id,
      'favorite': isFavorite
    };

    return this.http.post(this.favoriteApiUrl, options);
  }

  getFavoriteList(): Observable<any> {
    const sessionID = localStorage.getItem('sessionID');
    const userID = localStorage.getItem('userInfo');

    // tslint:disable-next-line:max-line-length
    const favoriteUrl = `${this.configApi.apiUrl}/account/${userID}/favorite/movies?api_key=${this.configApi.apiKey}&session_id=${sessionID}`;
    return this.http.get(favoriteUrl);
  }

  getFilmById(id: number): Observable<any> {
    return this.http.get(`${this.configApi.movieUrl}/${id}?api_key=${this.configApi.apiKey}&language=ru-RU`);
  }


}
