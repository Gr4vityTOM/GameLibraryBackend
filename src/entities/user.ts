import { Group } from "./group";
export class User{
  public static clone(user:User):User{
    const groups = user.groups?.map(ug => Group.clone(ug)) || [];
    return new User(user.name,
      user.email,
      user.id,
      user.lastlogin? new Date(user.lastlogin):new Date(),
      user.password,
      user.active === undefined ? true : user.active ,
      groups
    )

  }

  constructor(
    public name:string,
    public email:string,
    public id?:number,
    public lastlogin?:Date,
    public password='',
    public active = true,
    public groups: Group[] = []

  ) {
  }

  public toString() {
    return this.name + ", email:"+ this.email + ", id:" + this.id;
  }

}
