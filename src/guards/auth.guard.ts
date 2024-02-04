import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UsersService} from "../services/users.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usersService = inject(UsersService);

  if(usersService.token!=null){
    return true
  }else{
    router.navigateByUrl("/login")
    return false
  }
};
