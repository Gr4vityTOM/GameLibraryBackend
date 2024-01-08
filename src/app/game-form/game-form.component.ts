import {Component, inject} from '@angular/core';
import { Game } from '../../entities/game';
import { StoreService } from '../../services/store.service';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-game-form',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css'
})
export class GameFormComponent {


    title: string = ''
    releaseYear: number = 0
    genre: string = ''
    publisher: string = ''
  router = inject(Router);


  constructor(private storeService: StoreService) {}

  //Metoda on Submit
  onSubmit(){
    this.storeService.addGame(new Game(this.title,this.releaseYear,this.genre,this.publisher))
    this.router.navigate(["/store"]);
  }
};


