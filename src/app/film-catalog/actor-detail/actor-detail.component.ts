import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {

  id: number;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    /*
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
    */

  }

}
