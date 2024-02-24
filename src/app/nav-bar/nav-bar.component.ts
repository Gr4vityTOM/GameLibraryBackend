import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  username = "";
  constructor(private usersService: UsersService,
              private router: Router){}

  ngOnInit(): void {

  }
  isAdmin():boolean{
    return this.usersService.isAdmin()
  }
  get tokenExists(): boolean {
    return !!localStorage.getItem('Token');
  }

  logout() {
    if(confirm("Are you sure you want to log out ?")){
      this.usersService.logout();
      this.router.navigateByUrl("/")
    }

  }
}

