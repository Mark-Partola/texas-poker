export class RoundShowdownState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    console.log("split pot");

    console.log(this.round.getTable().getCards());
    console.log(this.round.getPlayers());
  }

  public process(): void {}
}
