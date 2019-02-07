import { Table } from "./table";
import { Round } from "./round/round";

interface IGameConfig {
  usersCount: number;
}

export class Game {
  private table = new Table({
    placesCount: this.config.usersCount
  });

  private round: Round = new Round({
    table: this.table
  });

  private usersCount: number = 0;

  constructor(private readonly config: IGameConfig) {}

  public addUser(user: IUser, placeIdx?: number) {
    if (this.usersCount >= this.config.usersCount) {
      throw new Error("No places left");
    }

    this.table.addUser(user, placeIdx);

    this.usersCount++;

    if (this.usersCount > 1 && !this.round.isActive()) {
      this.round.start();
    }
  }

  public removeUser(user: IUser): void {
    this.usersCount--;

    this.table.removeUser(user);
  }
}
