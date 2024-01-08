import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";
import {LibraryComponent} from "./library/library.component";
import {StoreComponent} from "./store/store.component";
import { GameFormComponent } from './game-form/game-form.component';
import {RegisterComponent} from "./register/register.component";

export const routes: Routes = [
  {path:"library",component:LibraryComponent},
  {path:"store",component:StoreComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"game-form", component: GameFormComponent},
  {path:"",redirectTo:"/login",pathMatch: "full"},
  {path:"**",component:PageNotFoundComponent}

];
