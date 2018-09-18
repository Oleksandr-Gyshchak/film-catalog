import { Injectable, Inject } from '@angular/core';
import { Observable, forkJoin, observable } from 'rxjs';
import { ActorService } from '../../shared/services/services/actor.api.service';
import { FilmService } from '../../shared/services/services/film.service';



@Injectable({
  providedIn: 'root'
})

export class MainService {
  constructor(
    public actorService: ActorService,
    public filmService: FilmService
  ) { }

  getFilmsAndActors() {
    const page = 1;
    return forkJoin(
      this.filmService.getFilmList(page),
      this.actorService.getActorsList(page)
    );
  }
}
