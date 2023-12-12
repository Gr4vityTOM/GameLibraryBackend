import { Component } from '@angular/core';
import { Game } from '../../entities/game';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css'
})
export class GameFormComponent {

    name: string = ''
    releasedate: number = 0
    genre: string = ''
    developer: string = ''
  
  constructor(private storeService: StoreService) {}

  //Metoda on Submit
  onSubmit(name: string, releasedate: number, genre: string, developer: string){
    
  }
};

    
