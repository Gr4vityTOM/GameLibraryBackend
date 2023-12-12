import { Injectable } from '@angular/core';
import {Game} from "../entities/game";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable} from "rxjs";
import {User} from "../entities/user";
import {UsersService} from "./users.service";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient, private message: MessageService,private userService: UsersService) { }

  private games = [
        new Game("Crysis",2007,"FPS","EA"),
        new Game("Minecraft",2011,"Survival","Mojang"),
        new Game("Red dead redemption 2",2018,"Adventure","Rockstar"),
        new Game("Grand Theft Auto 5",2013,"Story","Rockstar")
  ]

  addGame(game:Game){
    this.games.push(game);
  }

  getGames():Game[]{
    return this.games;
  }

  sellGame(game:Game){
      this.userService.buyGame(game)
  }
}
