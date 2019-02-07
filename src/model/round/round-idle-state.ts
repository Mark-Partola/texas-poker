import { RoundPreflopState } from "./round-preflop-state";

export class RoundIdleState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    console.log("await players");

    const users = this.round.getUsers();

    if (users.length > 1) {
      this.process();
    }
  }

  public process(): void {
    const states = this.round.getStates();
    this.round.setState(states.preflop);
  }
}
