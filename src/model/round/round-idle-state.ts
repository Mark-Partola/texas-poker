export class RoundIdleState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    const players = this.round.getPlayers();

    if (players.length > 1) {
      this.process();
    }
  }

  public process(): void {
    const states = this.round.getStates();
    this.round.setState(states.preflop);
  }
}
