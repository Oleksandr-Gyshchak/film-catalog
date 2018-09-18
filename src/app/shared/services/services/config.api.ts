import { InjectionToken } from '@angular/core';

export const configApi = {
  apiKey: '375477acb77265d0ddd2171c5f685a11',
  apiUrl: 'https://api.themoviedb.org/3',
  movieUrl: 'https://api.themoviedb.org/3/movie',
  personUrl: 'https://api.themoviedb.org/3/person',
  searchUrl: 'https://api.themoviedb.org/3/search',
  params: '&api_key=375477acb77265d0ddd2171c5f685a11&language=ru-RU',
  imgPath: 'https://image.tmdb.org/t/p',
  midImgPath: 'https://image.tmdb.org/t/p/w500',
  smallImgPath: 'https://image.tmdb.org/t/p/w185',
  bigBackPath: 'https://image.tmdb.org/t/p/w1280',
  midBackPath: 'https://image.tmdb.org/t/p/w780',
  smallBackPath: 'https://image.tmdb.org/t/p/w300',
  favoriteApiUrl: 'https://api.themoviedb.org/3/account/'



};

export const CONFIG_API = new InjectionToken<any>(' ');

