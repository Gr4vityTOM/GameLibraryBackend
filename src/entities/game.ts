export class Game{
  constructor(
    public Name:string,
    public ReleaseDate:number,
    public Genre:string,
    public Developer:string
  ) {
  }

  public toString() {
    return "Name: "+this.Name + ", ReleaseDate:"+ this.ReleaseDate + ", Genre:" + this.Genre + ", Developer:" + this.Developer;
  }
}
