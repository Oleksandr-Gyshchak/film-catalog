import { Component, OnInit, Input } from '@angular/core';
import { ActorService } from '../../shared/services/services/actor.api.service';
import { Actor } from '../../shared/models/actor';

@Component({
  selector: 'app-actor-item',
  templateUrl: './actor-item.component.html',
  styleUrls: ['./actor-item.component.css']
})
export class ActorItemComponent implements OnInit {

  @Input() actor: Actor;

  constructor(public actorService: ActorService) { }

  ngOnInit() {
  }

  getImgUrl(url): string {
    return this.actorService.getFilmImgUrl(url);
  }
}
