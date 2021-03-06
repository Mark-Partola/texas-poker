export class RoundTurnState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    const deck = this.round.getDeck();
    const table = this.round.getTable();

    table.addCards([deck.draw()]);

    console.log("await bets round turn");
    console.log("current bank: ", this.round.getBank());

    this.round.trade();
  }

  public process(): void {
    const states = this.round.getStates();
    this.round.setState(states.river);
  }
}
