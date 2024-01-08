export class Game{
  constructor(
    public Title:string,
    public ReleaseYear:number,
    public Genre:string,
    public Publisher:string
  ) {
  }

  public toString() {
    return "Name: "+this.Title + ", ReleaseDate:"+ this.ReleaseYear + ", Genre:" + this.Genre + ", Developer:" + this.Publisher;
  }
}
