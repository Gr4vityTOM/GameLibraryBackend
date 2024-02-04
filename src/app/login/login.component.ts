import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {Auth} from "../../entities/auth";
import {UsersService} from "../../services/users.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ErrorComponent} from "../error/error.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
  auth = new Auth('','');
  usersService = inject(UsersService);
  router = inject(Router);
  constructor(public dialog: MatDialog) {}

  onSubmit() {

    this.usersService.login(this.auth).subscribe(success => {
      if (success) {
        this.router.navigate(["/library"]);
      }
    });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // Prevent closing by clicking outside
    dialogConfig.autoFocus = true;

    this.dialog.open(ErrorComponent, dialogConfig);
  }
}
