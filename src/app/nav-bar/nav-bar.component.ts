import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  username = "";
  constructor(private usersService: UsersService,
              private router: Router){}

  ngOnInit(): void {
    this.usersService.loggedUser().subscribe(username => {
      this.username = username;
    });
  }

  logout() {
    this.usersService.logout();
    this.router.navigateByUrl("/")
  }
}

