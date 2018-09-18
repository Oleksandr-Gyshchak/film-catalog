import { Component, OnInit, ViewChild } from '@angular/core';
import { ActorService } from '../../shared/services/services/actor.api.service';
import { Actor } from '../../shared/models/actor';


@Component({
  selector: 'app-actors-list',
  templateUrl: './actors-list.component.html',
  styleUrls: ['./actors-list.component.css']
})
export class ActorsListComponent implements OnInit {

  preload = true;
  actorsList: Actor;
  page = 1;
  lastPage = 1;
  searchQuery: string;

  constructor(
    public actorService: ActorService
  ) { }


  ngOnInit() {
    this.getActorsList();
  }

  getActorsList(page: number = 1): void {
    this.actorService.getActorsList(page).subscribe(
      (data: any) => {
        this.saveData(data);
        this.preload = false;
      },
      err => {
        console.log('error', err);
      });
  }

  saveData(serverData): void {
    this.page = serverData.page;
    this.lastPage = serverData.total_pages;
    this.actorsList = serverData.results;
  }

  getMoreActors(page: number): void {
    this.getActorsList(page);
  }


}
