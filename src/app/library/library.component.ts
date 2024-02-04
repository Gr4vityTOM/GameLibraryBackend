import {Component, OnInit} from '@angular/core';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTableModule} from "@angular/material/table";
import {User} from "../../entities/user";
import {Game} from "../../entities/game";
import {StoreService} from "../../services/store.service";
import {UsersService} from "../../services/users.service";
import {Observable} from "rxjs";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatTableModule,
    NgIf
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit{
    games: Game[] = []
  constructor(private storeService:StoreService,private userService: UsersService,private router: Router) {}
  removeGame(game:Game){
      if(confirm("Are you sure you want to remove this game from your library ?")){
        this.userService.sellGame(game).subscribe()
      }

  }

  ngOnInit() {
      if(this.userService.token == ""){
        this.router.navigateByUrl("/")
      }
    let games$: Observable<Game[]> = this.userService.getMyGames();
    games$.subscribe({
      next: games => this.games = games
    })
  }

}
