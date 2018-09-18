import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, tap, map, mergeMap } from 'rxjs/operators';
import { CONFIG_API } from './services/config.api';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn = false;

  constructor(
    private http: HttpClient,
    @Inject(CONFIG_API) public configApi
  ) {
    this.loggedIn = !!localStorage.getItem('userInfo');
  }

  isLoggedIn() {
    return this.loggedIn;
  }


  loginThemoviedb(login: string, password: string): Observable<any> {
    return this.http.get(`${this.configApi.apiUrl}/authentication/token/new` + '?api_key=' + this.configApi.apiKey).pipe(
      mergeMap(
        obj => this.linkTokenWithAccount(obj['request_token'], login, password)
      ),
      mergeMap(
        tokenInfo => this.getSession(tokenInfo['request_token'])
      ),
      mergeMap(
        session => this.getUserInfo(session['session_id'])
      ),
      tap(user => {
        localStorage.setItem('userInfo', user.id);
        this.loggedIn = true;
        this.saveSessioninfo(user);
      })
    );
  }

  linkTokenWithAccount(request_token, login, password): Observable<any> {
    const urlAppTokentget = `${this.configApi.apiUrl}/authentication/token/validate_with_login`
      + '?username=' + login
      + '&password=' + password
      + '&api_key=' + this.configApi.apiKey
      + '&request_token=' + request_token
      ;

    return this.http.get(
      urlAppTokentget
    );
  }


  saveSessioninfo(session: string): void {
    localStorage.setItem(
      'session',
      JSON.stringify(session)
    );
  }

  getSessionInfo(): any {
    const userProfile = JSON.parse(localStorage.getItem('session')) || null;
    return userProfile['username'];
  }

  getSession(requestToken): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.get(`${this.configApi.apiUrl}/authentication/session/new` + '?api_key=' + this.configApi.apiKey + '&request_token=' + requestToken);
  }

  getUserInfo(sessionId): Observable<any> {
    localStorage.setItem('sessionID', sessionId);
    return this.http.get(`${this.configApi.apiUrl}/account` + '?api_key=' + this.configApi.apiKey + '&session_id=' + sessionId);
  }


  logout(): void {
    localStorage.removeItem('userInfo');
    this.loggedIn = false;
  }
}
