import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UsersService} from "../services/users.service";
import {ErrorHandlingService} from "../services/error-handling.service";

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usersService = inject(UsersService);
  const error = inject(ErrorHandlingService)

  if(usersService.isAdmin() &&usersService.token!=null ){
    return true
  }else{
    router.navigateByUrl("/library")
    error.openDialog("Not enough permissions")
    return false
  }
};
