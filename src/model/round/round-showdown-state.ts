import { HandCalculator } from "../hand-calculator/hand-calculator";

export class RoundShowdownState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    const players = this.round.getPlayers();
    const bank = this.round.getBank();

    if (players.length === 1) {
      const winner = this.getWinnerLog(players[0]);
      console.log(`Player ${winner} wins ${bank} tokens.`);
    } else {
      const board = this.round.getTable().getCards();
      const boardLog = board.map(card => card.name).join(", ") || "nope";
      console.log(`Card on board: ${boardLog}`);

      const calculator = new HandCalculator({ players });

      const winners = calculator.calculate();

      const winnersLog = winners.map(p => this.getWinnerLog(p)).join(", ");
      console.log(`Players ${winners} split ${bank} tokens.`);
    }
  }

  public process(): void {}

  private getWinnerLog(player: IPlayer): string {
    return `#${player.id.slice(0, 5)}`;
  }
}
