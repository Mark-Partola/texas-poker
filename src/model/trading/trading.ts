interface ITradingProps {
  players: IPlayer[];
}

interface IPlayerTradingState {
  player: IPlayer;
  bet: number;
  isActive: boolean;
}

export class Trading implements ITrading {
  private static readonly TIMEOUT = 10000;

  private players: IPlayerTradingState[] = [];

  constructor(props: ITradingProps) {
    this.players = props.players.map((player, idx) => ({
      player,
      bet: this.getBlind(idx),
      isActive: true
    }));
  }

  public async start(): Promise<ITradingResult> {
    while (!this.isBalanced()) {
      await this.startTradeRound();
    }

    const playersStates = this.getActivePlayersStates();

    const players = playersStates.map(state => state.player);

    return { players };
  }

  private async startTradeRound() {
    console.log("trade round started");

    for (let i = 0; i < this.players.length; i++) {
      const currentPlayerState = this.players[i];

      if (this.isLeftOnePlayer()) break;

      if (!currentPlayerState.isActive) continue;

      const availableActions = ([] as string[])
        .concat("fold")
        .concat("raise")
        .concat(this.isBalancedBets() ? "check" : []);

      const action = await Promise.race([
        this.setTimeout(),
        currentPlayerState.player.acceptTrade(availableActions)
      ]);

      console.log(action.type);

      if (action.type === "fold") {
        const idx = this.players.findIndex(
          state => state.player.id === state.player.id
        );

        this.players[idx].isActive = false;
      }

      if (action.type === "raise") {
        currentPlayerState.bet += action.payload.value;
      }
    }
  }

  private isBalanced(): boolean {
    return this.isLeftOnePlayer() || this.isBalancedBets();
  }

  private isLeftOnePlayer() {
    const activePlayersStates = this.getActivePlayersStates();

    return activePlayersStates.length === 1;
  }

  private isBalancedBets() {
    const activePlayersStates = this.getActivePlayersStates();

    const bets = Array.from(
      new Set(activePlayersStates.map(state => state.bet))
    );

    return bets.length === 1;
  }

  private setTimeout(): Promise<ITradingFoldAction> {
    return new Promise(resolve =>
      setTimeout(() => resolve({ type: "fold" }), Trading.TIMEOUT)
    );
  }

  private getActivePlayersStates(): IPlayerTradingState[] {
    return this.players.filter(playerState => playerState.isActive);
  }

  private getBlind(playerIdx: number): number {
    if (playerIdx === 0) return 1;
    if (playerIdx === 1) return 2;

    return 0;
  }
}
