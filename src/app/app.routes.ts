import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";
import {LibraryComponent} from "./library/library.component";
import {StoreComponent} from "./store/store.component";
import { GameFormComponent } from './game-form/game-form.component';
import {authGuard} from "../guards/auth.guard";
import {Routes} from "@angular/router";
import {adminGuard} from "../guards/admin.guard";

export const routes: Routes = [
  {path:"library",component:LibraryComponent,canActivate:[authGuard]},
  {path:"store",component:StoreComponent,canActivate:[authGuard]},
  {path:"game-form", component: GameFormComponent,canActivate:[adminGuard]},
  {path:"login",component:LoginComponent},
  {path:"",redirectTo:"/login",pathMatch: "full"},
  {path:"**",component:PageNotFoundComponent}

];

