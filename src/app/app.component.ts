import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { MessagesService } from './shared/services/messages.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  userName: string;

  links: object[] = [
    {
      path: '/main',
      label: 'Main',
      active: 'button-active',
      icon: 'home'
    },
    {
      path: '/movies',
      label: 'Films',
      active: 'button-active',
      icon: 'list_alt'
    },
    {
      path: '/actors',
      label: 'Actors',
      active: 'button-active',
      icon: 'person'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessagesService
  ) {
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  ngOnInit() {

  }



  logOut() {
    this.router.navigate(['/login'])
      .then((isNavigate) => {
        if (isNavigate) {
          this.authService.logout();
        }
      })
      .catch((err) => {
        this.msgService.setMessage({
          type: 'danger',
          body: err
        });
      });

  }

  get loadUserProfile() {
    const username = this.authService.getSessionInfo();
    return username;
  }

  openFavoritesList() {
    this.router.navigate(['/favorites']);
  }

}
