interface ITradingProps {
  players: IPlayer[];
}

export class Trading implements ITrading {
  private static readonly TIMEOUT = 10000;

  constructor(private readonly config: ITradingProps) {}

  public async start(): Promise<void> {
    const players = this.config.players;

    for (let player of players) {
      const action = await Promise.race([
        this.setTimeout(),
        player.acceptTrade()
      ]);

      console.log(action);
    }
  }

  private setTimeout() {
    return new Promise(resolve =>
      setTimeout(() => resolve({ type: "fold" }), Trading.TIMEOUT)
    );
  }
}
