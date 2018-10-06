import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ActorService } from '../../../shared/services/services/actor.api.service';
import { Actor } from '../../../shared/models/actor';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-searchActor',
  templateUrl: './searchActor.component.html',
  styleUrls: ['./searchActor.component.css']
})
export class SearchActorComponent implements OnInit {

  query: any;
  preload: boolean = true;
  page: number = 1;
  lastPage: number = 1;
  actorsList: Actor;
  errors: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public actorService: ActorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe((queryParams: any) => {
        this.errors = '';
        this.query = queryParams['query'];
        this.searchActors(this.query);
      });

  }

  searchActors(query: string, page: number = 1): void {
    this.actorService.searchActor(query, page).subscribe(
      (data: any) => {
        this.saveData(data);
        this.preload = false;
      },
      err => {
        console.log('error', err);
      }
    );
  }


  isEmptySearchResult(list): boolean {
    return list.length ? false : true;
  }

  saveData(serverData): void {
    this.page = serverData.page;
    this.lastPage = serverData.total_pages;
    this.actorsList = serverData.results;
  }

  getMoreActors(page: number): void {
    this.searchActors(this.query, page);
  }

  searchFilms(): void {
    this.router.navigate(['/search', 'movies'], { queryParams: { 'query': this.query } });
  }

}
