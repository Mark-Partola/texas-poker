export class RoundIdleState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    const users = this.round.getUsers();

    console.log("await players");

    if (users.length > 1) {
      this.process();
    }
  }

  public process(): void {
    const states = this.round.getStates();
    this.round.setState(states.preflop);
  }
}
