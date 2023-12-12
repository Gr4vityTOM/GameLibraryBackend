import { Group } from "./group";
import {Game} from "./game";
export class User{
  public static clone(user:User):User{
    const groups = user.groups?.map(ug => Group.clone(ug)) || [];
    return new User(user.name,
      user.email,
      user.id,
      user.password,
      groups
    )

  }

  constructor(
    public name:string,
    public email:string,
    public id?:number,
    public password='',
    public groups: Group[] = [],
    public games: Game[] = []

  ) {
  }

  public buyGame(game:Game){
    this.games.push(game)
  }
  public toString() {
    return this.name + ", email:"+ this.email + ", id:" + this.id;
  }

}
