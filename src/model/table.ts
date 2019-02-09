interface ITableConfig {
  placesCount: number;
}

export class Table implements ITable {
  private board: ICard[] = [];

  private places: (IPlayer | null)[] = Array.from(
    { length: this.config.placesCount },
    () => null
  );

  constructor(private readonly config: ITableConfig) {}

  public addPlayer(player: IPlayer, placeIdx?: number): void {
    const alreadyAtTable = Boolean(
      this.places.find(placedPlayer =>
        Boolean(placedPlayer && placedPlayer.id === player.id)
      )
    );

    if (alreadyAtTable) {
      throw new Error("Player already at the table");
    }

    const idx = placeIdx
      ? placeIdx
      : this.places.findIndex(place => place === null);

    this.places[idx] = player;
  }

  public removePlayer(player: IPlayer): void {
    this.places = this.places.map(placedPlayer =>
      placedPlayer && placedPlayer.id === player.id ? null : placedPlayer
    );
  }

  public getPlayers(): IPlayer[] {
    return this.places.filter(Boolean) as IPlayer[];
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
