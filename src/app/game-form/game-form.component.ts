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


    name: string = ''
    releasedate: number = 0
    genre: string = ''
    developer: string = ''
  router = inject(Router);


  constructor(private storeService: StoreService) {}

  //Metoda on Submit
  onSubmit(){
    this.storeService.addGame(new Game(this.name,this.releasedate,this.genre,this.developer))
    this.router.navigate(["/store"]);
  }
};

    
