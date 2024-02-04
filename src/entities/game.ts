export class Game {
  public static clone(game: Game): Game {
    return new Game(

      game.title,
      game.date,
      game.description,
      game.genre,
      game.developer,
      game.id
    );
  }

  constructor(
    public title: string,
    public date: string,
    public description: string,
    public genre: string,
    public developer: string,
    public id?: string

) {}


  public toString() {
    return "ID: " + this.id + ", Name: " + this.title + ", ReleaseDate: " + this.date + ", Description: " + this.description + ", Genre: " + this.genre + ", Developer: " + this.developer;
  }
}
