import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UsersService} from "../services/users.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usersService = inject(UsersService);

  if(usersService.token!=null){
    console.log(usersService.token)
    return true
  }else{
    console.log(usersService.token)
    router.navigateByUrl("/login")
    return false
  }
};
