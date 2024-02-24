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

  private boughtGames:Game[]=[]
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

  public isAdmin():boolean{
    if(this.role == "admin"){
      return true
    }else{
      return false
    }
  }

  private set role(role:string){
    if (role) {
      localStorage.setItem('Role', role);
    } else {
      localStorage.removeItem('Role');
    }  }

  private get role():string{
    return localStorage.getItem('Role') || "";
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
        let tokenarray = token.split(':')
        this.role = tokenarray[1]
        this.token = "Bearer "+tokenarray[0];
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
  }


}
