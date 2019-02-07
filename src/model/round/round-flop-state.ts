export class RoundFlopState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    console.log("bets round flop");

    setTimeout(() => {
      this.process();
    }, 1000);
  }

  public process(): void {
    const states = this.round.getStates();
    this.round.setState(states.turn);
  }
}
