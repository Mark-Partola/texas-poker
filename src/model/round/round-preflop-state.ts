import { Deck } from "../deck";
import { RoundFlopState } from "./round-flop-state";

export class RoundPreflopState implements IRoundState {
  constructor(private readonly round: IRoundStateContext) {}

  public activate(): void {
    const deck = new Deck();

    const users = this.round.getUsers();

    users.forEach(user => user.setHand([deck.draw(), deck.draw()]));

    console.log("bets round preflop");

    setTimeout(() => {
      this.process();
    }, 1000);
  }

  public process(): void {
    const states = this.round.getStates();
    this.round.setState(states.flop);
  }
}
