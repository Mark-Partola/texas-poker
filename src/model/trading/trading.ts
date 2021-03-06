interface ITradingProps {
  players: IPlayer[];
  blind: boolean;
}

interface IPlayerTradingState {
  player: IPlayer;
  bet: number;
  isActive: boolean;
}

export class Trading implements ITrading {
  private static readonly TIMEOUT = 30000;

  private players: IPlayerTradingState[] = [];

  constructor(props: ITradingProps) {
    this.players = props.players.map((player, idx) => ({
      player,
      bet: props.blind ? this.getBlind(idx) : 0,
      isActive: true
    }));
  }

  public async start(): Promise<ITradingResult> {
    let isFirst = true;

    while (isFirst || !this.isBalanced()) {
      isFirst = false;
      await this.startTradeRound();
    }

    const playersStates = this.getActivePlayersStates();

    const players = playersStates.map(state => state.player);

    return { players, bank: this.getBank() };
  }

  private async startTradeRound(): Promise<void> {
    for (let i = 0; i < this.players.length; i++) {
      const currentPlayerState = this.players[i];

      if (this.isLeftOnePlayer()) break;

      if (!currentPlayerState.isActive) continue;

      const minBet = this.getMinBet(currentPlayerState);

      const availableActions = ([] as string[])
        .concat("fold")
        .concat("raise")
        .concat(this.isBalancedBets() ? "check" : []);

      const action = await Promise.race([
        this.setTimeout(),
        currentPlayerState.player.acceptTrade({
          actions: availableActions,
          minBet
        })
      ]);

      if (!availableActions.includes(action.type)) {
        i--;
      }

      if (action.type === "fold") {
        const idx = this.players.findIndex(
          state => state.player.id === state.player.id
        );

        this.players[idx].isActive = false;
      }

      if (action.type === "raise") {
        const bet = action.payload.value;

        if (minBet <= bet) {
          currentPlayerState.bet += action.payload.value;
        } else {
          i--;
        }
      }
    }
  }

  private isBalanced(): boolean {
    return this.isLeftOnePlayer() || this.isBalancedBets();
  }

  private isLeftOnePlayer(): boolean {
    const activePlayersStates = this.getActivePlayersStates();

    return activePlayersStates.length === 1;
  }

  private isBalancedBets(): boolean {
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

  private getMinBet(playerState: IPlayerTradingState): number {
    const playersStates = this.getActivePlayersStates();

    const prevRaisedPlayer = playersStates.find(
      state => playerState.bet < state.bet
    );

    return prevRaisedPlayer ? prevRaisedPlayer.bet - playerState.bet : 0;
  }

  private getBank(): number {
    return this.players.reduce((acc, curr) => (acc += curr.bet), 0);
  }
}
