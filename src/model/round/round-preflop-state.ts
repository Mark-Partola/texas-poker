export class RoundPreflopState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    const deck = this.round.getDeck();
    const users = this.round.getUsers();

    users.forEach(user => user.setHand([deck.draw(), deck.draw()]));

    console.log("await bets round preflop");

    this.round.trade().then(() => this.process());
  }

  public process(): void {
    const states = this.round.getStates();
    this.round.setState(states.flop);
  }
}
