import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, EMPTY, map, Observable, of, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Auth} from "../entities/auth";
import {User} from "../entities/user";
import {Game} from "../entities/game";
import {ErrorHandlingService} from "./error-handling.service";

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
  private boughtGames:Game[]=[]

  private loggedUserSubject = new BehaviorSubject(this.username);
  constructor(private http: HttpClient, private errorHandle: ErrorHandlingService) { }


  public get token(): string {
    return localStorage.getItem('Token') || "";
  }
  private set token(value: string) {
    if (value) {
      localStorage.setItem('Token', value);
    } else {
      localStorage.removeItem('Token');
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

  buyGames(game:Game){
    const headers = new HttpHeaders().set('Token', this.token)
    const gameID = game.id

    return this.http.put<Game>(this.url+"course/"+gameID+"/reserve", {},{headers})
      .pipe(map(response=>{
          console.log(response)
        }),
        catchError(error=>this.errorHandle.errorHandling(error))
      )

  }
  sellGame(game:Game){
    const headers = new HttpHeaders().set('Token', this.token)
    const gameID = game.id

    return this.http.put<Game>(this.url+"course/"+gameID, {},{headers})
      .pipe(map(response=>{
          console.log(response)
        }),
        catchError(error=>this.errorHandle.errorHandling(error))
      )

  }

  removeGame(game:Game){
    const headers = new HttpHeaders().set('Token', this.token)
    const gameID = game.id

    return this.http.delete<Game>(this.url+"course/"+gameID, {headers})
      .pipe(map(response=>{
          console.log(response)
        }),
        catchError(error=>this.errorHandle.errorHandling(error))
      )
  }

  public loggedUser(): Observable<string> {
    return this.loggedUserSubject.asObservable();
  }


    getMyGames():Observable<Game[]>{
    const headers = new HttpHeaders().set('Token', this.token)


    return this.http.get<Game[]>(this.url+"myCourses", {headers})
      .pipe(map(response=>{
          const games =this.cloneGames(response)
          this.saveBoughtGames(games)
          return games
        }),
        catchError(error=>this.errorHandle.errorHandling(error))
      )

  }

  private cloneGames(games:Game[]):Game[]{
    return games.map(game=>Game.clone(game))
  }

  private saveBoughtGames(games: Game[]): void {
    this.boughtGames = games;
  }




  login(auth:Auth):Observable<boolean> {
    return this.http.post(this.url + "login", auth,{responseType: 'text'}).pipe(
      map(token => {
        this.token = "Bearer "+token;
        return true;
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.errorHandle.openDialog("Wrong credentials")
            return of(false);
          }
          else if (error.status === 0) {
            this.errorHandle.errorHandling(error)
            return of(false);
          }
        }
        return throwError(() => this.errorHandle.errorHandling(error))
      }),
    )
  }


  logout() {
    this.token = "";
    this.loggedUserSubject.next('');
  }


}
