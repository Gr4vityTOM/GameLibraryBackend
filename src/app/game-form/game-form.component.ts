import {Component, inject, OnInit} from '@angular/core';
import { Game } from '../../entities/game';
import { StoreService } from '../../services/store.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  MinLengthValidator,
  MinValidator,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {MatInputModule} from "@angular/material/input";
import {ValueUnavailableKind} from "@angular/compiler-cli/src/ngtsc/reflection";
import {min} from "rxjs";

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css'
})
export class GameFormComponent implements OnInit{


    title: string = ''
    releaseYear: number = 0
    genre: string = ''
    publisher: string = ''
  router = inject(Router);



  gameForm: FormGroup;

  constructor(private fb: FormBuilder,private storeService: StoreService,private  userService: UsersService) {
    this.gameForm = this.fb.group({
      title: ['', Validators.required],
      date: ['',Validators.required],
      description: [''],
      genre: [''],
      developer: ['', Validators.required]
    });
  }
  ngOnInit(): void {

  }


  onSubmit(){
    this.storeService.addGame( new Game(
      this.gameForm.get('title')?.value,
      this.gameForm.get('date')?.value||"TBD",
      this.gameForm.get('description')?.value||"No description provided",
      this.gameForm.get('genre')?.value,
      this.gameForm.get('developer')?.value
    )).subscribe(response => {
      this.router.navigate(["/store"]);
    })
  }
};


