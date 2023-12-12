import {Component, OnInit} from '@angular/core';
import {Game} from "../../entities/game";
import {StoreService} from "../../services/store.service";
import {MatTableModule} from "@angular/material/table";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {User} from "../../entities/user";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonToggleModule

  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit{
    games: Game[] = [];

  constructor(private storeService:StoreService,private userService:UsersService) {}

  buyGame(game:Game):void{
    if(!this.userService.getBoughtGames().includes(game)){
      this.userService.buyGame(game)
    }


  }

  ngOnInit(): void {
    this.games = this.storeService.getGames();
  }
}
