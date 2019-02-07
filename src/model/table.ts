interface ITableConfig {
  placesCount: number;
}

export class Table implements ITable {
  private board: ICard[] = [];

  private places: (IUser | null)[] = Array.from({
    length: this.config.placesCount
  });

  constructor(private readonly config: ITableConfig) {}

  public addUser(user: IUser, placeIdx: number): void {
    this.places[placeIdx] = user;
  }

  public removeUser(user: IUser): void {
    this.places = this.places.map(place => (place === user ? null : place));
  }

  public getUsers(): IUser[] {
    return this.places.filter(Boolean) as IUser[];
  }

  public clearCards(): void {
    this.board = [];
  }

  public addCards(cards: ICard[]): void {
    this.board = this.board.concat(cards);
  }

  public getCards(): ICard[] {
    return this.board;
  }
}
