export class RoundPreflopState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    const deck = this.round.getDeck();
    const players = this.round.getPlayers();

    players.forEach(player => player.setHand([deck.draw(), deck.draw()]));

    console.log("await bets round preflop");

    this.round.trade();
  }

  public process(): void {
    const states = this.round.getStates();
    this.round.setState(states.flop);
  }
}
