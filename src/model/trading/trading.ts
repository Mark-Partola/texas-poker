interface ITradingProps {
  players: IPlayer[];
}

export class Trading implements ITrading {
  private static readonly TIMEOUT = 10000;

  private activePlayers: IPlayer[] = [];

  private pot: number = 0;

  constructor(private readonly config: ITradingProps) {
    this.activePlayers = [...config.players];
  }

  public async start(): Promise<ITradingResult> {
    while (!this.isBalanced()) {
      await this.startTradeRound();
    }

    return { players: this.activePlayers };
  }

  private async startTradeRound() {
    console.log("trade round started");

    for (let i = 0; i < this.activePlayers.length; i++) {
      if (this.activePlayers.length === 1) continue;

      const player = this.activePlayers[i];

      const action = await Promise.race([
        this.setTimeout(),
        player.acceptTrade()
      ]);

      if (action.type === "check") {
        // TODO: нельзя чекать если был несбалансированный рейз.
      }

      if (action.type === "fold") {
        const idx = this.activePlayers.findIndex(
          (activePlayer: IPlayer) => activePlayer.getId() === player.getId()
        );

        this.activePlayers.splice(idx, 1);
      }

      if (action.type === "raise") {
        this.pot += action.payload.value;
      }
    }
  }

  private isBalanced(): boolean {
    return this.activePlayers.length === 1;
    // первый - всегда
    // если все чек - конец
    // если рейз - следующие повышают, следующий круг
  }

  private setTimeout(): Promise<ITradingFoldAction> {
    return new Promise(resolve =>
      setTimeout(() => resolve({ type: "fold" }), Trading.TIMEOUT)
    );
  }
}
