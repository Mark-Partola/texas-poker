interface ITradingProps {
  players: IPlayer[];
}

export class Trading implements ITrading {
  constructor(private readonly config: ITradingProps) {}

  public async start(): Promise<void> {
    const awaitedTraders = this.config.players.map(player =>
      player.acceptTrade()
    );

    await Promise.all(awaitedTraders);
  }
}
