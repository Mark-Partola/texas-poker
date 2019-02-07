import { RoundPreflopState } from "./round-preflop-state";

export class RoundShowdownState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    console.log("bets round showdown");

    setTimeout(() => {
      this.process();
    }, 1000);
  }

  public process(): void {
    const states = this.round.getStates();
    this.round.setState(states.preflop);
  }
}
