import { Injectable } from '@angular/core';
import {Game} from "../entities/game";

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private games = [
        new Game("Crysis",2007,"FPS","EA"),
        new Game("Minecraft",2011,"Survival","Mojang"),
        new Game("Red dead redemption 2",2018,"Adventure","Rockstar"),
        new Game("Grand Theft Auto 5",2013,"Story","Rockstar")
  ]
  constructor() { }
}
