import {Component, OnInit} from '@angular/core';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTableModule} from "@angular/material/table";
import {User} from "../../entities/user";
import {Game} from "../../entities/game";
import {StoreService} from "../../services/store.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-library',
  standalone: true,
    imports: [
        MatButtonToggleModule,
        MatTableModule
    ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})
export class LibraryComponent implements OnInit{
    Games: Game[] = []
  constructor(private storeService:StoreService,private userService: UsersService) {}

  ngOnInit() {
      this.Games = this.userService.getBoughtGames()
  }
}
