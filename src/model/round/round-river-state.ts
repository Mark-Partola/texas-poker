import { RoundShowdownState } from "./round-showdown-state";

export class RoundRiverState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    console.log("bets round river");

    setTimeout(() => {
      this.process();
    }, 1000);
  }

  public process(): void {
    const states = this.round.getStates();
    this.round.setState(states.showdown);
  }
}
