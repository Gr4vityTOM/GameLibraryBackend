import { Injectable } from '@angular/core';
import {Game} from "../entities/game";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, EMPTY, map, Observable, of, tap} from "rxjs";
import {User} from "../entities/user";
import {UsersService} from "./users.service";
import {ErrorHandlingService} from "./error-handling.service";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private url = "http://localhost:8080/"

  constructor(private http: HttpClient,private userService: UsersService, private errorHandle: ErrorHandlingService) { }
    private games: Game[] = [];


  getsGames():Game[]{
    return this.games;
  }

  addGame(game:Game){
    const headers = new HttpHeaders().set('Token', this.userService.token);

    return this.http.post<Game>(this.url+"course/new", game, { headers }).pipe(
      map(jsonGame=>Game.clone(jsonGame)),
      catchError(error=>this.errorHandle.errorHandling(error))
    )
  }

  getTempGames():Observable<Game[]>{
    return of(this.games)
  }

  getGames():Observable<Game[]>{
    const headers = new HttpHeaders().set('Token', this.userService.token)


    return this.http.get<Game[]>(this.url+"courses", {headers})
      .pipe(map(response=>this.cloneGames(response)),
        catchError(error=>this.errorHandle.errorHandling(error))
      )

  }

  private cloneGames(games:Game[]):Game[]{
    return games.map(game=>Game.clone(game))
  }


}
