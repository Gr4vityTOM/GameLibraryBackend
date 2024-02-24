
import {Game} from "./game";
export class User{


  constructor(
    public name:string,
    public email:string,
    public id?:number,
    public password='',
    public isAdmin?:boolean,
    public games: Game[] = []

  ) {
  }


  public toString() {
    return this.name + ", email:"+ this.email + ", id:" + this.id;
  }

}
