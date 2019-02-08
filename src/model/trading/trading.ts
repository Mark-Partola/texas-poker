interface ITradingProps {
  players: IPlayer[];
}

export class Trading implements ITrading {
  private static readonly TIMEOUT = 10000;

  constructor(private readonly config: ITradingProps) {}

  public async start(): Promise<ITradingResult> {
    const players = this.config.players;

    const remainsPlayers = [];

    for (let player of players) {
      const action = await Promise.race([
        this.setTimeout(),
        player.acceptTrade()
      ]);

      if (action.type !== "fold") {
        remainsPlayers.push(player);
      }
    }

    return {
      players: remainsPlayers
    };
  }

  private setTimeout(): Promise<ITradingFoldAction> {
    return new Promise(resolve =>
      setTimeout(() => resolve({ type: "fold" }), Trading.TIMEOUT)
    );
  }
}
