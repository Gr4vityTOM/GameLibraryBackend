import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {Auth} from "../../entities/auth";
import {UsersService} from "../../services/users.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;
  auth = new Auth('Peter','sovy');
  usersService = inject(UsersService);
  router = inject(Router);

  onSubmit() {

    this.usersService.login(this.auth).subscribe(success => {
      if (success) {
        console.log("Scc")
        this.router.navigate(["/library"]);
      }
    });
  }

}
