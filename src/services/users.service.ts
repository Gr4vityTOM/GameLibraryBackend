import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, EMPTY, map, Observable, of, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Auth} from "../entities/auth";
import {User} from "../entities/user";
import {Game} from "../entities/game";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = "http://localhost:8080/"
  private users = [
    new User("ฅʕ•̫͡•ʔฅ","MarekG@moj.otc"),
    new User("Adolf","TopG1940@bigman.com",69,"heselne"),
    new User("Hedviga","Hedviga@kokot.ppc"),
    new User("Asisi","Asisi@kokot.ppc")
  ]
  private boughtgames:Game[]=[]

  private loggedUserSubject = new BehaviorSubject(this.username);
  constructor(private http: HttpClient) { }


  private get token(): string {
    return localStorage.getItem('umToken') || '';
  }
  private set token(value: string) {
    if (value) {
      localStorage.setItem('umToken', value);
    } else {
      localStorage.removeItem('umToken');
    }
  }

  private get username():string{
    return localStorage.getItem("umUsername")||""
  }

  private set username(value:string){
    if(value){
      localStorage.setItem("umUsername",value)
    }else{
      localStorage.removeItem("umUsername")
    }
    this.loggedUserSubject.next(value)
  }

  public buyGame(game:Game){
    this.boughtgames.push(game)
  }

  public getBoughtGames() {
    return this.boughtgames
  }
  public loggedUser(): Observable<string> {
    return this.loggedUserSubject.asObservable();
  }





  login(auth:Auth):Observable<boolean> {
    return this.http.post(this.url + "login", auth,{responseType: 'text'}).pipe(
      map(token => {
        this.token = token;
        this.loggedUserSubject.next(auth.name);
        return true;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            return of(false);
          }
        }
        return throwError(() => error)
      }),
    )
  }


  logout() {
    this.token = '';
    this.loggedUserSubject.next('');
  }
}
