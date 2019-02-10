import { Table } from "./table";
import { Round } from "./round/round";

interface IGameConfig {
  playersCount: number;
}

export class Game {
  private table = new Table({
    placesCount: this.config.playersCount
  });

  private round: Round = new Round({
    table: this.table
  });

  private playersCount: number = 0;

  constructor(private readonly config: IGameConfig) {}

  public addPlayer(player: IPlayer, placeIdx?: number) {
    if (this.playersCount >= this.config.playersCount) {
      throw new Error("No places left");
    }

    this.table.addPlayer(player, placeIdx);

    this.playersCount++;

    if (!this.round.isActive()) {
      this.round.start({ players: this.table.getPlayers() });
    }
  }

  public removePlayer(player: IPlayer): void {
    this.playersCount--;

    this.table.removePlayer(player);
  }
}
