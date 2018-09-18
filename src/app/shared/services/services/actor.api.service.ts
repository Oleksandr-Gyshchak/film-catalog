import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG_API } from './config.api';


@Injectable({
  providedIn: 'root'
})
export class ActorService {

  constructor(
    private http: HttpClient,
    @Inject(CONFIG_API) public configApi
  ) { }

  getActorsList(page?: number): Observable<any> {
    return this.http.get(`${this.configApi.personUrl}/popular?page=${page}${this.configApi.params}`)
  }

  searchActor(query: string, page?: number): Observable<any> {
    return this.http.get(`${this.configApi.searchUrl}/person?page=${page}${this.configApi.params}&query=${query}`)
  }

  getFilmImgUrl(url: string): string {
    const imgUrl: string = (url)
      ? 'https://image.tmdb.org/t/p/w500' + url
      : 'https://ps.w.org/page-loading-effects/assets/screenshot-2.png?rev=1429753';
    return imgUrl;
  }

}
