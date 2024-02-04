import {Component, OnInit} from '@angular/core';
import {Game} from "../../entities/game";
import {StoreService} from "../../services/store.service";
import {MatTableModule} from "@angular/material/table";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {User} from "../../entities/user";
import {UsersService} from "../../services/users.service";
import {NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonToggleModule,
    NgIf

  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit{
    games: Game[] = []
    myGames: Game[]=[]

  constructor(private storeService:StoreService,private userService:UsersService,private router: Router) {}

  buyGame(game:Game):void{
    this.userService.buyGames(game)
      .subscribe(response => {
        this.router.navigate(["/library"])
      })
  }
  removeGame(game:Game){
    if(confirm("Are you sure you want to remove this game from the store ?")){
      this.userService.removeGame(game).subscribe()
      }
  }
  isAdmin():boolean{
    return true
  }
  isBought(game:Game){
    if(this.myGames.find(curgame => curgame.id === game.id)){
      return false
    }
    else{
      return true
    }
  }

  ngOnInit(): void{
    if(this.userService.token == ""){
      this.router.navigateByUrl("/")
    }

    let games$: Observable<Game[]> = this.storeService.getGames();
    let myGames$: Observable<Game[]> = this.userService.getMyGames();



    games$.subscribe({
      next: games => this.games = games
    })

    myGames$.subscribe({
      next: myGames => this.myGames = myGames
    })

  }
}
