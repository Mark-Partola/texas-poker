import { RoundPreflopState } from "./round-preflop-state";

export class RoundIdleState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {}

  public process(): void {
    const states = this.round.getStates();
    this.round.setState(states.preflop);
  }
}
