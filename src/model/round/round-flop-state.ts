export class RoundFlopState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    const deck = this.round.getDeck();

    const table = this.round.getTable();

    table.addCards([deck.draw(), deck.draw(), deck.draw()]);

    console.log("await bets round flop");

    setTimeout(() => {
      this.process();
    }, 1000);
  }

  public process(): void {
    const states = this.round.getStates();
    this.round.setState(states.turn);
  }
}
