import { RoundRiverState } from "./round-river-state";

export class RoundTurnState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    console.log("bets round turn");

    setTimeout(() => {
      this.process();
    }, 1000);
  }

  public process(): void {
    const states = this.round.getStates();
    this.round.setState(states.river);
  }
}
