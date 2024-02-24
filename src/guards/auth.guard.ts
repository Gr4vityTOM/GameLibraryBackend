import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UsersService} from "../services/users.service";
import {ErrorHandlingService} from "../services/error-handling.service";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const usersService = inject(UsersService);
  const error = inject(ErrorHandlingService)


  if(usersService.token!=""){
    return true
  }else{
    router.navigateByUrl("/login")
    error.openDialog("Please log in")
    return false
  }
};
