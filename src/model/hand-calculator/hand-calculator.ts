interface IHandCalculatorConfig {
  players: IPlayer[];
}

export class HandCalculator {
  constructor(private readonly config: IHandCalculatorConfig) {}

  public calculate(): IPlayer[] {
    return this.config.players;
  }
}
