import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  Name = ""
  Email = ""
  Password = ""
  conPassword = ""


  onSubmit(){
    if(this.Password==this.conPassword){
      console.log("Jakoooooooooooooooooooooooooooooooooooo")
    }
  }
}
